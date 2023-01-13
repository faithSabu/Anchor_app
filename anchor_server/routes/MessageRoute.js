var express = require('express');
var router = express.Router();
const messageControllers = require('../controllers/messageControllers');
const { isAuth } = require('../middlewares/IsAuth');

router.post('/', isAuth, messageControllers.addMessage)
router.get('/find/:chatId', isAuth, messageControllers.getMessages)
router.get('/messageRead',isAuth,messageControllers.messageRead)


module.exports = router;