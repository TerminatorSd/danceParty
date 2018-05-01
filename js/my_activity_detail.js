'use strict';

var userId = getStorage("userId");
var activityId = location.search.split("=")[1];

$(document).ready(function(){
	$.ajax({
    url: domain + '/activity/detail',
    type: 'get',
    dataType: 'json',
    data: {
    	user_id : userId,
      activity_id: activityId
    },
    success: function(data) {
    	console.log(data);
      if(data.code == 0){
			$.each(data.data,function(i,activity){	//多个活动
				var time = new Date(activity.time).toLocaleString();
				if(activity.id == activityId){
					$('.name').text(activity.name);
					$('.time').text(time);
					$('.time_len').text(activity.time_len);
					$('.place').text(activity.place);
					$('.status').text(getTextByStatus(activity.status));
					$('.label').text(activity.label);
					$('.pub_dancer').text(activity.pub_dancer);
					$('.join_num').text(activity.join_num);
					$('.join_dancer').text(activity.join_dancer);
					$('.note').text(activity.note);
				}
	    	}) 
     	}
      else {
        alert("操作失败！");
      }
    },
    error: function(err) {
      console.log(err);
    }
	});
})

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
