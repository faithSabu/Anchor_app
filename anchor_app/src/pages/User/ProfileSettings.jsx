import React, { useState } from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/User/Navbar'
import ProfileInfoUpdation from '../../components/User/ProfileInfoUpdation';
import ProfileSettingsSidebar from '../../components/User/ProfileSettingsSidebar';
import Sidebar from '../../components/User/Sidebar'

function ProfileSettings() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(false)
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='pl-64 pt-16 flex justify-center min-h-screen bg-[#fafafa]'>
                <div className='pt-20'>
                    <BsArrowLeftShort onClick={() => navigate('/profile')} className='text-4xl text-gray-500 hover:text-black cursor-pointer' />
                </div>
                <div className='flex m-16 rounded-md px-7 border border-zinc-200 bg-white py-5'>
                    <ProfileSettingsSidebar />
                    <div>
                        <div className=' flex items-center justify-between'>
                            <span className='text-3xl font-medium'>Change Profile Info</span>
                        </div>
                        <div className='min-w-[600px] mt-8'>
                            <ProfileInfoUpdation />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSettings