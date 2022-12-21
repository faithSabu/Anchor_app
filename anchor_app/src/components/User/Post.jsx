import '../../assets/stylesheets/user/newsfeed.css'
import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegComment, FaRegShareSquare, FaRegBookmark, FaEllipsisH, FaRegSmileWink, FaEllipsisV } from "react-icons/fa";
import { AiOutlineEllipsis } from "react-icons/ai";
// import { FiSend } from "react-icons/fi";
import axiosInstance from '../../config/baseUrl';
import Swal from 'sweetalert2'
import {
  Accordion, AccordionBody, Menu, MenuHandler, MenuList, MenuItem, Button,
} from "@material-tailwind/react";
import { useContext } from 'react';
import { modalContext } from '../../context/Context';
import { doFollow, doUnfollow } from '../../api/UserRequests';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'timeago.js'

function Post({ item, change, setChange }) {
  const { postUploaded, setpostUploaded } = useContext(modalContext)
  const navigate = useNavigate();
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString);
  const jwtToken = localStorage.getItem('jwtToken')
  const [posts, setPosts] = useState([])
  const [myComment, setMyComment] = useState('');
  const [commentButtonDisabled, setCommentButtonDisabled] = useState(0)
  const [commentInput, setCommentInput] = useState('')
  const [isFollow, setIsFollow] = useState(false)

  useEffect(() => {

  }, [change])



  // Accordion session
  const [accordionOpen, setAccordionOpen] = useState(0);

  const handleAccordionOpen = (value) => {
    setAccordionOpen(accordionOpen === value ? 0 : value);
  };
  // Accordion session

  const handleCommentSubmit = (postId, username, profileImg) => {
    axiosInstance.get(`/postComment?userId=${user[0]._id}&postId=${postId}&comment=${myComment}&username=${username}&profileImg=${profileImg}`,{
      credentials:'include',
      headers:{
        'Content-Type':"application/json",
        authorization:`Bearer ${jwtToken}` 
      },
    })
      .then(resp => {
        setChange(!change)
        setpostUploaded(!postUploaded)
        setCommentButtonDisabled(0)
      })
  }

  const handlePostDelete = (postId) => {
    Swal.fire({
      // title: 'Your Post will be Removed',
      text: "Your Post will be Removed !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.get(`/postDelete?postId=${postId}`,{
          credentials:'include',
          headers:{
            'Content-Type':"application/json",
            authorization:`Bearer ${jwtToken}` 
          },
        }).then(resp => {
          Swal.fire(
            'Deleted!',
            'Your Post has been deleted.',
            'success'
          )
          setChange(!change)
        })
      }
    })
  }

  const handleFollow = (refUserId, refUsername) => {
    doFollow(user[0]._id, user[0].username, refUserId, refUsername).then(resp => {
      setIsFollow(!isFollow)
      resp.data = [resp.data]
      localStorage.setItem("user", JSON.stringify(resp.data));
    })
  }

  const handleUnfollow = (refUserId) => {
    doUnfollow(user[0]._id, refUserId).then(resp => {
      setIsFollow(!isFollow)
      resp.data = [resp.data]
      localStorage.setItem("user", JSON.stringify(resp.data));
    })
  }
  return (
    <div key={item._id} className={`bg-white my-5 rounded-2xl border border-gray-400 overflow-hidden min-w-[500px]`}>
      {/* top area */}
      <div className='min-h-[70px] bg-white px-4 py-2 flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
          {user[0]._id === item.userData[0]._id
            ?
            <Link to='/profile'>
              <div>
                <img className='w-10 h-10 rounded-full outline outline-offset-2 outline-2 outline-[#e000ab] cursor-pointer' src={item.userData[0].profileImg} alt="" />
              </div>
            </Link>
            :
            <Link to='/userprofile' state={{ userId: item.userData[0]._id }}>
              <div>
                <img className='w-10 h-10 rounded-full outline outline-offset-2 outline-2 outline-[#e000ab] cursor-pointer' src={item.userData[0].profileImg} alt="" />
              </div>
            </Link>
          }

          <div className='cursor-pointer'>{item.userData[0].username}</div>
          <div>
            {item.userData[0]._id === user[0]._id
              ?
              ''
              :
              item.userData[0].followers && item.userData[0].followers.find(elem => elem.refUserId === user[0]._id)
                ?
                <Menu placement="right-start">
                  <MenuHandler>
                    <Button className='bg-white text-black rounded-2xl p-0 px-2'> <span className='cursor-pointer text-blue-400 hover:text-blue-600 font-semibold' onClick={() => {
                    }}>Following</span></Button>
                  </MenuHandler>
                  <MenuList className='flex flex-col z-20'>
                    <MenuItem className='hover:border hover:border-gray-300  py-2 rounded-2xl' onClick={() => {
                      handleUnfollow(item.userData[0]._id)
                    }}>Unfollow</MenuItem>
                  </MenuList>
                </Menu>
                :
                <span className='cursor-pointer text-blue-400 hover:text-blue-600 font-semibold' onClick={() => {
                  handleFollow(item.userData[0]._id, item.userData[0].username)
                }}>Follow</span>
            }
          </div>
        </div>
        <div>
          {/* <AiOutlineEllipsis className='text-3xl cursor-pointer' /> */}


          <Menu placement="right-start">
            <MenuHandler>
              <Button className='bg-white hover:bg-gray-200 text-black rounded-2xl p-0 px-2'><AiOutlineEllipsis className='text-3xl cursor-pointer' /></Button>
            </MenuHandler>
            {(item.userId === user[0]._id) ?
              <MenuList className='flex flex-col z-20'>
                <MenuItem className='hover:border hover:border-gray-300  py-2 rounded-2xl' onClick={() => {
                  handlePostDelete(item._id)
                }}>Delete</MenuItem>
              </MenuList>
              :
              <MenuList className='flex flex-col z-20'>
                <MenuItem className='hover:border hover:border-gray-300  py-2 rounded-2xl'>Report</MenuItem>
              </MenuList>
            }
          </Menu>
        </div>
      </div>
      {/* post area */}
      <div onDoubleClick={() => {
        axiosInstance.get(`/likePost?postId=${item._id}&userId=${user[0]._id}`,{
          credentials:'include',
          headers:{
            'Content-Type':"application/json",
            authorization:`Bearer ${jwtToken}` 
          },
        }).then(() => {
          setChange(!change)
        })
      }}>
        <img className='w-[500px] h-[500px] object-contain bg-black' src={item.postUrl} alt="" />
      </div>
      {/* bottom area */}
      <div>
        <div className='flex justify-between px-4 py-3'>
          <div className='flex gap-8 text-3xl font-bold text-gray-700'>
            {(item.likes.filter(elem => elem.refUser === user[0]._id)).length ?
              <FaHeart className='dislike' color='red' onClick={() => {

                axiosInstance.get(`/dislikePost?postId=${item._id}&userId=${user[0]._id}`,{
                  credentials:'include',
                  headers:{
                    'Content-Type':"application/json",
                    authorization:`Bearer ${jwtToken}` 
                  },
                }).then(() => {
                  setChange(!change)
                })
              }} />
              :
              <FaRegHeart className='like hover:text-gray-300' onClick={() => {
                axiosInstance.get(`/likePost?postId=${item._id}&userId=${user[0]._id}`,{
                  credentials:'include',
                  headers:{
                    'Content-Type':"application/json",
                    authorization:`Bearer ${jwtToken}` 
                  },
                }).then(() => {
                  setChange(!change)
                })
              }} />
            }
            <FaRegComment onClick={() => handleAccordionOpen(item._id)} />
            {/* <FiSend/  */}
          </div>
          <div className='text-3xl'>
            <FaRegBookmark />
          </div>
        </div>
        <div className='px-4'>
          <Accordion open={accordionOpen === item._id} >
            <AccordionBody>
              <div className='accordion max-h-[20vh] overflow-y-scroll'>
                {item.comments.length ? (item.comments.slice(0).reverse()).map(elem => {
                  return <div key={elem._id} className='p-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex gap-4 items-center'>
                        <div>
                          <img className='w-7 h-7 rounded-full outline outline-offset-2 outline-2 outline-[#0e1efb] cursor-pointer' src={elem.refUserProfileImg} alt="" />
                        </div>
                        <span className='text-base font-semibold'>{elem.refUsername}</span>
                        <span>{elem.comment}</span>
                        <span>{format(elem.time)}</span>
                      </div>
                      <AiOutlineEllipsis className='text-lg cursor-pointer' />
                    </div>
                  </div>
                })
                  :
                  <span>Be the first one to Comment...</span>
                }
              </div>
            </AccordionBody>
          </Accordion>
        </div>
        <div className='py-3 px-5 border border-t-gray-200 '>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleCommentSubmit(item._id, user[0].username, user[0].profileImg,)
            setCommentInput('')
          }} className='flex justify-between'>
            <input type="text" placeholder='Add a Comment...' value={commentInput} style={{ outline: 'none', width: '400px' }} onChange={(e) => {
              setCommentInput(e.target.value)
              setMyComment(e.target.value)
              if (e.target.value.trim().length > 0) setCommentButtonDisabled(item._id)
              else setCommentButtonDisabled(0)
            }} />
            <button type='submit' className={`px-2 rounded-full ${!(commentButtonDisabled === item._id) ? 'text-zinc-400' : 'hover:text-white hover:bg-blue-500 font-medium'} `} disabled={!(commentButtonDisabled === item._id)}>Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Post