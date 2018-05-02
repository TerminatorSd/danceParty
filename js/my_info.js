'use strict';

var userId = getStorage('userId');

$(document).ready(function () {
	getUserInfo();
})

function getUserInfo() {
	$.ajax({
    url: domain + '/user/info',
		type: 'get',
		data : {
			user_id: userId
		},
		datatype : 'json',
		success: function(resource) {
			var data = JSON.parse(resource);
      if(data.code == 0){	

      	// 设置姓名等信息
      	$('.name').text(data.data.name);
      	$('.type').text(data.data.type);
      	$('.school').text(data.data.school);
      	$('.gender').text(data.data.gender);
      	$('.phone').text(data.data.phone);
      	$('.photo-img').attr('src', data.data.img_url);

      	// 设置label 内容
      	var labelStr = '';
      	labelStr += '<span class="left">标签：</span>';
      	$.each(data.data.label.split(','), function(index, val) {
      		if(index == 0) {
      			labelStr += '<span class="label margin-right-4">' + val + '</span>'
      		} else {
      			labelStr += '<span class="label">' + val + '</span>';
      		}
      	})
      	$('.label').html(labelStr);
      }
      else{
      	console.log(data.errMsg);
      }	          
    },
    error: function(err) {
      console.log(JSON.stringify(err));
    }
	})
}

function getBack() {
	window.location.href = 'mine.html';
}