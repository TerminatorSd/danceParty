
"use strict"

var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser');
var cookieParser        = require('cookie-parser');
var square = require('./backend/square');
var school = require('./backend/school');
var user = require('./backend/user');
var activity = require('./backend/activity');

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

// 获取广场动态接口
app.get('/square/news', square.getNews);

// 处理/login的post请求
app.post('/login',function(req,res){
    name=req.body.name ;
    pwd=req.body.pwd   ;
    console.log(name+'--'+pwd) ;
    res.status(200).send(name+'--'+pwd) ;
});

// 测试接口，获取所有学校信息
app.get('/all/school', school.getAll);

//获取用户信息接口
app.get('/user/info', user.getInfo);

//更新用户将信息接口
app.post('/update/user/info',user.updateInfo);

//发布活动模块
app.post('/publish/activity',activity.publish);

//获得活动消息模块
app.get('/activity/detail',activity.detail);

//参加活动模块
app.post('/join/activity', activity.join);

//获取活动列表接口
app.get('/activity/list', activity.list);

//取消活动模块
app.post('/cancel/activity', activity.cancel);

//用户注册模块
app.post('/user/register', user.register);

// 监听3000端口
var server=app.listen(3000, function () {
	console.log('listening at =====> http://127.0.0.1:3000...');
}) ;
