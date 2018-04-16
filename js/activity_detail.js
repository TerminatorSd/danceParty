'use strict'

$(document).ready(function(){
	$.ajax({
    url: domain + '/activity/detail',
    type: 'get',
    dataType: 'json',
    data: {},
    success: function(data) {
    	console.log(data);
      if(data.errcode == 0){
    		var urlId = location.search;
    		var tartgetId = urlId.split("=");
				$.each(data.data,function(i,activity){	//多个活动
					if(activity.id == tartgetId[1]){
						$('.time').text(activity.time);
						$('.place').text(activity.place);
						$('.time_len').text(activity.time_len);
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
	switch(status){
		case 0:
		return "报名中";
		case 1:
		return "已结束";
		default:break;
	}
}

function signUp(){
	var urlId = location.search;
	var tartgetId = urlId.split("=");
	$.ajax({
		url: domain + '/join/activity',
		type:'post',
		dataType:'json',
		data:{
			user_id: getStorage(user_id),
    		activity_id: tartgetId[1]
		},
		success: function(data) {
	        if(data.errcode == 0){
	         	alert("报名成功！");
	        }
	        else
	          alert("报名失败！");
	    },
	    error: function(err) {
	      console.log(err);
	    }
	})
}