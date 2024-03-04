const e = require('express');
var userDao = require('../db/userDao');


function login(req, res){
    var username = req.body.username;
    var password = req.body.password;
    console.log('username: ', username);
    console.log('password: ', password);
    userDao.getUserByUsername(username).then((result) => {
        if(result && result.length > 0){
            const user = result[0];
            console.log('user: ', user);
            const userPassword = user.password;
            if(userPassword === password){
                req.session.isLogin = true;
                req.session.user = user;
                res.send({status:0, msg:'登录成功！'});
            }else{
                res.send({status:1, msg:'用户名或密码错误！'});
            }
        }else{
            res.send({status:1, msg:'用户名或密码错误！'});
        }
    }).catch((err) => {
        
        res.send({status:1, msg:'用户名或密码错误！'});
    });
}

info = (req, res) =>{
    if(!req.session.isLogin){
        res.send({status:1, msg:'请先登录！'});
    }else{
        res.send({status:0, msg:'登录成功！', data: req.session.user});
    }
}

logout = (req, res) =>{
    req.session.isLogin = false;
    req.session.user = null;
    req.session.destroy();
    res.send({status:0, msg:'退出成功！'});
}



module.exports = {
    login: login,
    info: info,
    logout: logout
};

