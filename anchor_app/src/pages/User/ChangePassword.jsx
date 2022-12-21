import React from 'react'
import ChangePasswordForm from '../../components/User/ChangePasswordForm'
import Navbar from '../../components/User/Navbar'
import ProfileSettingsSidebar from '../../components/User/ProfileSettingsSidebar'
import Sidebar from '../../components/User/Sidebar'
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'


function ChangePassword() {
    const navigate = useNavigate()
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
                            <span className='text-3xl font-medium'>Change Password</span>
                        </div>
                        <div className='min-w-[600px] mt-8'>
                            <ChangePasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword