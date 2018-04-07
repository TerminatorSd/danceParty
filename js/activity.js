$(document).ready(function(){
	$.ajax({
    url: domain + '/activity/list',
    type: 'get',
    dataType: 'json',
    data: {},
    success: function(data) {
    	console.log(data);
      if(data.code == 0){

        //动获取数据加载页面
				$('.body').empty();	
				$.each(data.data,function(i,activity){	//多个活动
          var time = new Date(activity.time).toLocaleString();
          console.log(activity.status);
	        var newActivityHtml = '<a id=' + activity.id ;
	        if(activity.status == 0) {
	        	newActivityHtml += ' href="activity_detail.html?id=' + activity.id + '" class="test-item">';
	        }
	        else {
	        	newActivityHtml +=' class="test-item disabled">';
	        }
	       	newActivityHtml += '<img src="../img/exam/right-arrow.png" alt="right" />' + 
          	'<p class="title name">'+ activity.name + '</p>' + 
          	'<p class="test-num margin-top-4">时间:<span class="time">'+ time + '</span></p>'+
          	'<p class="test-num">地点：<span class="place"></span>'+ activity.place + '</p>'+
          	'<p class="test-num">标签：<span class="label"></span>'+ activity.label + '</p>'+
          	'<p class="test-num">当前状态：<span class="status ';
          // if 和 else 尽量都用{}包围
        	if(activity.status == 0) {
        		newActivityHtml +='text-blue';
        	}
        	else {
        		newActivityHtml +='text-red';
        	}

        	newActivityHtml += ' ">' + getTextByStatus(activity.status) + '</span></p>' + '</a>';

      		$('.body').append(newActivityHtml);
		          	
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