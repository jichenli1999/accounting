/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */




module.exports = function (success, error) {
    if(typeof error !== 'function'){
        error = () => {
            console.log('连接失败！！');
        }
    }
    // 安装mongoose
    // 导入mongoose
    const mongoose = require('mongoose');

    // 导入配置文件
    const {DBHOST, DBPORT, DBNAME} = require('../config/config.js');

    // 设置strictQuery 为 true
    mongoose.set('strictQuery', true);

    // 连接mongodb服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);  // 数据库名称

    // 设置回调 once只执行一次
    mongoose.connection.once('open', () => {
        success();
    });


    // 设置连接失败的回调
    mongoose.connection.on('error', () => {
        error();
    }); 

    // 设置连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    }); 
}

