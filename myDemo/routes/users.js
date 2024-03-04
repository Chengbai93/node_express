var express = require('express');
var router = express.Router();

var userHandler = require('../handler/userHandler');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/user/:username', function(req, res, next) {
});



router.post('/login', userHandler.login);

module.exports = router;
