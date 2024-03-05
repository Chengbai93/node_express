const e = require('express');
var userDao = require('../db/userDao');
const {createToken} = require('../util/jwtUtil');


function login(req, res){
    var username = req.body.username;
    var password = req.body.password;
    console.log('username: ', username);
    console.log('password: ', password);
    userDao.getUserByUsername(username).then((result) => {
        if(result && result.length > 0){
            const user = result[0];
            const userPassword = user.password;
            if(userPassword === password){
                res.send({status:0, msg:'登录成功！', data: createToken(user)});
            }else{
                res.send({status:1, msg:'用户名或密码错误！'});
            }
        }else{
            console.log('user not found!');
            res.send({status:1, msg:'用户名或密码错误！'});
        }
    }).catch((err) => {
        console.log('err: ', err);
        res.send({status:1, msg:'用户名或密码错误！'});
    });
}

info = (req, res) =>{
    console.log('req auth', req.auth);
    if(!req.auth){
        res.send({status:1, msg:'请先登录！'});
    }else{
        const username = req.auth.username;
        userDao.getUserByUsername(username).then((result) => {
            res.send({status:0, msg:'登录成功！', data: result});
        }).catch((err) => {
            console.log('err: ', err);
            res.send({status:1, msg:'登录成功！'});
        });
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

