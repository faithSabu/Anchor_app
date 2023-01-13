import React, { createContext, useState } from 'react'
import Modal from 'react-modal'
import { FaRegImages } from "react-icons/fa";
import axiosInstance from '../../config/baseUrl';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function ImageUploadModal(props) {

    const [createModalIsOpen, setCreateModalIsOpen] = useState(true)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState(false)
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    const jwtToken = localStorage.getItem('jwtToken')
    const navigate = useNavigate()

    const [viewImage,setViewImage] =useState(null);

    const uploadImage = (e) => {
        if (!e.target.files[0]) return console.log("error");

        setViewImage(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
        const data = new FormData()
        data.append('file', e.target.files[0])
        data.append('upload_preset', 'anchor')
        data.append('cloud_name', 'dls74pmjn')
        fetch('https://api.cloudinary.com/v1_1/dls74pmjn/image/upload', {
            method: 'post',
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setImage(data.url)
            })
            .catch(()=>navigate('/error'))
    }

    const saveToDB = () => {
        if (!image) return alert('Error')
        axiosInstance.get(`/uploadPost?userId=${user[0]._id}&postUrl=${image}`,{
            credentials:'include',
            headers:{
              'Content-Type':"application/json",
              authorization:`Bearer ${jwtToken}` 
            },
          }).then(resp =>{
            if(resp){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your Post has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }).catch(()=>navigate('/error'))
    }
    return (
        <div>
            <Modal isOpen={createModalIsOpen} onRequestClose={() => setCreateModalIsOpen(false)}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(38, 36, 37, 0.7)'
                    },
                    content: {
                        position: 'absolute',
                        top: '150px',
                        left: '450px',
                        right: '450px',
                        bottom: '150px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '20px',
                    }
                }}>
                {image ?
                    <div className='flex flex-col justify-center items-center mt-8'>
                        <img className='h-[300px] w-auto' src={image} alt="" />
                        <div className='mt-4 bg-green-600 px-8 py-2 rounded-3xl cursor-pointer hover:bg-green-500 text-white' onClick={()=>{
                            saveToDB()
                            setCreateModalIsOpen(false)
                        }}>Post</div>
                    </div>

                    :
                    description ?
                        <div>
                            Enter Description
                        </div>
                        :
                        <div className='flex flex-col justify-center items-center gap-3 mt-10'>
                            <FaRegImages className='text-[150px] text-gray-400' />
                            <div className='text-2xl'>Please Select Photos or Videos </div>
                            <label htmlFor="selectFile">
                                <div className='mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg '>Select from Computer</div>
                            </label>
                            <input type="file" id='selectFile' onChange={uploadImage} hidden />
                            <img src={viewImage} alt="Preview" />
                        </div>
                        
                }


            </Modal>
        </div>
    )
}

export default ImageUploadModal