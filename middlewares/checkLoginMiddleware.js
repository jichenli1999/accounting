// 检测登陆的中间件
module.exports = (req, res, next) => {
    // 判断
    if(!req.session.username){
      res.redirect('/login');
    }
    next();
  }