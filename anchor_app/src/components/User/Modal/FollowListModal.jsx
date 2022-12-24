import React, { useContext, useEffect, useState } from 'react'
import { FaRegImages } from "react-icons/fa";
import { modalContext } from '../../../context/Context';
import axiosInstance from '../../../config/baseUrl';
import Swal from 'sweetalert2'
import { doUnfollow, getFollowList } from '../../../api/UserRequests';
import { useNavigate } from 'react-router-dom';


function FollowListModal({ setFollowListModalOpen, heading, userId, followList }) {

    const navigate = useNavigate();
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString);

    // useEffect(() => {
    //   const followListFn = async()=>{
    //     let result = await getFollowList(userId,heading.toLowerCase())
    //     console.log(result);
    //   }
    //   followListFn()
    // }, [])





    return (

        //custom FollowListModal start
        <>
            <div onClick={() => setFollowListModalOpen(false)} className='fixed top-0 left-0 z-20 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.3 )' }}>
                <div onClick={(e) => {
                    if (!e) var e = window.event;
                    e.cancelBubble = true;
                    if (e.stopPropagation) e.stopPropagation();
                }} className='bg-white min-w-[300px] min-h-[350px] rounded-2xl flex overflow-hidden'>
                    <div className='w-full'>
                        <div className=' h-14 border-b-2 flex justify-center items-center'>
                            <span className='text-lg'>{heading}</span>
                        </div>
                        <div className=''>
                            {followList.map(item => (
                                <div className='flex items-center justify-center hover:bg-gray-50 px-14'>

                                    <div onClick={() => {
                                        console.log(item)
                                        setFollowListModalOpen(false)
                                        if (item.refUserId === user[0]._id) navigate('/profile')
                                        else navigate('/userprofile', { state: { userId: item.refUserId } })
                                    }} className='py-5 cursor-pointer'>{item.refUsername}</div>
                                    {/* <div>Unfollow</div> */}
                                    {/* <div className='border px-4 py-1 hover:bg-gray-50 cursor-pointer' onClick={()=>{
                                       doUnfollow(user[0]._id,item.refUserId) 
                                       setFollowList([...followList])
                                    }}>
                                        <span>Remove</span>
                                        </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
        //custom FollowListModal end
    )
}

export default FollowListModal