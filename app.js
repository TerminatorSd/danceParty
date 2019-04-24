
"use strict"

var express             = require('express');
var multer = require("multer");
// var md5 = require('md5');
var app                 = express();
var bodyParse           = require('body-parser');
var cookieParser        = require('cookie-parser');
var square = require('./backend/square');
var school = require('./backend/school');
var user = require('./backend/user');
var activity = require('./backend/activity');

// wechat
var path = require('path');
// var request = require('./request.js');
// var ejs = require('ejs'); // 后台模板库
var wechat = require('wechat'); //第三方处理微信推送的库
var https = require('https'); // node 端 请求别的服务的模块
// var sign = require('./sign'); //微信提供的签名工具

// mock json
var jsonData = require('./data.json')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
      // var fileFormat =(file.originalname).split(".");
      // cb(null, file.fieldname + '-' + md5(file) + "." + fileFormat[fileFormat.length - 1]);
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storage });
var imgBaseUrl = '../'
// var imgBaseUrl = '/Users/shaodong/myGit/danceParty/';

app.use(cookieParser());
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());
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

// 访问微信接口相关配置
//处理URL 验证的 微信服务器要通过get请求来测试的
app.get('/weixin', wechat('wechat', function(req, res, next) {
  console.log('true');
}));

//处理后台获取签名的请求
app.post('/getSignature', function(req, res) {
  var token = 'wechat',
      appsecret = '4c8fa051b8aab048d9ff5da037fc5229', //你申请的
      APPID = 'wx2186ed05bd0e775d', //你申请的id
      url = 'http://www.shaodongweb.top'; //JS接口安全域名 参与签名用的
  var Res = res;
  //发送https get请求 获取 access_token;l
  https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + appsecret, function(res) {
      var datas = [];
      var size = 0;
      res.on('data', function(data) {
          datas.push(data);
          size += data.length;
      });
      res.on("end", function() {
          var buff = Buffer.concat(datas, size);
          var result = buff.toString();
          //console.log(JSON.parse(result).access_token);
          // 获取 jsapi_ticket //异步嵌套是不合理的 不推荐这样 使用promise
          https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + JSON.parse(result).access_token + '&type=jsapi', function(res) {
              var datas = [];
              var size = 0;
              res.on('data', function(data) {
                  datas.push(data);
                  size += data.length;
              });
              res.on('end', function() {
                  var buff = Buffer.concat(datas, size);
                  var rlt = buff.toString();
                  var config = sign(JSON.parse(rlt).ticket, url);
                  console.log(config);
                  Res.json(config);
              });

          }).on('error', function(e) {
              console.log("Got error: " + e.message);
          })


      });

  }).on('error', function(e) {
      console.log("Got error: " + e.message);
  });

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
app.post('/all/test', function(req, res) {
  console.log(req.body);
});

// //用户模块1：获取用户信息
// app.get('/user/info', function (req, res) {
//   var result = {};
//   result.data = jsonData.user;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// })

// //用户模块2：审核用户信息
// app.post('/update/user/info', function (req, res) {
//   var result = {};
//   result.data = jsonData.user[1];
//   result.code = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// })

// //活动模块1：审核发布的活动
// app.post('/publish/activity', function (req, res) {
//   var result = {};
//   result.data = jsonData.activity;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// })

// //活动模块2：参与活动
// app.post('/join/activity', function (req, res) {
//   var result = {};
//   result.data = jsonData.activity;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// })

// //活动模块3：获取活动列表
// app.get('/activity/list', function (req, res) {
//   var result = {};
//   result.data = jsonData.activity;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// });

// //活动模块4：获取活动详情
// app.get('/activity/detail', function(req,res) {
//   var result = {};
//   result.data = jsonData.activityDetails;
//   result.errcode = 0;
//   result.errmsg = '';
//   res.end(JSON.stringify(result));
// });

// 测试接口，获取所有学校信息
app.get('/all/school', school.getAll);

//获取用户信息接口
app.get('/user/info', user.getInfo);

//获取用户信息接口
app.post('/upload/img', upload.array('img', 40), user.uploadImg);

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
var server=app.listen(3000, '0.0.0.0', function () {
	console.log('listening at =====> http://0.0.0.0:3000......');
}) ;
