// 导入 lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('db.json');

// 获取db对象
const db = low(adapter);


// // Set some defaults
// db.defaults({ posts: [], user: {} }).write();

//获取单条数据
// let res = db.get('posts').find({id:1}).value();
// console.log(res);  

// // Add a post
// db.get('posts').push({ id: 1, title: 'lowdb is awesome'}).write();
  
// // 获取数据
// console.log(db.get('posts').value());

// 删除数据
// let res = db.get('posts').remove({id:2}).write();
// console.log(res);

// 更新数据
db.get('posts').find({id:1}).assign({title: '今天下雨啦！！！！'}).write();


