import '../../assets/stylesheets/user/profile.css'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/User/Navbar'
import Sidebar from '../../components/User/Sidebar'
import { FaRegUserCircle, FaUserCog, FaRegArrowAltCircleLeft } from "react-icons/fa";
// import { BsArrowLeftShort } from "react-icons/bs";
import axiosInstance from '../../config/baseUrl';
// import ProfileSettings from './ProfileSettings';
import { useNavigate } from 'react-router-dom';
import PostViewModal from '../../components/User/Modal/PostViewModal';
import { modalContext } from '../../context/Context';
import FollowListModal from '../../components/User/Modal/FollowListModal';
// import ProfileSettings from '../../components/User/ProfileSettings';

function Profile() {
    const { postUploaded, setpostUploaded } = useContext(modalContext)
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    const jwtToken = localStorage.getItem('jwtToken')

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
    const config = {
        credentials: 'include',
        headers: {
            'Content-Type': "application/json",
            authorization: `Bearer ${jwtToken}`
        },
    }

    //modals
    const [postViewModalOpen, setPostViewModalOpen] = useState(false)
    //modals
    // const [settingsOpen, setsettingsOpen] = useState(false)

    useEffect(() => {
        setPostViewModalOpen(false)
        axiosInstance.get(`/getUserPosts?userId=${user[0]._id}`, config).then(resp => {
            setPosts(resp.data)
        })
        axiosInstance.get(`/getProfilerPicture?userId=${user[0]._id}`, config).then(resp => {
            setProfileImage(resp.data[0].profileImg)
            setName(resp.data[0].name)
            setUsername(resp.data[0].username)
            setUserDetails(resp.data[0])
        })
    }, [profileChange, postUploaded])



    const uploadImage = (e) => {
        if (!e.target.files[0]) return console.log("error");
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
                setProfileImage(data.url)
                axiosInstance.get(`/uploadProfileImage?userId=${user[0]._id}&imageUrl=${data.url}`, config).then(resp => {
                    resp.data = [resp.data]
                    localStorage.setItem("user", JSON.stringify(resp.data));
                })
            })
            .catch(err => console.log(err))

    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='pt-16 pl-64 flex justify-center min-h-screen'>
                <div className='py-7 px-10 bg-white'>
                    <div className='px-10 flex justify-between items-center gap-x-16 bg-white'>
                        <input type="file" id='profileImg' onChange={uploadImage} hidden />
                        <label htmlFor="profileImg">
                            <div className='profilePhotoDiv overflow-hidden'>
                                {profileImage ?
                                    <img className='w-[180px] h-[180px] object-cover' style={{ borderRadius: '50%' }} src={profileImage} alt="" />
                                    :
                                    <FaRegUserCircle className='text-9xl' />}
                            </div>
                        </label>
                        <div className='flex flex-col gap-5 w-[400px]'>
                            <div className='flex justify-between items-center text-4xl gap-x-4'>
                                <div>{username}</div>
                                <div onClick={() => navigate('/profileSettings')}><FaUserCog className='cursor-pointer' /></div>
                            </div>
                            <div className='flex gap-x-7 text-xl'>
                                <span>{posts.length} Posts</span>
                                {/* <span>{userDetails.followers ? userDetails.followers?.length : '0'} Followers</span>
                                <span>{userDetails.following ? userDetails.following?.length : '0'} Following</span> */}

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
                    <div className='w-full h-[1px] bg-black mt-2'></div>
                    <div className='flex flex-col items-center'>
                        <span className='text-lg m-5'>Posts</span>
                        <div className=''>
                            {posts.length > 0 ?
                                <div className="grid grid-cols-3 gap-10 md:grid-cols-3">
                                    {posts.length > 0 && posts.map((item, index) => {
                                        return <div key={item._id} className='h-48 w-52 rounded-lg flex justify-center'>
                                            <img onClick={() => {
                                                setPostViewModalOpen(true)
                                                setPostId(item._id)
                                            }} className='h-[250px] w-full rounded-lg relative' src={item.postUrl} alt="" />
                                        </div>
                                    })
                                    }
                                </div>
                                :
                                <div className='text-2xl'>No Posts!!!</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {followListModalOpen && <FollowListModal setFollowListModalOpen={setFollowListModalOpen} heading={heading} userId={userDetails._id} followList={followList} />}
            {postViewModalOpen && <PostViewModal setPostViewModalOpen={setPostViewModalOpen} postId={postId} profileChange={profileChange} setProfileChange={setProfileChange} />}
        </>
    )
}

export default Profile