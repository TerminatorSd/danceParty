var mysql = require('../mysql')
var moment = require('moment')

// 发布活动
exports.publish = function (req, res) {

	//var name = req.body.name,
    //    time = req.body.time,
    //    place = req.body.place,
    //    time_len = req.body.time_len,
    //    phone = req.body.phone,
    //    label = req.body.label,
    //    note = req.body.note;
    //time1= moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    create_time1= moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    var post1 = {
    	 name : 1,
         time : "2018-03-18 16:18:11",
         place : 1,
         time_len : 1,
         join_num : 1,
         label : 1,
         status : 1,
         join_dancer : 1, 
         pub_dancer : 1,
         create_time : create_time1
    };

    var post2 = {
    	 user_id : 1,
    	 activity_id : 1,
    	 pub_status : 1,
    	 join_status : 1
    };

 //    var id = 11,
 //        name = 1,
 //        time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
 //        place =1, 
 //        time_len = 1,
 //        join_num = 1,
 //        phone = 1,
 //        label = 1,
 //        status = 1,
 //        join_dancer = 1,
 //        pub_dancer = 1,
 //        create_time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
 //        note = 1;

 //    // time = "2018-03-18 16:18:11";
 //    // create_time = "2018-03-18 16:18:11";

	// var query = "insert into activity (id, name, label, time, time_len, join_num, pub_dancer, status, join_dancer, place, create_time) values (" +
	// id + ","+name + ","+label + ","+ time + ","+time_len + ","+join_num + ","+pub_dancer + ","+status + ","+join_dancer + ","+place + ","+create_time+")";
    var query1 = "insert into activity set ?";
    var query2 = "insert into user_activity set ?";
    var result;
	mysql.query(query1, post1, (err, data) => {
		var result1 = {};

		if(err) {
			result1.errMsg = err;
		}
		else {
			result1.code = 123;
			result1.errMsg = '插入1成功';
		}
		result = result1;
	})
	mysql.query(query2, post2, (err,data) =>{
		var result2 = {};
		if(err){
			result2.errMsg = err;
		}
		else{
			result2.code = 321;
			result2.errMsg = ',插入2成功';         
		}
		result.errMsg += result2.errMsg;
		result.code += result2.code;
		res.end(JSON.stringify(result));
	})
}

// 查看活动详情
exports.detail = function(req, res){
	var activity_id = 2;
	var query = "select * from activity where id = "+activity_id;

	mysql.query(query, {}, (err, data) => {
		var result = {};

		if(err) {
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

exports.join = function(req, res){
	var user_id = 2,
	    activity_id = 1;
    var name;
	var query1 = "select name from user where id = " + user_id;
	var result = {};

	mysql.query(query1, {}, (err, data) =>{
		var result1 = {};
		console.log(data[0].name);
		if(err) {
			result1.errMsg = err;
		}
		if(data[0]!=null) {
			name = data[0].name;
			result1.code = 123;
			result1.errMsg = '查找user表成功';

			result = result1;
		    var query2 = "update activity set join_num=join_num+1 where id = "
		    +activity_id+"; update activity set join_dancer=CONCAT(join_dancer, ',"
		    +name+"') where id = "+activity_id+";";
		    console.log(query2);
		    mysql.query(query2, {}, (err, data) =>{
		    	var result2 = {};
		    	if(err){
		    		result2.errMsg = err;
		    		console.log("testing1");
		    	}
		    	else{
		    		result2.code = 555;
		    		result2.errMsg = '更新两个表成功';
		    		console.log("testing2");
		    	}
		    	result.errMsg += result2.errMsg;
		        result.code += result2.code;
		        res.end(JSON.stringify(result));
		    })
		}
		else{
			result.code = 233;
            result.errMsg = '查找user表失败';
            res.end(JSON.stringify(result));
		}
		

	})
}

// 获取活动列表
exports.list = function(req, res){
	var query = "select * from activity";
	console.log(query);
	mysql.query(query, {}, (err, data) => {
		var result = {};

		if(err) {
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

exports.cancel = function(req, res){
	var activity_id = 2;
	var query = "";
	console.log(query);
	mysql.query(query, {}, (err, data) => {
		var result = {};

		if(err) {
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
//console.log("testing");