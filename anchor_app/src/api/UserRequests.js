import axiosInstance from "../config/baseUrl";
const jwtToken = localStorage.getItem('jwtToken')
const config = {
  credentials: 'include',
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${jwtToken}`
  },
}

export const getUser = (userId) => axiosInstance.get(`/getUser/${userId}`, config)
export const getAllUsers = () => config.headers.authorization.split(' ')[1] !== 'null' && axiosInstance.get(`/getAllUsers`, config)  // && condition for checking whether token is present or not
export const doFollow = (userId, username, refUserId, refUsername) => axiosInstance.get(`/follow?userId=${userId}&username=${username}&refUserId=${refUserId}&refUsername=${refUsername}`, config)
export const doUnfollow = (userId, refUserId) => axiosInstance.get(`/unfollow?userId=${userId}&refUserId=${refUserId}`, config)
export const followNotification = (userId, username, refUserId) => axiosInstance.get(`/followNotification?refUserId=${userId}&refUsername=${username}&userId=${refUserId}`, config)  // req.query is different from above
export const unfollowNotification = (userId, refUserId) => axiosInstance.get(`/unfollowNotification?refUserId=${userId}&userId=${refUserId}`, config)  // req.query is different 
export const getNotifications = (userId) => axiosInstance.get(`/getNotifications?userId=${userId}`, config)
export const likeNotification = (likedUserId, likedUsername, postUserId, postId) => axiosInstance.get(`/likeNotification?likedUserId=${likedUserId}&likedUsername=${likedUsername}&postUserId=${postUserId}&postId=${postId}`, config)
export const disLikeNotification = (disLikedUserId, postUserId, postId) => axiosInstance.get(`/disLikeNotification?disLikedUserId=${disLikedUserId}&postUserId=${postUserId}&postId=${postId}`, config)
export const commentNotification = (commentedUserId, commentedUsername, postUserId, postId) => axiosInstance.get(`/commentNotification?commentedUserId=${commentedUserId}&commentedUsername=${commentedUsername}&postUserId=${postUserId}&postId=${postId}`, config)
export const getNotificationLength= (userId)=> axiosInstance.get(`getNotificationLength?userId=${userId}`,config)
export const getMessageNotificationLength = (userId)=>axiosInstance.get(`/getMessageNotificationLength?userId=${userId}`,config)
export const getFollowList = (userId,followType) =>axiosInstance.get(`/getFollowList?userId=${userId}&followType=${followType}`,config)
export const isReadNotification = (userId,notificationId) =>axiosInstance.get(`/isReadNotification?userId=${userId}&notificationId=${notificationId}`,config)