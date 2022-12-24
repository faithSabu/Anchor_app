import '../../assets/stylesheets/user/Sidebar.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaHome, FaBell, FaComments, FaPlusCircle, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
// import ImageUploadModal from './ImageUploadModal';
import { modalContext } from '../../context/Context';
import Modal from './Modal/Modal';
import Swal from 'sweetalert2';
import { getNotificationLength } from '../../api/UserRequests';
import { notificationContext } from '../../context/NotificationContext';
import { io } from 'socket.io-client'

function Sidebar() {
  const { postUploadModalIsopen, setPostUploadModalIsopen } = useContext(modalContext);
  const { notification, setNotification } = useContext(notificationContext)
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString);
  const [notificationLength, setNotificationLength] = useState('')
  const navigate = useNavigate()
  const socket = useRef()

  useEffect(() => {
    const notifications = async () => {
      let { data } = await getNotificationLength(user[0]._id)
      console.log(data);
      setNotificationLength(data)
    }
    notifications()
  }, [notification])

  

  return (
    <>
      <div className='sbod1 w-auto lg:w-64 h-screen fixed pt-24 bg-white hidden sm:block'>
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
                  {notificationLength>=1 && <div className='notification absolute bg-red-600 text-white rounded-full p-1 bottom-2/4 left-2/4 min-w-[24px] min-h-[20px] flex justify-center items-center text-xs'>{notificationLength}</div>}
                </div>
                <span className='text-lg hidden lg:block'>Notifications</span>
              </div>
            </NavLink>
          </div>
          <div className='iconsDiv '>
            <div className='flex items-center gap-4 cursor-pointer' onClick={() => setPostUploadModalIsopen(true)}>
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
                <span className='text-lg hidden lg:block'>Logout</span>
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