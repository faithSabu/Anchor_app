import React from 'react'
import { useNavigate } from 'react-router-dom';


function FollowListModal({ setFollowListModalOpen, heading, userId, followList }) {

    const navigate = useNavigate();
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString);

    return (

        //custom FollowListModal start
        <>
            <div onClick={() => setFollowListModalOpen(false)} className='fixed top-0 left-0 z-20 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.3 )' }}>
                <div onClick={(e) => {
                    // if (!e) var e = window.event;  
                    // e.cancelBubble = true;
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
                                        setFollowListModalOpen(false)
                                        if (item.refUserId === user[0]._id) navigate('/profile')
                                        else navigate('/userprofile', { state: { userId: item.refUserId } })
                                    }} className='py-5 cursor-pointer'>{item.refUsername}</div>
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