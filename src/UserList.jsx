import React, {useEffect, useState} from 'react'
import { AiFillDelete } from 'react-icons/ai'
import {nanoid} from 'nanoid'

const UserList = ({user}) => {
    const [showAdd, setShowAdd] = useState(false)
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [order, setOrder] = useState({
        "id": "",
        "productId": "",
        "productName": "",
        "price": "",
        "rating": ""
    })

    function addOrder() {
        const newOrder = {
            "id": user.id,
            "productId": nanoid(),
            "productName": productName,
            "price": price,
            "rating": rating 
        }
        setOrder(newOrder)
    }

    useEffect(() => {
        async function addData() {
            if(productName === '' || price === '' || rating === '') return
            const response = await fetch('http://localhost:5001/add_order', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(order)
            }).catch((err) => {
                console.log(err)
            })
            console.log(order)
        }
        addData()
        setProductName('')
        setPrice('')
        setRating('')
    }, [order])

    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                    <div className='text-[20px]'>{user.username}</div>
                    <button 
                        className='border-[2px] bg-gray-300 p-[5px] mb-[5px] hover:bg-gray-400'
                        onClick={() => setShowAdd(!showAdd)}
                    >
                        {showAdd ? 'Cancel' : 'Add New Order'}
                    </button>
                    {
                        showAdd && (
                            <form className='flex flex-col justify-center items-center'>
                                <div className='flex flex-wrap justify-center items-center gap-[10px]'>
                                    <input
                                        type='text'
                                        placeholder='Product Name'
                                        className='border-[2px] border-black p-[5px] mb-[5px]'
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                    <input
                                        type='text'
                                        placeholder='Price'
                                        className='border-[2px] border-black p-[5px] mb-[5px]'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <input
                                        type='text'
                                        placeholder='Rating'
                                        className='border-[2px] border-black p-[5px] mb-[5px]'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    />
                                </div>
                                <button
                                    className='border-[2px] bg-gray-300 p-[5px] mb-[5px] hover:bg-gray-400'
                                    onClick={() => {
                                        addOrder()
                                        setShowAdd(!showAdd)
                                    }}
                                >
                                    Add
                                    </button>
                            </form>
                        )
                    }
                    <table className='border-[3px] mb-[20px]'>
                    <thead>
                        <tr className='border-black border-[2px]'>
                        <th className='w-[300px] bg-red-100'>Name</th>
                        <th className='w-[100px] bg-green-100'>Price</th>
                        <th className='w-[100px] bg-blue-100'>Rating</th>
                        <th className='w-[100px] bg-gray-100'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        user.products.map((product) => {
                        return (
                            <tr key={nanoid()} className='border-black border-[1px]'>
                            <td className='text-[20px] text-center bg-red-100'>{product.productName}</td>
                            <td className='text-[20px] text-center bg-green-100'>{product.price}</td>
                            <td className='text-[20px] text-center bg-blue-100'>{product.rating}</td>
                            <td className='text-[20px] text-center bg-gray-100'>
                                <button
                                    className='border-[2px] text-red-400 bg-gray-300 p-[5px] mb-[5px] hover:bg-gray-400 hover:text-red-500'
                                    onClick={() => {
                                        async function deleteData() {
                                            const response = await fetch('http://localhost:5001/delete_order', {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    "id": user.id,
                                                    "productId": product.id
                                                })
                                            }).catch((err) => {
                                                console.log(err)
                                            })
                                        }
                                        deleteData()
                                    }}
                                >
                                    <AiFillDelete />
                                </button>
                            </td>
                            </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>
                </div>
        </div>
    )
}

export default UserList