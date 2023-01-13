import React, { useContext, useState } from 'react'
import { modalContext } from '../../../context/Context';
import Swal from 'sweetalert2'
import { updatePost } from '../../../api/PostRequests';
import { useNavigate } from 'react-router-dom';


function PostEditModal({ setPostEditModalIsOpen }) {

    const { postEditDetails, setPostEditDetails, postUploaded, setpostUploaded } = useContext(modalContext)
    const [description, setDescription] = useState('')
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    const jwtToken = localStorage.getItem('jwtToken')
    const [disableUpdateBtn, setDisableUpdateBtn] = useState(true)
    const navigate = useNavigate()

    const saveToDB = async () => {
        try {
            let result = await updatePost(postEditDetails.postId, description)
            if (result) {
                setpostUploaded(!postUploaded)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your Post has been Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            navigate('/error')
        }
    }

    return (

        //custom PostEditModal start
        <>
            <div onClick={() => setPostEditModalIsOpen(false)} className='fixed z-20 h-screen w-screen flex justify-center items-center top-0 left-0' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.1 )' }}>
                <div onClick={(e) => {
                    if (!e) var e = window.event;
                    e.cancelBubble = true;
                    if (e.stopPropagation) e.stopPropagation();
                }} className='bg-white min-w-[500px] min-h-[500px] rounded-2xl flex justify-center items-center overflow-hidden'>
                    <div>
                        <div className='flex justify-around w-full'>
                            <div className='w-full'>
                                <img className='h-[500px] w-full object-cover' src={postEditDetails.postUrl} alt="" />
                            </div>

                            <div className='min-w-[300px] p-4'>
                                <div className='h-full '>
                                    {/* Post Description */}
                                    <div className='flex flex-col justify-center h-full'>
                                        <label htmlFor="postDesc" className=''>Edit Description</label>
                                        <div className='mt-10 h-full'>
                                            <textarea onChange={(e) => {
                                                setDescription(e.target.value)
                                                if (e.target.value.trim().length > 0) setDisableUpdateBtn(false)
                                                else setDisableUpdateBtn(true)
                                                console.log(e.target.value.trim().length);
                                            }} type="text" id='postDesc' className='border-b border-b-black outline-none h-1/2 w-full' placeholder={postEditDetails.description} />
                                        </div>
                                    </div>
                                    {/* Post Description */}
                                </div>
                            </div>
                        </div>
                        <div className='py-2 px-10 flex justify-end border-t-2'>
                            {!disableUpdateBtn ?
                                <span className='text-lg text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => {
                                    saveToDB()
                                    setPostEditModalIsOpen(false)
                                }}>Update</span>
                                :
                                <span className='text-lg text-blue-100'>Update</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
        //custom PostEditModal end
    )
}

export default PostEditModal