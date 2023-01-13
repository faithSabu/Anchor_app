import React, { useEffect, useState } from 'react'
import { blockUnblockUser, getAllUsers } from '../../api/AdminRequests'

function Table() {
    const [allUsers, setAllUsers] = useState([])
    const [blocked,setBlocked] = useState(false)

    useEffect(() => {
        console.log('in table useeffect');
        const getAllUsersFn = async () => {
            let { data } = await getAllUsers()
            setAllUsers(data)
        }
        getAllUsersFn()
    }, [blocked])

    return (
        <>
            <div className='w-full h-auto px-20 py-10'>
                <div className='flex justify-center py-2'>
                <h1 className='text-xl font-semibold ml-[-100px]'>All Users</h1>
                </div>
                <div className="overflow-x-auto  shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Users
                                </th>
                                <th scope="col" className="py-3 px-3">
                                    Number of Posts
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Connections
                                </th>
                                <th scope="col" className="py-3 px-8 text-center">
                                    Block
                                </th>
                                {/* <th scope="col" className="py-3 px-6">
                                    <span className="sr-only">Edit</span>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(item => (

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td className="py-4 px-6">
                                        <div className='flex justify-'>{item.posts?.length}</div>
                                    </td>
                                    <td className="py-4 px-6 ">
                                        <div onClick={() => console.log(item)}>Followers : <span>{item.followers ? item.followers?.length : 0}</span></div>
                                        <div>Following : <span>{item.following ? item.following?.length : 0}</span></div>

                                    </td>
                                    <td className="py-4 px-20 text-left">
                                        {item.blocked?
                                        <div onClick={()=>{
                                            setBlocked(!blocked)
                                            blockUnblockUser(item._id)
                                        }} className='max-w-2 py-2 bg-green-600 flex justify-center items-center rounded-3xl cursor-pointer hover:bg-green-700'>
                                            <span className='text-white '>Unblock</span>
                                        </div>
                                        :
                                        <div onClick={()=>{
                                            setBlocked(!blocked)
                                            blockUnblockUser(item._id)
                                        }} className='max-w-2 py-2 bg-red-600 flex justify-center items-center rounded-3xl cursor-pointer hover:bg-red-700'>
                                            <span className='text-white '>Block</span>
                                        </div>
                                        }

                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table