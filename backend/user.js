var mysql = require('../mysql')

// 获取用户信息
exports.getInfo = function (req,res) {

	var id = req.body.id;
	// var id = 1;

	var query = 'select * from user where id = ' + id;

  	mysql.query(query, {}, (err, data) => {
    	var result = {};

		if(err) {
			result.code = 1;
			result.errMsg = err;
		}
		else {
			result.data = data;
			result.code = 0;
			result.errMsg = '';
		}

		res.end(JSON.stringify(result));
  })
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
	var post = {
		 name : "鸡威666",
		 school : "华工",
		 label : "地板舞",
		 gender : "男",
		 phone : 15626434077
	};
	var query = "insert into user set ?";
	mysql.query(query, post, (err, data) =>{
		var result ={};
		if(err){
			result.errMsg = err;
		}
		else{
			result.code = 222;
			result.errMsg = '注册成功';
		}
		res.end(JSON.stringify(result));
	})
}