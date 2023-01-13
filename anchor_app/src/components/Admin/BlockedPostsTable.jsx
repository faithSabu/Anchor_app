import React, { useEffect, useState } from 'react'
import { blockUnblockUser, deletePost, getReportedPosts } from '../../api/AdminRequests'
import Swal from 'sweetalert2';
import Reports from './Modal/Reports';

function ReportedPostsTable() {
    const [deleted, setDeleted] = useState(false)
    const [blockedPosts, setBlockedPosts] = useState([])
    const [reportsModalIsOpen,setReportsModalIsOpen] = useState(false)
    const [reportReasons,setReportReasons] = useState([])

    useEffect(() => {
        const getReportedPostsFn = async () => {
            let { data } = await getReportedPosts()
            setBlockedPosts(data)
        }
        getReportedPostsFn()
    }, [deleted])

    const handlePostDelete = (postId) => {
        Swal.fire({
            title: 'Are you Sure?',
            // text: "Delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                setDeleted(!deleted)
                deletePost(postId).then(resp =>
                    Swal.fire({
                        title: 'Post Deleted',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    })
                )
            }
        })
    }

    return (
        <>
            <div className='w-full h-auto px-20 py-10'>
                <div className="overflow-x-auto  shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    User
                                </th>
                                <th scope="col" className="py-3 px-3">
                                    Post Id
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Number of Reports
                                </th>
                                <th scope="col" className="py-3 px-8 text-center">
                                    Delete Post
                                </th>
                                {/* <th scope="col" className="py-3 px-6">
                                    <span className="sr-only">Edit</span>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {blockedPosts.map(item => (

                                <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.userId.name}
                                    </th>
                                    <td className="py-4 px-6 ">
                                        <span>{item._id}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className='flex gap-7'>{item.reportReason?.length} <span onClick={()=>{
                                            setReportsModalIsOpen(true)
                                            setReportReasons(item.reportReason)
                                        }} className='text-blue-500 cursor-pointer hover:underline'>See the Reports</span></div>
                                    </td>
                                    <td className="py-4 px-20 text-left">

                                        <div onClick={() => { handlePostDelete(item._id) }} className='max-w-2 py-2 bg-red-600 flex justify-center items-center rounded-3xl cursor-pointer hover:bg-red-700'>
                                            <span className='text-white '>Delete</span>
                                        </div>


                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            {reportsModalIsOpen && <Reports setReportsModalIsOpen={setReportsModalIsOpen} reportReasons={reportReasons} />}
        </>
    )
}

export default ReportedPostsTable