import axiosInstance from "../config/baseUrl";
const jwtToken = localStorage.getItem('jwtToken')
const config= {
    credentials:'include',
    headers:{
      'Content-Type':"application/json",
      authorization:`Bearer ${jwtToken}` 
    },
  }

export const getMessages = (id) => axiosInstance.get(`/message/${id}`,config)
export const addMessage =(data)=> axiosInstance.post('/message',data,config)