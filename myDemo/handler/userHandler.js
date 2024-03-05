const e = require('express');
var userDao = require('../db/userDao');
const {createToken} = require('../util/jwtUtil');
const cryptoUtil = require('../util/cryptoUtil');


function login(req, res){
    var username = req.body.username;
    userDao.getUserByUsername(username).then((result) => {
        if(result && result.length > 0){
            const user = result[0];
            const userPassword = user.password;
            const saltPassword = cryptoUtil.hashPassword(req.body.password + user.salt);
            if(userPassword === saltPassword){
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

register = (req, res) =>{
    const user = req.body;
    console.log('user: ', user);
    if(!user){
        res.send({status:1, msg:'请求内容不能为空！'});
    }else{
        userDao.getUserByUsername(user.username).then(rows => {
            if(rows && rows.length > 0){
                res.send({status:1, msg:'该用户已存在！'});
            }else{
                user.salt = cryptoUtil.randomString(6);
                user.password = cryptoUtil.hashPassword(user.password + user.salt);
                userDao.addUser(user).then(result => {
                    if(result.affectedRows > 0){
                        res.send({status:0, msg:'添加成功！'});
                    }else{
                        res.send({status:1, msg:'添加失败！'});
                    }
                }).catch(err => {
                    console.log('err: ', err);
                    res.send({status:1, msg:'添加失败！'});
                });
            }
        })
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
    logout: logout,
    register: register
};

