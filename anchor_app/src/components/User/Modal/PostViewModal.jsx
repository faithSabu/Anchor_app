import React from 'react'
import SingleImageView from '../SingleImageView';

function PostViewModal({ setPostViewModalOpen, postId, profileChange, setProfileChange }) {
    return (
        <>
            <div onClick={() => setPostViewModalOpen(false)} className='fixed bottom-0 z-10 h-screen w-screen flex justify-center items-center' style={{ backgroundColor: 'rgba( 16, 12, 12, 0.2 )' }}>
                <div onClick={(e) => {
                    if (!e) var e = window.event;
                    e.cancelBubble = true;
                    if (e.stopPropagation) e.stopPropagation();
                }} className=' min-w-[500px] min-h-[500px] rounded-2xl flex justify-center items-center overflow-hidden'>
                    <SingleImageView postId={postId} profileChange={profileChange} setProfileChange={setProfileChange} />
                </div>
            </div>
        </>
    )
}

export default PostViewModal