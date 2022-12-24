var express = require('express');
var router = express.Router();

const chatControllers = require('../controllers/chatControllers')
const {isAuth} =require('../middlewares/IsAuth')

router.post('/',isAuth, chatControllers.createChat)
router.get('/findUserChats/:userId',isAuth,chatControllers.userChats)
router.get('/find/:firstId/:secondId',isAuth,chatControllers.findChat)
router.get('/updateChatTime',isAuth,chatControllers.updateChatTime)

module.exports = router;
