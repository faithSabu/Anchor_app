import axiosInstance from "../config/baseUrl";
const jwtToken = localStorage.getItem('jwtToken')
const config = {
  credentials: 'include',
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${jwtToken}`
  },
}

export const handleDeleteComment = (postId, commentId) => axiosInstance.get(`/deleteComment?postId=${postId}&commentId=${commentId}`, config)
export const deleteCommentNotification = (commentedUserId, postUserId, postId) => axiosInstance.get(`/deleteCommentNotification?commentedUserId=${commentedUserId}&postUserId=${postUserId}&postId=${postId}`, config)
export const getSinglePostData = (postId) => axiosInstance.get(`/getSinglePostData?postId=${postId}`, config)
export const updatePost = (postId, description) => axiosInstance.get(`/updatePost?postId=${postId}&description=${description}`, config)
export const editComment = (postId, commentId, comment) => axiosInstance.get(`/editComment?postId=${postId}&commentId=${commentId}&comment=${comment}`, config)
export const reportPost = (postId, reason) => axiosInstance.get(`/reportPost?postId=${postId}&reason=${reason}`,config)
export const reportComment = (postId, commentId, reason) => axiosInstance.get(`/reportComment?postId=${postId}&commentId=${commentId}&reason=${reason}`,config)