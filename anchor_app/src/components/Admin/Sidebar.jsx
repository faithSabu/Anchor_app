import '../../assets/stylesheets/user/Sidebar.css'
import React from 'react'
import { FaHome, FaBell, FaComments, FaPlusCircle, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { NavLink} from 'react-router-dom';

function Sidebar() {


  return (
    <>
      <div className='sbod1 w-auto lg:w-60 h-screen fixed pt-24 bg-white hidden sm:block'>
        <div className='bg-white flex flex-col gap-y-3'>
          <div className='iconsDiv'>
            <NavLink to='/'>
              <div className='flex items-center gap-4 '>
                <FaHome className='text-2xl' />
                <span className='text-lg hidden lg:block'>Home</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv'>
            <NavLink to='/chat'>
              <div className='flex items-center gap-4 '>
                <FaComments className='text-2xl' />
                <span className='text-lg hidden lg:block'>Messages</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv '>
            <NavLink to='/notifications'>
              <div className='flex items-center gap-4 '>
                <div className='relative '><FaBell className='text-2xl' ></FaBell>
                </div>
                <span className='text-lg hidden lg:block'>Notifications</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv '>
            <div className='flex items-center gap-4 cursor-pointer' >
              <FaPlusCircle className='text-2xl' />
              <span className='text-lg hidden lg:block'>Create Post</span>
            </div>
          </div>
          <div className='iconsDiv'>
            <NavLink to='/profile'>
              <div className='flex items-center gap-4 '>
                <FaUserCircle className='text-2xl' />
                <span className='text-lg hidden lg:block'>Profile</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv'>
            <div className='cursor-pointer'>
              <div className='flex items-center gap-4 '>
                <FaSignOutAlt className='text-2xl' />
                <span className='text-lg hidden lg:block'>Logout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Sidebar