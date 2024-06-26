var express = require('express');
var router = express.Router();
// 导入jwt
const jwt = require('jsonwebtoken');
// 导入配置文件
const {secret} = require('../../config/config');
// 导入用户模型
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

// 登录操作
router.post('/login', (req, res) => {
    // 获取用户名和密码
    let {username, password} = req.body;
    // 查询数据库
    UserModel.findOne({username: username, password: md5(password)})
    .then((data) => {
        if(!data){
            return res.json({
                code: '2001',
                msg: '账号和密码错误···！！！！',
                data: null
            });
        }
        // 创建当前用户的token
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        }, secret, {
            expiresIn: 60 * 60 * 24 * 7
        });
        // 响应token
        res.json({
            code: '0000',
            msg: '登陆成功',
            data: token
        })
    })
    .catch((err) => {
        res.status(500).send('登录失败，请稍后再试！！');
        res.json({
            code: '2001',
            msg: '数据库读取失败！！！！！',
            data: null
        });
        return;
    })
});

// 退出登录
router.post('/logout', (req, res) => {
   // 销毁session
   req.session.destroy(() => {
    res.render('success', {msg: '退出成功！', url: '/login'});
   }) 
})

module.exports = router;