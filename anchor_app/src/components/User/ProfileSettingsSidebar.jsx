import React from 'react'
import { NavLink } from 'react-router-dom';
import '../../assets/stylesheets/user/profileSettings.css'

function ProfileSettingsSidebar() {


  return (
    <>
      <div className='max-w-max'>
        <div className='flex flex-col gap-5'>
          <div className='listDiv hover:bg-slate-200 p-3 mr-5'>
            <NavLink to='/profileSettings'>
              <span className='text-lg'>Update Profile Info</span>
            </NavLink>
          </div>
          <div className='listDiv hover:bg-slate-200 p-3 mr-5'>
            <NavLink to='/changePassword'>
              <span className='text-lg'>Change Password</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className='bg-zinc-200 w-[1px] mr-4' ></div>
    </>
  )
}

export default ProfileSettingsSidebar