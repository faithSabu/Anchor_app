import '../../assets/stylesheets/user/newsfeed.css'
import React, { useEffect, useRef, useState } from 'react'
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
import { commentNotification, disLikeNotification, doFollow, doUnfollow, followNotification, likeNotification, unfollowNotification } from '../../api/UserRequests';
import UserProfile from '../../pages/User/UserProfile';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'timeago.js'
import { deleteCommentNotification, editComment, handleDeleteComment } from '../../api/PostRequests';
import { io } from 'socket.io-client'
import { notificationContext } from '../../context/NotificationContext';
import PostEditModal from './Modal/PostEditModal';
import ReportModal from './Modal/ReportModal';



function Newsfeed() {
  const { postUploaded, setpostUploaded, postEditDetails, setPostEditDetails } = useContext(modalContext)
  const { notification, setNotification } = useContext(notificationContext)
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken')
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString);
  const [posts, setPosts] = useState([])
  const [change, setChange] = useState(false)
  const [myComment, setMyComment] = useState('');
  const [commentButtonDisabled, setCommentButtonDisabled] = useState(0)
  const [commentInput, setCommentInput] = useState('')
  const [newNotification, setNewNotification] = useState(false)
  const [isFollow, setIsFollow] = useState(false)
  const [postEditModalIsOpen, setPostEditModalIsOpen] = useState(false)
  const [edittingComment, setEdittingComment] = useState(''); 
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false)
  const [reportValue, setReportValue] = useState('')
  const [reportCommentId, setReportCommentId] = useState('')
  const [reportPostId, setReportPostId] = useState('')
  const socket = useRef()
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': "application/json",
      authorization: `Bearer ${jwtToken}`
    },
  }

  // adding active user
  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user[0]._id)
    setNewNotification(!newNotification)
    // socket.current.on('get-users', (users) => {
    //     setOnlineUsers(users)
    // })
  }, [userString])

  useEffect(() => {
    axiosInstance.get(`/getAllPosts`, config).then(resp => {
      setPosts(resp.data)
    }).catch(()=>navigate('/error'))
  }, [change, postUploaded, isFollow])

  // Accordion session
  const [accordionOpen, setAccordionOpen] = useState(0);

  const handleAccordionOpen = (value) => {
    setAccordionOpen(accordionOpen === value ? 0 : value);
  };
  // Accordion session

  const handleCommentSubmit = (postId, username, profileImg, postUserId) => {
    axiosInstance.get(`/postComment?userId=${user[0]._id}&postId=${postId}&comment=${myComment}&username=${username}&profileImg=${profileImg}`, config)
      .then(resp => {
        setChange(!change)
        setpostUploaded(!postUploaded)
        setCommentButtonDisabled(0)
        commentNotification(user[0]._id, username, postUserId, postId).then(()=>{
        }).catch((err)=>{
          navigate('/error')
        })

        //sent notification to socket
        socket.current.emit('sendNotification', postUserId)
        setNewNotification(!newNotification)

      }).catch(err => {
        navigate('/error')
      })
  }

  const handleEditComment = async (e, postId, commentId) => {
    e.preventDefault()
    try {
      let result = await editComment(postId, commentId, myComment)
      if (result) {
        setChange(!change)
        setEdittingComment('')
      }
    } catch (error) {
      navigate('/error')
    }
  }

  useEffect(() => {
    socket.current.on('receiveNotificaton', (data) => {
      console.log('receiveNotificaton at front end');
      setNotification(Math.random())
    })
  }, [newNotification])

  const handlePostEdit = (postData) => {
    setPostEditDetails({
      postId: postData._id,
      postUrl: postData.postUrl,
      description: postData.description
    })
    setPostEditModalIsOpen(true)
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
        axiosInstance.get(`/postDelete?postId=${postId}`, config).then(resp => {
          Swal.fire(
            'Deleted!',
            'Your Post has been deleted.',
            'success'
          )
          setChange(!change)
        }).catch(()=>navigate('/error'))
      }
    })
  }

  const handleFollow = (refUserId, refUsername) => {
    doFollow(user[0]._id, user[0].username, refUserId, refUsername).then(resp => {
      setIsFollow(!isFollow)
      resp.data = [resp.data]
      localStorage.setItem("user", JSON.stringify(resp.data));
      let result = followNotification(user[0]._id, user[0].username, refUserId).catch(()=>navigate('/error'))

      //sent notification to socket
      socket.current.emit('sendNotification', refUserId)
      setNewNotification(!newNotification)
    }).catch(()=>navigate('/error'))
  }

  const handleUnfollow = (refUserId) => {
    doUnfollow(user[0]._id, refUserId).then(resp => {
      setIsFollow(!isFollow)
      resp.data = [resp.data]
      localStorage.setItem("user", JSON.stringify(resp.data));
      unfollowNotification(user[0]._id, refUserId).catch(()=>navigate('/error'))
    }).catch(()=>navigate('/error'))
  }

  return (
    <>
      <div className='flex flex-col'>
        {posts.length > 0 ?
          posts.map((item, index) => {
            return <div key={item._id} className='bg-white my-5 rounded-2xl md:min-w-[500px] max-w-[400px] border border-gray-400 overflow-hidden'>
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
                  <div>
                    <div className='cursor-pointer mb-[-3px]'>{item.userData[0].username}</div>
                    <div><span className='text-xs'>{format(item.createdDate)}</span></div>
                  </div>
                  <div>
                    {item.userData[0]._id === user[0]._id
                      ?
                      ''
                      :
                      item.userData[0].followers && item.userData[0].followers.find(elem => elem.refUserId === user[0]._id)
                        ?
                        <Menu placement="right-start">
                          <MenuHandler>
                            <Button className='bg-white text-black rounded-2xl p-0 px-2 shadow-none'> <span className='cursor-pointer text-blue-400 hover:text-blue-600 font-semibold text-sm' onClick={() => {
                            }}>Following</span></Button>
                          </MenuHandler>
                          <MenuList className='flex flex-col z-20'>
                            <MenuItem className='hover:border hover:border-gray-300  py-2 rounded-2xl' onClick={() => {
                              handleUnfollow(item.userData[0]._id)
                            }}>Unfollow</MenuItem>
                          </MenuList>
                        </Menu>
                        :
                        <span className='cursor-pointer text-blue-400 hover:text-blue-600 font-semibold text-sm' onClick={() => {
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
                          handlePostEdit(item)
                        }}>Edit</MenuItem>
                        <MenuItem className='hover:border hover:border-gray-300  py-2 rounded-2xl' onClick={() => {
                          handlePostDelete(item._id)
                        }}>Delete</MenuItem>
                      </MenuList>
                      :
                      <MenuList className='flex flex-col z-20 shadow-none' >
                        <MenuItem className='hover:border hover:border-gray-300  py-2 rounded-2xl ' onClick={() => {
                          setReportModalIsOpen(true)
                          setReportValue('Post')
                          setReportPostId(item._id)
                        }}>Report</MenuItem>
                      </MenuList>
                    }
                  </Menu>
                </div>
              </div>
              {postEditModalIsOpen && <PostEditModal setPostEditModalIsOpen={setPostEditModalIsOpen} />}
              {reportModalIsOpen && <ReportModal setReportModalIsOpen={setReportModalIsOpen} reportValue={reportValue} postId={reportPostId} commentId={reportCommentId} />}
              {/* post area */}

              {item.description && <div className='px-3 pb-2 w-[500px] break-words'>
                <span className='break-words'>{item.description}</span>
              </div>}
              <div onDoubleClick={() => {
                axiosInstance.get(`/likePost?postId=${item._id}&userId=${user[0]._id}`, config).then((resp) => {
                  likeNotification(user[0]._id, user[0].username, item.userData[0]._id, item._id)
                  //sent notification to socket
                  socket.current.emit('sendNotification', item.userData[0]._id)
                  setNewNotification(!newNotification)
                  setChange(!change)
                })
              }}>
                <img className='w-[500px] h-[500px] object-contain bg-black' src={item.postUrl} alt="" />
              </div>
              {/* bottom area */}
              <div>
                <div className='flex justify-between px-4 py-3'>
                  <div className='flex gap-8 text-3xl font-bold text-gray-700'>
                    <div className='flex justify-center items-center gap-3'>
                      {(item.likes.filter(elem => elem.refUser === user[0]._id)).length ?
                        <FaHeart className='dislike' color='red' onClick={() => {
                          axiosInstance.get(`/dislikePost?postId=${item._id}&userId=${user[0]._id}`, config).then(() => {
                            disLikeNotification(user[0]._id, item.userData[0]._id, item._id).catch(()=>navigate('/error'))
                            setChange(!change)
                          })
                        }} />
                        :
                        <FaRegHeart className='like hover:text-gray-300' onClick={() => {
                          axiosInstance.get(`/likePost?postId=${item._id}&userId=${user[0]._id}`, config).then(() => {
                            likeNotification(user[0]._id, user[0].username, item.userData[0]._id, item._id).catch(()=>navigate('/error'))
                            //sent notification to socket
                            socket.current.emit('sendNotification', item.userData[0]._id)
                            setNewNotification(!newNotification)
                            setChange(!change)
                          })
                        }} />
                      }
                      {item.likes.length ? <div className='text-sm'>{item.likes?.length}</div> : ''}
                    </div>
                    <div className='flex  justify-center items-center gap-3'>
                      <FaRegComment className='self-start hover:text-gray-400' onClick={() => handleAccordionOpen(item._id)} />
                      {item.comments.length ? <div className='text-sm'>{item.comments?.length} </div> : ''}
                    </div>
                    {/* <FiSend/  */}
                  </div>
                  {/* <div className='text-3xl'>
                    <FaRegBookmark />
                  </div> */}
                </div>
                <div className='px-4'>
                  <Accordion open={accordionOpen === item._id} >
                    <AccordionBody>
                      <div className='accordion max-h-[20vh] overflow-y-scroll'>
                        {item.comments.length ? (item.comments.slice(0).reverse()).map(elem => {
                          return <div key={elem._id} className='p-2'>
                            {edittingComment === elem._id ?
                              <div className='flex items-center justify-between' >
                                <div className='flex gap-4 items-center w-full'>
                                  <div>
                                    <img className='w-7 h-7 rounded-full outline outline-offset-2 outline-2 outline-[#0e1efb] cursor-pointer' src={elem.refUserProfileImg} alt="" />
                                  </div>
                                  <span className='text-base font-semibold'>{elem.refUsername}</span>
                                  <div className='w-full flex-1'>
                                    <form onSubmit={(e) => {
                                      handleEditComment(e, item._id, elem._id);
                                    }} className='flex justify-between border-b border-black'>
                                      <input type="text" value={elem.comment} onChange={(e) => {
                                        elem.comment = e.target.value
                                        setMyComment(e.target.value)
                                      }} />
                                      <button className='text-blue-500 font-semibold'>Submit</button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              :
                              <div className='flex items-center justify-between'>
                                <div className='flex gap-4 items-center'>
                                  <div>
                                    <img className='w-7 h-7 rounded-full outline outline-offset-2 outline-2 outline-[#0e1efb] cursor-pointer' src={elem.refUserProfileImg} alt="" />
                                  </div>
                                  <span className='text-base font-semibold'>{elem.refUsername}</span>
                                  <span >{elem.comment}</span>
                                  <span>{format(elem.time)}</span>
                                </div>
                                {/* <AiOutlineEllipsis className='text-lg cursor-pointer' /> */}

                                <Menu placement="left-start">
                                  <MenuHandler>
                                    <Button className='bg-white text-black rounded-2xl p-0 px-2'>
                                      <AiOutlineEllipsis className='text-lg cursor-pointer' />
                                    </Button>
                                  </MenuHandler>
                                  {user[0]._id === elem.refUser ?
                                    <MenuList className='flex flex-col z-20 bg-gray-200'>
                                      <MenuItem className='hover:border hover:border-gray-400  py-2 rounded-2xl' onClick={() => {
                                        setEdittingComment(elem._id)
                                        setChange(!change)
                                      }}>Edit Comment</MenuItem>
                                      <MenuItem className='hover:border hover:border-gray-400  py-2 rounded-2xl' onClick={() => {
                                        handleDeleteComment(item._id, elem._id).then((resp) => {
                                          deleteCommentNotification(user[0]._id, item.userId, item._id)
                                          setChange(!change)
                                        })
                                      }}>Delete Comment</MenuItem>
                                    </MenuList>
                                    :
                                    <MenuList className='flex flex-col z-20 bg-gray-200'>
                                      <MenuItem className='hover:border hover:border-gray-400  py-2 rounded-2xl' onClick={() => {
                                        setReportModalIsOpen(true)
                                        setReportValue('Comment')
                                        setReportPostId(item._id)
                                        setReportCommentId(elem._id)
                                      }}>Report Comment</MenuItem>
                                    </MenuList>
                                  }
                                </Menu>


                              </div>
                            }

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
                    handleCommentSubmit(item._id, user[0].username, user[0].profileImg, item.userData[0]._id)
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
          })

          :
          <div className='m-auto'>
            <h1 className='logoAnchor text-6xl'>Welcome To Anchor</h1>
          </div>
        }
      </div>
    </>
  )
}

export default Newsfeed