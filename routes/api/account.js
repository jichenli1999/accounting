const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// 导入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');


// 导入中间件
let checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');


/* GET home page. */
//记账本的列表
router.get('/account', checkTokenMiddleware, function(req, res, next) {
  
  
    // 读取集合信息
    AccountModel.find().sort({time: -1})
    .then(
        (data) => {
        res.json({
            // 响应编号
            code: '0000',
            // 响应信息
            msg: '读取成功',
            // 响应数据
            data: data,
        })
    })
    .catch(
        (err) => {
        res.json({
            code: '1001',
            msg: '读取失败~',
            data: null
        });
        return;
    })
});




//新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
  // 表单验证

  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改type属性的值
    time: moment(req.body.time).toDate()
  })
  .then((data) => {
    res.json({
        code: '0000',
        msg: '创建成功！！',
        data: data
    })
  })
  .catch((err) => {
    res.json({
        code: '1002',
        msg: '创建失败~~',
        data: null
    });
    return;
  })
    
});

// 删除记录
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
  // 获取params id参数
  let id = req.params.id;
  //删除
  // db.get('accounts').remove({id:id}).write();
  AccountModel.deleteOne({_id: id})
  .then((data) => {
    res.json({
        code: '0000',
        msg: '删除成功！！',
        data: {}
    });
  })
  .catch((err) => {
    res.json({
        code: '1003',
        msg: '删除失败！！',
        data: null
    })
    return;
  });

});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
    let {id} = req.params;

    AccountModel.findById(id)
    .then(
        (data) => {
            res.json({
                code: '0000',
                msg: '查找成功！！',
                data: data
            })
        }
    )
    .catch(
        (err) => {
            res.json({
                code: '1004',
                msg: '查找失败',
                data: null
            });
            return;
        }
    )
});

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
    // 获取id
    let {id} = req.params;
    // 更新数据库
    AccountModel.updateOne({_id: id}, req.body)
    .then((data) => {
        // 再次查询数据库
        AccountModel.findById(id)
        .then((data) => {
            res.json({
                code: '0000',
                msg: '修改成功！！',
                data: data
            })
        })
        .catch((err) => {
            return res.json({
                code: '1005',
                msg: '修改失败',
                data: null
            })
        })    
    })
    .catch((err) => {
        res.json({
            code: '1005',
            msg: '修改失败',
            data: null
        });
        return;
    })
})
  


module.exports = router;