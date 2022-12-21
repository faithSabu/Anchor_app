import React, { useContext } from 'react'
import { notificationContext } from '../../../context/NotificationContext';

function NotificationModal() {
    const { notificationModalIsopen, setNotificationModalIsopen } = useContext(notificationContext)
    return (
        <div>
            <div onClick={() => setNotificationModalIsopen(false)} className='fixed z-20 h-screen w-screen flex justify-center items-center' style={{ backgroundColor: 'rgba( 16, 12, 12, 0 )' }}>
                <div onClick={(e) => {
                    if (!e) var e = window.event;
                    e.cancelBubble = true;
                    if (e.stopPropagation) e.stopPropagation();
                }} className='bg-white min-w-[500px] min-h-[500px] rounded-2xl flex justify-center items-center'>
                    {'viewImage' ?
                        <div className='flex flex-col justify-center items-center mt-8'>
                            <img className='h-[300px] w-auto' src='' alt="" />
                            <div onClick={() => {
                                setNotificationModalIsopen(false)
                            }}
                                className='mt-4 bg-green-600 px-8 py-2 rounded-3xl cursor-pointer hover:bg-green-500 text-white'>Post</div>
                        </div>

                        :
                        <div className='flex flex-col justify-center items-center gap-3 mt-10'>
                            <div className='text-2xl'>Please Select Photos or Videos </div>
                            <label htmlFor="selectFile">
                                <div className='mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg '>Select from Computer</div>
                            </label>
                            <input type="file" id='selectFile' hidden />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NotificationModal