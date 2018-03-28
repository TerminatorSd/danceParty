
"use strict";

var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser');
var cookieParser        = require('cookie-parser');
var square = require('./backend/square');
var school = require('./backend/school');

var jsonData = require('./data.json')

app.use(cookieParser());
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static('public'));

// 解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

// // 获取广场动态接口
// app.get('/square/news', square.getNews);
  
// // 处理/login的post请求
// app.post('/login',function(req,res){
//     name=req.body.name ;
//     pwd=req.body.pwd   ;
//     console.log(name+'--'+pwd) ;
//     res.status(200).send(name+'--'+pwd) ;
// });

// 测试接口，获取所有学校信息
app.get('/all/school', school.getAll);



// 监考网mock数据接口
// 
// 获取注册用户列表
// app.get('/user/list', function (req, res) {
//   var result = {};
//   result.data = jkJson.userList;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// })

//用户模块1：获取用户信息
app.get('/user/info', function (req, res) {
  var result = {};
  result.data = jsonData.user;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

//用户模块2：审核用户信息
app.post('/update/user/info', function (req, res) {
  var result = {};
  result.data = jsonData.user;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

//活动模块1：审核发布的活动
app.post('/publish/activity', function (req, res) {
  var result = {};
  result.data = jsonData.activity;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

//活动模块2：参与活动
app.post('/join/activity', function (req, res) {
  var result = {};
  result.data = jsonData.activity;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

//活动模块3：获取活动列表
app.get('/activity/list', function (req, res) {
  var result = {};
  result.data = jsonData.activity;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
});


//活动模块4：获取活动详情
app.get('/activity/detail', function(req,res) {
  var result = {};
  result.data = jsonData.activityDetails;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
});

//活动模块5：取消活动
// app.post('/cancel/activity', function(req,res) {
//   var result = {},
//   result.data = jsonData.activity;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// })

//活动模快6：召集党瑟
// app.post('/call/dancer', function(req,res) {
//   var result = {},
//   result.data = jsonData.activityDetails;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// })

// 监听3000端口
var server=app.listen(3000, function () {
	console.log('listening at =====> http://127.0.0.1:3000......');
}) ;
