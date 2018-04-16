'use strict';

$(document).ready(function () {
	var user_id = getStorage('user_id');
	//console.log(user_id);
	$.ajax({
    	url: domain + '/user/info',
		type: 'get',
		data : {
			id: user_id
		},
		datatype : 'json',
		success: function(resource) {
			//用户已注册
			var data = JSON.parse(resource);
	        if(data.code == 0){	
	        	var user = data.data[0];
	        	$('header a').attr('href','my_info.html');
	        	$('header a img').attr('src', '');
	        	$('.pass').attr('src',user.img_url);
	        	$('header p').text(user.name);
	        }
	        //未注册
	        else{
	        	$('.list').empty();

	        }	          
	    },
	    error: function(err) {
	      console.log(err);
	    }
	    
	})
})