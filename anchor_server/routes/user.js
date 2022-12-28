var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const { verifyToken } = require('../middlewares/tokenMiddlewares')
const { isAuth } = require('../middlewares/IsAuth')

/* GET home page. */
router.post('/', function (req, res, next) {
  console.log('Reached backend');
  res.status(500).json({ 'hai': 'hai' })
});

router.post('/signup', userControllers.generateOTP)
router.post('/otp', userControllers.verifyOTP)
router.get('/resendOTP', userControllers.resendOTP)
router.post('/login', userControllers.login)
router.get('/uploadProfileImage', isAuth, userControllers.uploadProfileImage)
router.post('/updateProfileInfo', isAuth, userControllers.updateProfileInfo)
router.post('/checkPassword', isAuth, userControllers.checkPassword)
router.post('/changePassword', isAuth, userControllers.changePassword)
router.get('/getProfilerPicture', isAuth, userControllers.getProfilerPicture)
router.get('/uploadPost', isAuth, userControllers.uploadPost)
router.get('/getUserPosts', isAuth, userControllers.getUserPosts)
router.get('/getAllPosts', isAuth, userControllers.getAllPosts)
router.get('/profieDetails', isAuth, userControllers.profieDetails)
router.get('/likePost', isAuth, userControllers.likePost)
router.get('/dislikePost', isAuth, userControllers.dislikePost)
router.get('/postComment', isAuth, userControllers.postComment)
router.get('/deleteComment', isAuth, userControllers.deleteComment)
router.get('/postDelete', isAuth, userControllers.postDelete)
router.get('/getUser/:userId', isAuth, userControllers.getUser)
router.get('/getAllUsers', isAuth, userControllers.getAllUsers)
router.get('/follow', isAuth, userControllers.follow)
router.get('/unfollow', isAuth, userControllers.unfollow)
router.get('/followNotification', isAuth, userControllers.followNotification)
router.get('/unfollowNotification', isAuth, userControllers.unfollowNotification)
router.get('/getNotifications', isAuth, userControllers.getNotifications)
router.get('/likeNotification', isAuth, userControllers.likeNotification)
router.get('/disLikeNotification', isAuth, userControllers.disLikeNotification)
router.get('/commentNotification', isAuth, userControllers.commentNotification)
router.get('/deleteCommentNotification', isAuth, userControllers.deleteCommentNotification)
router.get('/getSinglePostData', isAuth, userControllers.getSinglePostData)
router.get('/getNotificationLength',isAuth,userControllers.getNotificationLength)
router.get('/getFollowList',isAuth,userControllers.getFollowList)
router.get('/updatePost',isAuth,userControllers.updatePost)
router.get('/isAuthTest', (req, res) => {
  try {
    const userId = isAuth(req, res)
    console.log(userId);
    if (userId !== null) {
      res.json({
        data: 'is protected'
      })
    }
  } catch (error) {
    console.log(error);
    res.json({ data: 'not auth' })
  }
})


module.exports = router;