import React from 'react'
import { useState, useEffect } from 'react'
import { getUser } from '../../api/UserRequests'

function Conversation({ data, currentUserId, online ,topChat}) {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const userId = data.members.find(id => id !== currentUserId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    }, [])

    return (
        <>
            <div className="follower conversation">
                <div className='flex items-center gap-2'>
                    <div>
                    {online && <div className="online-dot"></div>}
                    <img className='followerImage' style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        src={userData && userData[0].profileImg} alt="profilePicture 49:32" />
                        </div>
                    <div className='name flex flex-col' style={{ fontSize: '0.8rem' }}>
                        <span className='text-base'>{userData && userData[0]?.name}</span>
                        <span className='text-[#bdbdbd]'>{online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>


    )
}

export default Conversation
