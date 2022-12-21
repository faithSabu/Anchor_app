import '../../assets/stylesheets/user/Sidebar.css'
import React, { useContext, useState } from 'react'
import { FaHome, FaBell, FaComments, FaPlusCircle, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import ImageUploadModal from './ImageUploadModal';
import { modalContext } from '../../context/Context';
import Modal from './Modal/Modal';
import Swal from 'sweetalert2';

function Sidebar() {
  const { postUploadModalIsopen, setPostUploadModalIsopen } = useContext(modalContext);
  const [createPost, setCreatePost] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <div className='sbod1 w-64 h-screen fixed pt-24 bg-white'>
        <div className='bg-white flex flex-col gap-y-3'>
          <div className='iconsDiv'>
            <NavLink to='/'>
              <div className='flex items-center gap-4 '>
                <FaHome className='text-2xl' />
                <span className='text-lg'>Home</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv'>
            <NavLink to='/chat'>
              <div className='flex items-center gap-4 '>
                <FaComments className='text-2xl' />
                <span className='text-lg'>Messages</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv '>
            <NavLink to='/notifications'>
              <div className='flex items-center gap-4 '>
                <FaBell className='text-2xl' />
                <span className='text-lg'>Notifications</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv '>
            <div className='flex items-center gap-4 cursor-pointer' onClick={() => setPostUploadModalIsopen(true)}>
              <FaPlusCircle className='text-2xl' />
              <span className='text-lg'>Create Post</span>
            </div>
          </div>
          <div className='iconsDiv'>
            <NavLink to='/profile'>
              <div className='flex items-center gap-4 '>
                <FaUserCircle className='text-2xl' />
                <span className='text-lg'>Profile</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv'>
            <div className='cursor-pointer' onClick={() => {
              Swal.fire({
                // title: 'Are you sure?',
                text: "Click OK to continue",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear()
                  navigate('/login')
                }
              })
            }}>
              <div className='flex items-center gap-4 '>
                <FaSignOutAlt className='text-2xl' />
                <span className='text-lg'>Logout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* {createPost && <ImageUploadModal/>} */}
      {postUploadModalIsopen && <Modal />}
    </>
  )
}

export default Sidebar