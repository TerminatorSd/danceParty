
"use strict";

var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser');
var cookieParser        = require('cookie-parser');
var square = require('./backend/square');
var school = require('./backend/school');

var jsonData = require('./data.json')
var jkJson = require('./jiankao.json')
var jkBack = require('./jiankaoBack.json')

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

// mock 数据写法
app.get('/activity/list', function (req, res) {
  res.status(200).send(jsonData.activity);
})


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

// 审核注册用户
app.post('/user/audit/1', function (req, res) {
  var result = {};
  result.data = jkJson.audit;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 获取考试列表
app.get('/exam/getlist', function (req, res) {
  var result = {};
  result.data = jkJson.examList;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 获取报名某场考试的监考人员名单
app.get('/signup/user/list/1', function (req, res) {
  var result = {};
  result.data = jkJson.signupUserList;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 审核监考人员（添加候选）
app.post('/signup/check/user/1', function (req, res) {
  var result = {};
  result.data = jkJson.userAuditss;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 确认最终监考人员
app.post('/signup/confirm/1', function (req, res) {
  var result = {};
  result.data = jkJson.signupConfirm;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

// 获取用户列表
app.get('/user/list', function (req, res) {
  var result = {};
  result.data = jkBack.userList ;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
})

app.get('/activity/getlist', function (req, res) {
  var result = {};
  result.data = jsonData.activity;
  result.errcode = 0;
  result.errmsg = '';
  res.end(JSON.stringify(result));
});





// 监听3000端口
var server=app.listen(3000, function () {
	console.log('listening at =====> http://127.0.0.1:3000...');
}) ;
