var express = require('express');
var router = express.Router();

const chatControllers = require('../controllers/chatControllers')
const {isAuth} =require('../middlewares/IsAuth')

router.post('/',isAuth, chatControllers.createChat)
router.get('/:userId',isAuth,chatControllers.userChats)
router.get('/find/:firstId/:secondId',isAuth,chatControllers.findChat)

module.exports = router;
