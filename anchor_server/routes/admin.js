var express = require('express');
var router = express.Router();
const adminControllers = require('../controllers/adminControllers');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',adminControllers.login)

module.exports = router;
