import axiosInstance from '../config/baseUrl'
const jwtToken = localStorage.getItem('jwtToken')
const config= {
    credentials:'include',
    headers:{
      'Content-Type':"application/json",
      authorization:`Bearer ${jwtToken}` 
    },
  }

export const userChats = (id)=>axiosInstance.get(`/chat/findUserChats/${id}`,config)
export const addNewChat = (senderId,receiverId)=>axiosInstance.post(`/chat/`,{senderId,receiverId},config)
export const updateTime = (chatId) => axiosInstance.get(`/chat/updateChatTime?chatId=${chatId}`,config)

 