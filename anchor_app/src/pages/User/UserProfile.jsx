import '../../assets/stylesheets/user/profile.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/User/Navbar'
import Sidebar from '../../components/User/Sidebar'
import { FaRegUserCircle, FaUserCog, FaRegArrowAltCircleLeft } from "react-icons/fa";
// import { BsArrowLeftShort } from "react-icons/bs";
import axiosInstance from '../../config/baseUrl';
// import ProfileSettings from './ProfileSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { addNewChat } from '../../api/ChatRequests';
import PostViewModal from '../../components/User/Modal/PostViewModal';
import { modalContext } from '../../context/Context';
import FollowListModal from '../../components/User/Modal/FollowListModal';
import {
  Menu, MenuHandler, MenuList, MenuItem, Button,
} from "@material-tailwind/react";
import { doFollow, doUnfollow, followNotification, unfollowNotification } from '../../api/UserRequests';
import { io } from 'socket.io-client'
// import ProfileSettings from '../../components/User/ProfileSettings';

function UserProfile() {
  const { postUploaded, setpostUploaded } = useContext(modalContext)
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  const jwtToken = localStorage.getItem('jwtToken')
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [userDetails, setUserDetails] = useState('')
  const [postId, setPostId] = useState('')
  const [profileChange, setProfileChange] = useState(false)
  const [followListModalOpen, setFollowListModalOpen] = useState(false)
  const [heading, setHeading] = useState('')
  const [followList, setFollowList] = useState([])
  const [newNotification, setNewNotification] = useState(false)
  const [isFollow,setIsFollow] = useState(false)
  const socket = useRef()
  // const [settingsOpen, setsettingsOpen] = useState(false)

  //modals
  const [postViewModalOpen, setPostViewModalOpen] = useState(false)
  //modals
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': "application/json",
      authorization: `Bearer ${jwtToken}`
    },
  }


  useEffect(() => {
    axiosInstance.get(`/getUserPosts?userId=${location.state.userId}`, config).then(resp => {
      setPosts(resp.data)
    })
    axiosInstance.get(`/getProfilerPicture?userId=${location.state.userId}`, config).then(resp => {
      setProfileImage(resp.data[0].profileImg)
      setName(resp.data[0].name)
      setUsername(resp.data[0].username)
      setUserDetails(resp.data[0])
    })
  }, [location.state.userId,isFollow])

  const handleFollow = async(refUserId, refUsername) => {
    doFollow(user[0]._id, user[0].username, refUserId, refUsername).then(resp => {
      resp.data = [resp.data]
      localStorage.setItem("user", JSON.stringify(resp.data));
      let result = followNotification(user[0]._id, user[0].username, refUserId)
      setIsFollow(!isFollow)

      //sent notification to socket
      // socket.current.emit('sendNotification', refUserId)
      // setNewNotification(!newNotification)
    })
  }

  const handleUnfollow = (refUserId) => {
    doUnfollow(user[0]._id, refUserId).then(resp => {
      resp.data = [resp.data]
      localStorage.setItem("user", JSON.stringify(resp.data));
      setIsFollow(!isFollow)
      unfollowNotification(user[0]._id, refUserId)
    })
  }


  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='pt-16 pl-64 flex justify-center min-h-screen '>
        <div className='py-7 px-10 bg-white'>
          <div className='px-10 flex justify-between items-center gap-x-16 bg-white'>
            <div className='profilePhotoDiv overflow-hidden'>
              {profileImage ?
                <img className='w-[180px] h-[180px] object-cover' style={{ borderRadius: '50%' }} src={profileImage} alt="" />
                :
                <FaRegUserCircle className='text-9xl' />}
            </div>
            <div className='flex flex-col gap-5 w-[400px]'>
              <div className='flex items-center'>
                <div className='text-4xl'>{username}</div>
                <div className='flex ml-5 w-1/2 justify-around items-center'>
                  {/* <div>{username}</div> */}
                  {/* <div>
                    <button className='followBtnUserProfile px-2 py-1 border-2 border-gray-400 hover:border-white'>Following</button>
                  </div> */}
                  {userDetails.followers && userDetails.followers.find(elem => elem.refUserId === user[0]._id)
                    ?
                    <Menu placement="right-start">
                      <MenuHandler>
                        <Button className='bg-white text-black rounded-2xl p-0 px-2'> <span className='cursor-pointer text-blue-400 hover:text-blue-600 font-semibold text-sm' onClick={() => {
                        }}>Following</span></Button>
                      </MenuHandler>
                      <MenuList className='flex flex-col z-20'>
                        <MenuItem className='hover:border hover:border-gray-300  py-2 rounded-2xl' onClick={() => {
                          handleUnfollow(userDetails._id)
                        }}>Unfollow</MenuItem>
                      </MenuList>
                    </Menu>
                    :
                    <span className='cursor-pointer text-blue-400 hover:text-blue-600 font-semibold text-sm' onClick={() => {
                      handleFollow(userDetails._id, userDetails.username)
                    }}>Follow</span>
                  }
                  <div>
                    <button className='messageBtnUserProfile px-2 py-1 border-2 border-gray-400 hover:border-white' onClick={() => {
                      console.log(userDetails);
                      addNewChat(user[0]._id, userDetails._id).then((resp) => {
                        navigate('/chat', { state: { chat: resp.data } })
                      })
                    }}>Message</button>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-7 text-xl'>
                <span>{posts?.length} Posts</span>
                <span onClick={() => {
                  setFollowListModalOpen(true)
                  setHeading('Followers')
                  setFollowList(userDetails.followers)
                }}>{userDetails.followers ? userDetails.followers?.length : '0'} Followers</span>
                <span onClick={() => {
                  setFollowListModalOpen(true)
                  setHeading('Following')
                  setFollowList(userDetails.following)
                }}>{userDetails.following ? userDetails.following?.length : '0'} Following</span>
              </div>
              <div>
                <span className='text-lg'>{name}</span>
              </div>
              {/* <div>
                            <img src={url} alt="" />
                        </div> */}
            </div>
          </div>
          <div className='w-full h-[1px] bg-black mt-5'></div>
          <div className='flex flex-col items-center'>
            <span className='text-lg m-5'>Posts</span>
            <div className=''>
              {posts.length > 0 ?
                <div className="grid grid-cols-3 gap-5 md:grid-cols-3">
                  {posts.length > 0 && posts.map((item, index) => {
                    return <div key={item._id} className='h-48 w-52 rounded-lg flex justify-center'>
                      <img onClick={() => {
                        setPostViewModalOpen(true)
                        setPostId(item._id)
                      }} className='h-[250px] w-full rounded-lg' src={item.postUrl} alt="" />
                    </div>
                  })
                  }
                </div>
                :
                <div className='text-2xl'>No Posts Added Yet</div>
              }
            </div>
          </div>
        </div>
        {followListModalOpen && <FollowListModal setFollowListModalOpen={setFollowListModalOpen} heading={heading} userId={userDetails._id} followList={followList} />}
      </div>
      {postViewModalOpen && <PostViewModal setPostViewModalOpen={setPostViewModalOpen} postId={postId} profileChange={profileChange} setProfileChange={setProfileChange} />}
    </>
  )
}

export default UserProfile