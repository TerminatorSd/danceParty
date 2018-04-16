
$(document).ready(function () {
	var user_id = getStorage("user_id");
	//console.log(user_id);

	showList(user_id,$('.active').text());

	//点击三种活动类型
	$('header ul li').click(function () {
		$(this).addClass('active').siblings().removeClass('active');
		// console.log($('.active').text());
		showList(user_id,$('.active').text());
	})
})

function showList(user_id,str){
	var user_name='';
	//通过用户id获取用户名
	$.ajax({
		url: domain + '/user/info',
		type: 'get',
		dataType: 'json',
		data:{
			id:user_id
		},
		success:function(data){
			user_name = data.data[0].name;
			//console.log(user_name);
		},
		error:function(err){
			console.log(err);
		}
	});

	$.ajax({
	    url: domain + '/activity/list',
	    type: 'get',
	    dataType: 'json',
	    data: {},
	    success: function(data) {
	        if(data.code == 0){
	            // 数据获取成功
	            $('.exam-list').empty();
	            if(str=='全部'){
	            	$.each(data.data, function(i,activity){
	            		var addActivity='';
	            		addActivity += '<a class="item" href="my_activity_detail.html' + '?activity_id=' + 
		            		activity.id + '" >' + '<img src="../img/exam/right-arrow.png" alt="" />' + 
		            		'<span>' + activity.name + '</span>' + '</a>';
	            	
		            	$('.exam-list').append(addActivity);
		            })

	            	//为第一个活动添加item-first类，用于布局
		            $('.exam-list a:first').addClass('item-first');
	            	
	            }
	            else if (str == '我发布的'){
	            	$.each(data.data, function(i,activity){
	            		var addActivity='';
	            		//判断本用户是否是活动发布者
	            		if(activity.pub_dancer == user_name){
		            		addActivity += '<a class="item" href="my_activity_detail.html' + '?activity_id=' + 
		            		activity.id + '" >' + '<img src="../img/exam/right-arrow.png" alt="" />' + 
			            		'<span>' + activity.name + '</span>' + '</a>';
	            		}
	            	
		            	$('.exam-list').append(addActivity);
		            })

	            	//为第一个活动添加item-first类，用于布局
		            $('.exam-list a:first').addClass('item-first');
	            }
	            else {
					$.each(data.data, function(i,activity){
	            		var addActivity='';
	            		//判断本用户是否在活动参与者中
	            		if(activity.pub_dancer == user_name){
		            		addActivity += '<a class="item" href="my_activity_detail.html' + '?activity_id=' + 
		            		activity.id + '" >' + '<img src="../img/exam/right-arrow.png" alt="" />' + 
			            		'<span>' + activity.name + '</span>' + '</a>';
	            		}
	            	
		            	$('.exam-list').append(addActivity);
		            })

	            	//为第一个活动添加item-first类，用于布局
		            $('.exam-list a:first').addClass('item-first');
	            }

	        }
	        else
	            alert("get userlists failed!");
	    },
	    error: function(err) {
	        console.log(err);
	    }
	});

}