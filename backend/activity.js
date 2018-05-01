var mysql = require('../mysql')
var moment = require('moment')

// 发布活动
exports.publish = function (req, res) {

  // 更新活动表
  var postData = req.body;
  var id = postData.user_id;
  var queryName = 'select * from user where id = ' + id;
  var nowTime= moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  // 操作用户表 先根据用户id 获取用户名
  mysql.query(queryName, {}, (err, data) => {
    var result = {};
    if(err) {
      result.code = 1;
      result.errMsg = err;
    }
    else {
      // 状态为0 表示已发布
      postData.status = 0;
      postData.pub_dancer = data[0].name;
      postData.join_num = 1;
      postData.join_dancer = data[0].name;
      postData.pub_dancer_id = id;
      postData.create_time = nowTime;
      delete postData['user_id'];
      var insertActivity = "insert into activity set ?";

      // 向活动表插入数据
      mysql.query(insertActivity, postData, (err, data) => {
        // console.log(postData);
        if(err) {
          result.code = 1;
          result.errMsg = err;
        } else {
          result.code = 0;
          result.errMsg = '操作成功';
        }
        // res.end 的位置要放在最里层query 操作中
        res.end(JSON.stringify(result));
      })
    }
  })
}

// 查看活动详情
exports.detail = function(req, res){
	//console.log(req);
	var activityId = req.query.activity_id;
  var userId = req.query.user_id;
	var query = "select a.*, b.join_status from activity as a left join user_activity as b on a.id = b.activity_id and b.user_id = " + userId + " where a.id = " + activityId;

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

exports.join = function(req, res){

  // 需要更新两张表，活动表和用户活动表
  var userId = req.body.user_id;
  var activityId = req.body.activity_id;

  // 先更新用户活动表
  var postDataActivity = req.body;
  postDataActivity.pub_status = 1;
  postDataActivity.join_status = 1;
  var insertUserActivity = 'insert into user_activity set ?';
  var result = {};

  // 向用户活动表插入数据
  mysql.query(insertUserActivity, postDataActivity, (err, data) => {
    if(err) {
      result.code = 1;
      result.errMsg = err;
    } else {

      // 成功后更新活动表
      var name;
      var queryName = "select name from user where id = " + userId;

      // 先获取用户名
      mysql.query(queryName, {}, (err, data) =>{
        if(err) {
          result.code = 1;
          result.errMsg = err;
        } else {
          if(data[0] == null) {
            result.code = 1;
            result.errMsg = '查找user表失败';
          }
          else{
            name = data[0].name;
            var queryActivity = "update activity set join_num=join_num+1 where id = "
                              + activityId +"; update activity set join_dancer=CONCAT(join_dancer, ',"
                              + name+"') where id = " + activityId + ";";

            // 更新活动表参与人数和参与人姓名
            mysql.query(queryActivity, {}, (err, data) =>{
              if(err){
                result.code = 1;
                result.errMsg = err;
              }
              else{
                result.code = 0;
                result.errMsg = '操作成功';
              }
              res.end(JSON.stringify(result));
            })
          }
        }
      })
    }
  }) 
}

// 获取活动列表
exports.list = function(req, res){

  console.log('/activity/list')

  var userId = req.query.user_id;

  // 判断是获取所有活动列表还是活动记录
  // 0 个人参与的所有活动 1 个人发布的所有活动 2 个人参加的所有活动
  var type = req.query.activity_type;
  var queryActivityList = '';
  if (type === undefined) {
    queryActivityList = "select a.*, b.join_status from activity as a left join user_activity as b on a.id = b.activity_id and b.user_id = " + userId + " order by a.status, b.join_status";
  } else {
    if (type == 0) {
      queryActivityList = "select a.*, b.join_status from activity as a left join user_activity as b on a.id = b.activity_id where b.user_id = " + userId + " order by a.status, b.join_status";
    } else if (type == 1) {
      queryActivityList = "select a.*, b.join_status from activity as a left join user_activity as b on a.id = b.activity_id where a.pub_dancer_id = " + userId + " and b.user_id = " + userId + " order by a.status, b.join_status";
    } else {
      queryActivityList = "select a.*, b.join_status from activity as a left join user_activity as b on a.id = b.activity_id where a.pub_dancer_id != " + userId + " and b.user_id = " + userId + " order by a.status, b.join_status";
    }
  }

  console.log(queryActivityList);

  // 左连接查询活动表和用户活动表, 报名中的活动放在前面
	mysql.query(queryActivityList, {}, (err, data) => {
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

  // 取消报名更新活动表和用户活动表
  var userId = req.body.user_id;
  var activityId = req.body.activity_id;

  var result = {};
  var updateUserActivity = 'update user_activity set join_status = 2 where user_id = ' + userId + ' and activity_id = ' + activityId;

  // 更新用户活动表，修改join_status 字段值
	mysql.query(updateUserActivity, {}, (err, data) => {
		if(err) {
      result.code = 1;
			result.errMsg = err;
		}
		else {
			// 成功后更新活动表
      var name;
      var queryName = "select name from user where id = " + userId;

      // 先获取用户名
      mysql.query(queryName, {}, (err, data) =>{
        if(err) {
          result.code = 1;
          result.errMsg = err;
        } else {
          if(data[0] == null) {
            result.code = 1;
            result.errMsg = '查找user表失败';
          }
          else{
            name = data[0].name;
            var replaceStr = ',' + name;
            var queryActivity = "update activity set join_num = join_num - 1 where id = "+ activityId + "; "
                              + "update activity set join_dancer = replace(join_dancer, '" + replaceStr + "', '');"

            console.log(queryActivity);
            // 更新活动表参与人数和参与人姓名
            mysql.query(queryActivity, {}, (err, data) =>{
              if(err){
                result.code = 1;
                result.errMsg = err;
              }
              else{
                result.code = 0;
                result.errMsg = '操作成功';
              }
              res.end(JSON.stringify(result));
            })
          }
        }
      })
		}
   })
}
