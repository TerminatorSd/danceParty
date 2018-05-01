var mysql = require('../mysql')
var imgBaseUrl = '../';
// var imgBaseUrl = '/Users/shaodong/myGit/danceParty/';


// 获取用户信息
exports.getInfo = function (req,res) {

	var id = req.query.user_id;
	var query = 'select * from user where id = ' + id;

  console.log(query);

  mysql.query(query, {}, (err, data) => {
    var result = {};

		if(err) {
			result.code = 1;
			result.errMsg = err;
		}
		else {
      console.log(data[0]);
      data[0].img_url = imgBaseUrl + data[0].img_url;
			result.data = data[0];
			result.code = 0;
			result.errMsg = '';
		}
		// console.log(result.code);
		res.end(JSON.stringify(result));
  })
}

exports.uploadImg = function (req, res) {

  // 读取上传的图片信息
  var files = req.files;

  // 设置返回结果
  var result = {};
  if(!files[0]) {
    result.code = 1;
    result.errMsg = '上传失败';
  } else {
    result.code = 0;
    result.data = {
      url: files[0].path
    }
    result.errMsg = '上传成功';
  }
  res.end(JSON.stringify(result));
}

// 更新用户信息
exports.updateInfo = function(req, res){
	//var name   = req.body.name,
	//    school = req.body.school,
	//    label  = req.body.label,
	//    gender = req.body.gender,
	//    phone  = req.body.phone;
	var id = 11;
	var query2 = "select 1 from user where id = " + id + " limit 1";
	console.log(query2);
	mysql.query(query2, {}, (err, data) =>{
		//var temp = new String(result[0].1);
		// console.log(data[0]. [1]);
        var result = {};
        if(err) {
			result.errMsg = err;
		}
		if(!data){
			result.code = 123;
			result.errMsg = '不存在此id的数据，更新失败';
		}
		else{
			var name   = 1,
	        school = 1,
	        label  = 1,
	        gender = 1,
	        phone  = 1;
      var query1 = "update user set name = " + name +",school = " + 
      school +",label = "+ label +", gender = " + gender +", phone = " 
      + phone + " where id = " + id;
      console.log(query1);
      mysql.query(query1, {}, (err,data) =>{
       var result = {};
  
    	if(err) {
    		result.errMsg = err;
    	}
    	else {
    		result.code = 0;
    		result.errMsg = ' ';
    	}
  
    	res.end(JSON.stringify(result));       
      })
		}
	})
}

// 注册
exports.register = function(req, res){
	var postData = req.body;
	var query = "insert into user set ?";

  console.log(query);
	mysql.query(query, postData, (err, data) =>{
		var result ={};
		if(err){
      result.code = 1;
			result.errMsg = err;
		}
		else{
      result.data = {
        id: data.insertId
      }
			result.code = 0;
			result.errMsg = '注册成功';
		}
		res.end(JSON.stringify(result));
	})
}