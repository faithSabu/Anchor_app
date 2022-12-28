import axiosInstance from "../config/baseUrl";
const jwtToken = localStorage.getItem('jwtToken')
const config= {
    credentials:'include',
    headers:{
      'Content-Type':"application/json",
      authorization:`Bearer ${jwtToken}` 
    },
  }

  export const handleDeleteComment = (postId,commentId)=>axiosInstance.get(`/deleteComment?postId=${postId}&commentId=${commentId}`,config)
  export const ReportComment = ()=>''
  export const deleteCommentNotification = (commentedUserId, postUserId, postId)=>axiosInstance.get(`/deleteCommentNotification?commentedUserId=${commentedUserId}&postUserId=${postUserId}&postId=${postId}`,config)
  export const getSinglePostData=(postId) => axiosInstance.get(`/getSinglePostData?postId=${postId}`,config)
  export const updatePost = (postId, description) => axiosInstance.get(`/updatePost?postId=${postId}&description=${description}`,config)