import axiosInstance from "../config/baseUrl";
const jwtToken = localStorage.getItem('jwtToken')
const config = {
  credentials: 'include',
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${jwtToken}`
  },
}

export const addMessage = (data) => axiosInstance.post('/message', data, config)
export const getMessages = (id) => axiosInstance.get(`/message/find/${id}`, config)
export const messageRead = (chatId) => axiosInstance.get(`/message/messageRead?chatId=${chatId}`, config) 