import '../../assets/stylesheets/user/chatbox.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { addMessage, getMessages } from '../../api/MessageRequest';
import { getUser } from '../../api/UserRequests';
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { updateTime } from '../../api/ChatRequests';
import { useNavigate } from 'react-router-dom';

function Chatbox({ chat, currentUser,receiverUser, setSendMessage, receivedMessage, online,topChat,setTopChat }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState('')
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true)
  const navigate = useNavigate()
  const scroll = useRef()
  
  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage])
    }
  }, [receivedMessage])

  //data for header
  useEffect(() => {
    const userId = chat?.members?.find(id => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    }
    if (chat) getUserData()
  }, [chat, currentUser])

  //data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id)
        setMessages(data)
      } catch (error) {
        console.log(error);
      }
    }
    if (chat) fetchMessages();
  }, [chat])

  const handleChange = (newMessages) => {
    if (newMessages.trim().length > 0) setSendButtonDisabled(false)
    else setSendButtonDisabled(true)
    setNewMessages(newMessages)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (newMessages.trim().length > 0) {
      const message = {
        senderId: currentUser,
        receiverUser,
        text: newMessages,
        chatId: chat._id,
      }
      // send message to db
      try {
        console.log(message,'to db message');
        const { data } = await addMessage(message)
        setMessages([...messages, data])
        setNewMessages('')
        updateTime(chat._id)
        setTopChat(!topChat)
      } catch (error) {
        navigate('/error')
      }

      //send message to socket server
      const receiverId = chat.members.find(id => id !== currentUser)
      setSendMessage({ ...message, receiverId })
    }
  }

  //scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  return (
    <>
      {chat ? (
        <div className="ChatBox-container h-full bg-red-300 p-2">
          <div className="chat-header">
            <div className="follower">
              <div className='flex items-center gap-3'>
                <img className='followerImage' style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  src={userData && userData[0].profileImg} alt="profilePicture 49:32" />
                <div className='name flex flex-col' style={{ fontSize: '0.8rem' }}>
                  <span>{userData && userData[0]?.name}</span>
                  {/* {online ?
                    <span className='text-[#7af07a]'>Online</span>
                    :
                    <span className='text-[#a6a6a6]'>Offline</span>
                  } */}
                </div>
              </div>
            </div>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
          </div>

          {/* chatbox messages */}
          <div className="chat-body">
            {messages.map(message => (
              <div ref={scroll} className={message.senderId === currentUser ? 'message own' : 'message'}>
                <span>{message.text}</span>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>

          {/* chat sender */}
          <div className="chat-sender">
            {/* <div>+</div> */}
            <InputEmoji value={newMessages} onChange={handleChange} />
            <div
              //  className="bg-[#c6c2e6] cursor-default px-10 py-10 rounded-lg"
              className={`cursor-default rounded-lg ${(sendButtonDisabled) ? 'sendButtonDisabled' : 'sendButton'} `}
              onClick={handleSend}>Send</div>
          </div>
        </div>
      ) : (
        <div className="ChatBox-container-null h-full">
          <div className=' flex justify-center items-center text-2xl h-full'>
            <span>Send and Receive Messages in Anchor...</span>
          </div>
        </div>
      )
      }

    </>
  )
}

export default Chatbox