'use strict';

var userId = getStorage('userId');

$(document).ready(function () {

	// 判断是否已经注册
	if (userId) {
		$('.unregister').hide();
		$('header a').attr('href', 'my_info.html');
		$.ajax({
    	url: domain + '/user/info',
			type: 'get',
			data : {
				user_id: userId
			},
			datatype : 'json',
			success: function(data) {
				data = JSON.parse(data);
				//用户已注册
				$('.pass').attr('src', data.data.img_url);
				$('.name').text(data.data.name);
				$('.role').text(data.data.type);
				$('.school').text(data.data.school);
		   }
		});
	} else {
		$('header a').attr('href', 'register.html');
		// 显示注册按钮
		$('.name').hide();
		$('.role').hide();
		$('.school').hide();
	}
})