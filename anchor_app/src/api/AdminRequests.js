import axiosInstance from "../config/baseUrl";
const jwtToken = localStorage.getItem('jwtToken')
const config = {
  credentials: 'include',
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${jwtToken}`
  },
}

export const getAllUsers = () =>axiosInstance.get('/admin/getAllUsers')
export const blockUnblockUser = (userId) => axiosInstance.get(`/admin/blockUnblockUser?userId=${userId}`)
export const getReportedPosts = () =>axiosInstance.get(`/admin/getReportedPosts`)
export const deletePost = (postId) => axiosInstance.get(`/admin/deletePost?postId=${postId}`)