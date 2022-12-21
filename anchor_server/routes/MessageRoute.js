var express = require('express');
var router = express.Router();
const messageControllers = require('../controllers/messageControllers');
const { isAuth } = require('../middlewares/IsAuth');

router.post('/', isAuth, messageControllers.addMessage)
router.get('/:chatId', isAuth, messageControllers.getMessages)


module.exports = router;