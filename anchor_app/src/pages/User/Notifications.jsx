import React, { useEffect, useState } from 'react'
import { getNotifications, isReadNotification } from '../../api/UserRequests';
import Navbar from '../../components/User/Navbar'
import Sidebar from '../../components/User/Sidebar'
import PostViewModal from '../../components/User/Modal/PostViewModal'
import { FaRegUserCircle, FaUserCog, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { format } from 'timeago.js'
import NoData from '../../assets/Images/NoData.gif'
import { Link, useNavigate } from 'react-router-dom';

function Notifications() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString);
  const [notifications, setNotifications] = useState('')
  const navigate = useNavigate()
  const [notificationRead,setNotificationRead] = useState(false);

  const [postViewModalOpen, setPostViewModalOpen] = useState(false)
  const [profileChange, setProfileChange] = useState(false)
  const [postId, setPostId] = useState('')

  useEffect(() => {
    try {
      const getData = async () => {
        let { data } = await getNotifications(user[0]._id)
        console.log(data);
        setNotifications(data);
      }
      getData();
    } catch (error) {
      navigate('/error')
    }
  }, [notificationRead])

  return (
    <>
      <Navbar />
      <Sidebar />
      {/* <div className='pt-16 pl-64 min-h-screen flex justify-center bg-[#fafafa]'> */}
      <div className='pt-16 sm:pl-14 lg:pl-64 min-h-screen flex bg-[#fafafa]'>
        <div className='w-full min-h-[80vh] sm:px-28 lg:px-52 py-5'>
          <div className='flex justify-center p-2'>
            <h1 className='font-semibold text-2xl'>Notifications</h1>
          </div>
          <div className='flex flex-col rounded-md border border-zinc-300 bg-white min-h-[75vh]'>
            {notifications.length ? notifications.map(item => (
              <div onClick={()=>{
                isReadNotification(user[0]._id,item._id)
              }} key={item._id} className={`px-10 py-3 w-full h-full flex justify-between items-center hover:bg-gray-300 transition ease-out delay-10 ${item.isRead ? 'bg-white' : 'bg-gray-200'}`}>
                <div className='flex items-center gap-5'>
                  <div className='profilePhotoDiv p-2 overflow-hidden' onClick={() => console.log(item)}>
                    {item.refUserId.profileImg ?
                      <Link to='/userprofile' state={{ userId: item.refUserId._id }}>
                        <img className='w-10 h-10 rounded-full outline outline-offset-2 outline-2 outline-[#0e1efb] cursor-pointer' src={item.refUserId.profileImg} alt="" />
                      </Link>
                      :
                      <FaRegUserCircle className='text-9xl' />}
                  </div>
                  <span onClick={() => {
                    setNotificationRead(!notificationRead)
                    {item.postId&&setPostViewModalOpen(true)}
                    setPostId(item.postId._id)
                  }}>{item.message}</span>
                </div>
                <span className='text-sm'>{format(item.time)}</span>
              </div>
            ))
              :
              <div className='flex flex-col justify-center items-center gap-5 h-[75vh]' >

                <h1 className='text-lg'>You have no Notifications</h1>
                <div className='overflow-hidden h-[20vh] p-2 flex justify-center items-center'>
                  <img className='h-[70vh]' src={NoData} alt="" />
                </div>
              </div>}
          </div>

        </div>
      </div>
      {postViewModalOpen && <PostViewModal setPostViewModalOpen={setPostViewModalOpen} postId={postId} profileChange={profileChange} setProfileChange={setProfileChange} />}
    </>
  )
}

export default Notifications