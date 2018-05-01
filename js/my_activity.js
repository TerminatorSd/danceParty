'use strict';

var userId = getStorage("userId");
// 0 全部活动 1 我发布的 2 我参加的
var activityType = 0;

$(document).ready(function () {

	if(!userId) {
    alert('please 先注册');
    location.href = 'register.html';
  } else {
		getActivityList(activityType);
  }

	//点击三种活动类型
	$('header ul li').click(function (e) {
		$(this).addClass('active').siblings().removeClass('active');

		// 重新获取活动列表
		activityType = $("header ul li").index(this);
		getActivityList(activityType);
	})
})

function getActivityList(activityType){
	// 通过用户id获取活动列表
	$.ajax({
	    url: domain + '/activity/list',
	    type: 'get',
	    dataType: 'json',
	    data: {
	    	user_id: userId,
	    	activity_type: activityType
	    },
	    success: function(data) {
	    	if (data.code == 0) {
	    		var myStr='';
		    	$.each(data.data, function(i, activity){
	      		myStr += '<a class="item" href="my_activity_detail.html?activity_id=' + activity.id + '" >' 
	      		      + '<img src="../img/exam/right-arrow.png" alt="" />' 
	      		      + '<span>' + activity.name + '</span>' + '</a>';
	        })
	        $('.exam-list').html(myStr);
	    	}
        else
            alert("获取活动列表失败");
	    },
	    error: function(err) {
	        console.log(err);
	    }
	});
}