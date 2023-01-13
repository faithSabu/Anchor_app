import React, { useContext, useState } from 'react'
import { FaRegImages } from "react-icons/fa";
import { modalContext } from '../../../context/Context';
import axiosInstance from '../../../config/baseUrl';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


function Modal() {

    const { postUploadModalIsopen, setPostUploadModalIsopen, postUploaded, setpostUploaded } = useContext(modalContext)
    const [image, setImage] = useState('')
    const [viewImage, setViewImage] = useState(null)
    const [description, setDescription] = useState('')
    const [invalidFile, setInvalidFile] = useState(false)
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    const jwtToken = localStorage.getItem('jwtToken')
    const navigate = useNavigate();

    const saveImage = (e) => {
        if (!e.target.files[0]) return console.log("error");
        let filePath = e.target.files[0].name;
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.avif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            setInvalidFile(true);
            return false;
        }

        setViewImage(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])

    }

    function saveToDB() {
        if (!image) return alert('Error')
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'anchor')
        data.append('cloud_name', 'dls74pmjn')
        fetch('https://api.cloudinary.com/v1_1/dls74pmjn/image/upload', {
            method: 'post',
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                axiosInstance.get(`/uploadPost?userId=${user[0]._id}&postUrl=${data.url}&description=${description}`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': "application/json",
                        authorization: `Bearer ${jwtToken}`
                    },
                }).then(resp => {
                    if (resp) {
                        setpostUploaded(!postUploaded)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your Post has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }).catch(()=>navigate('/error'))
            })
            .catch(()=>navigate('/error'))



    }

    return (

        //custom Modal start
        <>
            <div onClick={() => setPostUploadModalIsopen(false)} className='fixed z-20 h-screen w-screen flex justify-center items-center' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.45 )' }}>
                <div onClick={(e) => {
                    // if (!e) var e = window.event;
                    // e.cancelBubble = true;
                    if (e.stopPropagation) e.stopPropagation();
                }} className='bg-white min-w-[500px] min-h-[500px] rounded-2xl flex justify-center items-center overflow-hidden'>
                    {viewImage ?
                        <div>
                            <div className='flex justify-around w-full'>
                                <div className='w-full'>
                                    <img className='h-[500px] w-full object-cover' src={viewImage} alt="" />
                                </div>

                                <div className='min-w-[300px] p-4'>
                                    <div className='h-full '>
                                        {/* Post Description */}
                                        <div className='flex flex-col justify-center h-full'>
                                            <label htmlFor="postDesc" className=''>Enter Description</label>
                                            <div className='mt-10 h-full'>
                                                <textarea onChange={(e) => {
                                                    setDescription(e.target.value)
                                                }} type="text" id='postDesc' className='border-b border-b-black outline-none h-1/2 w-full' placeholder='Add Details...' />
                                            </div>
                                        </div>
                                        {/* Post Description */}
                                    </div>
                                </div>
                            </div>
                            <div className='py-2 px-10 flex justify-end border-t-2'>
                                <span className='text-xl text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => {
                                    saveToDB()
                                    setPostUploadModalIsopen(false)
                                }}>Post</span>
                            </div>
                        </div>
                        :
                        <div className='flex flex-col justify-center items-center gap-3 mt-10'>
                            <FaRegImages className='text-[150px] text-gray-400' />
                            <div className='text-2xl'>Please Select Photos or Videos </div>
                            <label htmlFor="selectFile">
                                <div className='mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg '>Select from Your Device</div>
                            </label>
                            {invalidFile && <span className='text-red-600'>Invalid File, Please Select Image or Video</span>}
                            <input type="file" id='selectFile' onChange={saveImage} hidden />
                        </div>
                    }
                </div>
            </div>
        </>
        //custom Modal end
    )
}

export default Modal