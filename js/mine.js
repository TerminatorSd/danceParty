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
		success: function(data) {
			//用户已注册
			console.log(data);
			console.log(data.data);
	        if(data.code == 0){	
	        	var user = data.data;
	        	$('header').empty();
	        	var addHeader = "<img clss='pass' alt='' src='" + user.img_url + " />" +
	        	"<p>" + user.name + "</p>";
	        	$('header').append(addHeader);
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