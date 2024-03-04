var express = require('express');
var router = express.Router();

var userHandler = require('../handler/userHandler');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/user/:username', function(req, res, next) {
});


router.get('/info', userHandler.info);


router.post('/login', userHandler.login);


router.get('/logout', userHandler.logout);

module.exports = router;
