import '../../assets/stylesheets/user/chat.css'
import React, { useRef, useState, useEffect, useContext } from 'react'
import Conversation from '../../components/User/Conversation';
import { userChats } from '../../api/ChatRequests';
import { io } from 'socket.io-client'
import Chatbox from '../../components/User/Chatbox';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { messageRead } from '../../api/MessageRequest';
import { notificationContext } from '../../context/NotificationContext';

function Chat() {
    const { notification, setNotification,messageNotification,setMessageNotification } = useContext(notificationContext)
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString);
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receivedMessage, setReceiveMessage] = useState(null)
    const [topChat,setTopChat] = useState(false)
    const [receiverUser,setReceiverUser] = useState('')
    const navigate = useNavigate()
    const location = useLocation();
    const socket = useRef()

    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit('new-user-add', user[0]._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
        })
    }, [userString])

    //send message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    //receive message from socket server
    useEffect(() => {
        socket.current.on('receive-message', (data) => {
            setReceiveMessage(data)
            setMessageNotification(!messageNotification)
        })
    }, [sendMessage])

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user[0]._id)
                setChats(data)
            } catch (error) {
                navigate('/error')
            }
        }
        getChats()
    }, [userString,topChat])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find(member => member !== user[0]._id)
        const online = onlineUsers.find(user => user.userId === chatMember)
        return online ? true : false
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='pt-16 sm:pl-14 lg:pl-64 min-h-screen flex bg-[#fafafa]'>
                <div className='flex mx-10 my-2 rounded-md border border-zinc-300 bg-white w-full h-[88vh]' >
                    <div className="Chat w-full">
                        {/* left side */}
                        <div className="Left-side-chat px-2">
                            <div className="Chat-container ">
                                <h2>Chats</h2>
                                <div className={`Chat-list`}>
                                    {chats&&chats.map(chat => (
                                        <div key={chat._id} onClick={() => {
                                            setCurrentChat(chat)
                                            let result = chat.members.find((item)=>item !== user[0]._id)
                                            setReceiverUser(result)
                                            messageRead(chat._id).catch(err=>console.log(err))
                                        }}>
                                            <Conversation data={chat} currentUserId={user[0]._id} online={checkOnlineStatus(chat)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* right side */}
                        <div className="Right-side-chat">
                            {/* chat body */}
                            <Chatbox chat={currentChat || location?.state?.chat} currentUser={user[0]._id} receiverUser={receiverUser || location?.state?.receiverUser} setSendMessage={setSendMessage} receivedMessage={receivedMessage} topChat={topChat} setTopChat={setTopChat} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat