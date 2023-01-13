import React, { useContext, useState,useEffect } from 'react'
import { FaRegHeart, FaHeart, FaRegComment, FaRegShareSquare, FaRegBookmark, FaEllipsisH, FaRegSmileWink, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/baseUrl';
import { modalContext } from '../../context/Context';
import PostComments from './PostComments';


function PostImpressions({ item,change,setChange }) {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString);
    const jwtToken = localStorage.getItem('jwtToken')
    const { postUploaded, setpostUploaded } = useContext(modalContext)
    const [commentButtonDisabled, setCommentButtonDisabled] = useState(0)
    const [commentInput, setCommentInput] = useState('')
    const [myComment, setMyComment] = useState('');
    const navigate = useNavigate()

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
      }).catch(()=>navigate('/error'))
  }

    return (
        <div>
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
                                }).catch(()=>navigate('/error'))
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
                                }).catch(()=>navigate('/error'))
                            }} />
                        }
                        <FaRegComment onClick={() => handleAccordionOpen(item._id)} />
                        {/* <FiSend/  */}
                    </div>
                    <div className='text-3xl'>
                        <FaRegBookmark />
                    </div>
                </div>
                <PostComments item={item} accordionOpen={accordionOpen} setAccordionOpen={setAccordionOpen} change={change} />
                <div className='py-3 px-5 border border-t-gray-200 '>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handleCommentSubmit(item._id, user[0].username, user[0].profileImg)
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

export default PostImpressions