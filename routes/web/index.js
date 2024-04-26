var express = require('express');
var router = express.Router();

// 导入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

// 导入中间件
// 声明中间件检测登录
let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

/* GET home page. */
// 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向
  res.redirect('/account');
})

//记账本的列表
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  // 读取集合信息
  AccountModel.find().sort({time: -1}).then(
    (data) => {
    res.render('list', {accounts: data, moment: moment})
  })
  .catch(
    (err) => {
    res.status(500).send('读取失败！！！');
    return;
  })
});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改type属性的值
    time: moment(req.body.time).toDate()
  })
  .then((data) => {
    res.render('success', {msg: '添加成功哦~~~', url: '/account'})
  })
  .catch((err) => {
    res.status(500).send('插入失败！！！');
    return;
  })
    
});

// 删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  // 获取params id参数
  let id = req.params.id;
  //删除
  // db.get('accounts').remove({id:id}).write();
  AccountModel.deleteOne({_id: id})
  .then((data) => {
    res.render('success', {msg: '删除成功哦~~~', url: '/account'});
  })
  .catch((err) => {
    res.status(500).send('删除失败');
    return;
  })
  
})

module.exports = router;
