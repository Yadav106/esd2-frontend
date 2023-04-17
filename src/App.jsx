import React, { useEffect } from 'react'
import UserList from './UserList'
import data from './data.js'
import { nanoid } from 'nanoid'

const App = () => {

  const [purchaseData, setPurchaseData] = React.useState(data)
  const [showAdd, setShowAdd] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [newUser, setNewUser] = React.useState({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5001/')
      const data = await response.json()
      setPurchaseData(data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log(purchaseData);
  }, [purchaseData])

  return (
    <div>
      <div className='text-center mt-[20px] text-[30px]'>
        PS Project
      </div>
      <div className='flex flex-col justify-center items-center'>
        <button 
          className='border-[2px] bg-gray-300 p-[5px] mb-[5px] hover:bg-gray-400'
          onClick={() => {
            setShowAdd(!showAdd)
            setUsername('')
          }}
        >
          {showAdd ? 'Cancel' : 'Add User'}
        </button>
        <div>
          {
            showAdd && (
              <div className='flex flex-col justify-center items-center'>
                <input
                  className='border-[2px] bg-gray-300 p-[5px] mb-[5px]'
                  type='text'
                  placeholder='Enter Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button
                  className='border-[2px] bg-gray-300 p-[5px] mb-[5px] hover:bg-gray-400'
                  onClick={() => {
                    const newUser = {
                      id: nanoid(),
                      username: username,
                      products: []
                    }
                    setNewUser(newUser)
                    setShowAdd(false)

                    async function addData() {
                      const response = await fetch('http://localhost:5001/add_user', {
                        method: 'POST',
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                      }).catch((err) => {
                        console.log(err)
                      })
                    }
                    addData()
                  }}
                >
                  Add
                </button>
              </div>
            )}
        </div>
      </div>
      {
        purchaseData.map((user) => {
          return (
            <UserList key={user.id} user={user}/>
          )
        })
      }
    </div>
  )
}

export default App