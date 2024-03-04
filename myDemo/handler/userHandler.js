var userDao = require('../db/userDao');


function login(req, res){
    var username = req.body.username;
    var password = req.body.password;
    userDao.getUser(username, password, function(err, user){
        if(err){
            res.send(err);
        }else{
            res.send(user);
        }
    });
}


module.exports.login = login;

