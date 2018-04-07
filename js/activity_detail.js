$(document).ready(function(){
	var urlId = location.search;
	var targetId = urlId.split("=")[1];
	$.ajax({
    url: domain + '/activity/detail',
    type: 'get',
    dataType: 'json',
    data: {
    	id : targetId
    },
    success: function(data) {
    	console.log(data);
      if(data.code == 0){
				$.each(data.data,function(i,activity){	//多个活动
					var time = new Date(activity.time).toLocaleString();
					if(activity.id == targetId){
						$('.time').text(time);
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
	var urlId = location.search;
	var activityId = urlId.split("=")[1];
	$.ajax({
		url: domain + '/join/activity',
		type:'post',
		dataType:'json',
		data:{
			user_id: getStorage('user_id'),
    		activity_id: activityId
		},
		success: function(data) {
	        if(data.code == 0){
	         	alert("报名成功！");
				window.location.href = 'activity.html';
	        }
	        else
	          alert("报名失败！");
	    },
	    error: function(err) {
	      console.log(err);
	    }
	})
}