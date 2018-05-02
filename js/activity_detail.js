'use strict'

var userId = getStorage('userId');
var activityId = location.search.split("=")[1];

$(document).ready(function(){
	getActivityDetail();
})

function getActivityDetail () {
  $.ajax({
    url: domain + '/activity/detail',
    type: 'get',
    dataType: 'json',
    data: {
      activity_id : activityId,
      user_id: userId
    },
    success: function(data) {
      if(data.code == 0) {
        $.each(data.data, function(i,activity) {  //多个活动 activity_detail 中怎么可能会有多个活动呢？
          var time = new Date(activity.time).toLocaleString();
          if(activity.id == activityId){
            $('.name').text(activity.name);
            $('.time').text(time);
            $('.place').text(activity.place);
            $('.time_len').text(activity.time_len);
            $('.status').text(getTextByStatus(activity.status));
            $('.label').text(activity.label);
            $('.pub_dancer').text(activity.pub_dancer);
            $('.join_num').text(activity.join_num);
            $('.join_dancer').text(activity.join_dancer == null ? 'nobody' : activity.join_dancer);
            $('.note').text(activity.note == null ? 'no note' : activity.note);

            // 判断是否是自己发布的活动
            $.ajax({
                url: domain + '/user/info',
                type: 'get',
                dataType: 'json',
                data: {
                  user_id: userId
                },
                success: function(data) {
                  if(data.code == 0){
                    if (data.data.name == activity.pub_dancer) {
                      $('.signup-btn').addClass('bg-invalid-exam');
                      $('.signup-btn').text('我发布的');
                      document.getElementsByClassName('signup-btn')[0].onclick = function (event) {
                        return false;
                      };
                    } else if (activity.join_status != null) {
                      // 判断是否已经报名过活动
                      // 已经报名，显示取消报名按钮
                      if (activity.join_status == 1) {
                        $('.signup-btn').addClass('bg-red');
                        $('.signup-btn').text('取消报名');
                        document.getElementsByClassName('signup-btn')[0].onclick = function (event) {
                          cancelSignUp();
                        };
                      } else {
                        // 报名过后又取消了报名
                        $('.signup-btn').addClass('bg-invalid-exam');
                        $('.signup-btn').text('不可再报名');
                        document.getElementsByClassName('signup-btn')[0].onclick = function (event) {
                          return false;
                        };
                      }
                    }
                  }
                  else
                      alert("获取个人信息失败！");
                },
                error: function(err) {
                    console.log(err);
                }
            });
          }
        }) 
      }
      else {
        alert("获取活动信息失败！");
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function getTextByStatus(status) {
	if(status == "0"){
	  return "报名中";
	}
	else if (status == "1"){
	  return "已结束"
	}
	else{
	  return "未知";
	}
}

function signUp(){
	$.ajax({
		url: domain + '/join/activity',
		type:'post',
		dataType:'json',
		data:{
			user_id: userId,
    	activity_id: activityId
		},
		success: function(data) {
        if(data.code == 0){
         	alert("报名成功！");
          getActivityDetail();
        }
        else
          alert("报名失败！");
	    },
	    error: function(err) {
	      console.log(err);
	    }
	})
}

function cancelSignUp () {
  $.ajax({
    url: domain + '/cancel/activity',
    type:'post',
    dataType:'json',
    data:{
      user_id: userId,
      activity_id: activityId
    },
    success: function(data) {
        if(data.code == 0){
          alert("取消报名成功！");
          getActivityDetail();
        }
        else
          alert("取消报名失败！");
      },
      error: function(err) {
        console.log(err);
      }
  })
}