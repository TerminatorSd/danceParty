
'use strict';

$(document).ready(function () {
	
	// label选择
	$('.label').each(function (e) {
		$(this).click(function () {
			$(this).toggleClass('active');
		})
	})

	// 下拉菜单选择
	$('.hide-select').each(function (e) {
		$(this).change(function () {
			$(this).parent().find('.right').text($(this).find("option:selected").text()).addClass('margin-right-4');
			$(this).parent().find('img').hide();
		})
	})
})

function publishActivity (argument) {

	//发布者id
	var userId = getStorage('userId');

	// 活动内容
	var name = $('input[name=name]').val();
	var time = $('input[name=time]').val();
	var place = $('input[name=place]').val();
	var time_len = $('select[name=time_len]').val();
	var label = '';
	$.each($('.active'), function () {
		if (label) {
			label += ',' + $(this).text();
		}
		else {
			label += $(this).text();
		}
	});
	var note = $('input[name=note]').val();

	// 空值检测
	if(!name || !time || !place || !time_len || !label){
		alert("未全部填写完成");
	} else{
		$.ajax({
			url: domain + '/publish/activity',
			type: 'post',
			data:{
				user_id: userId,
				name: name,
				time: time,
				place: place,
				time_len: time_len,
				label: label,
				note: note
			},
			dataType: 'json',
			success:function(data){
				if(data.code == 0){
					alert('发布成功!');
					window.location.href = 'activity.html';
				}
				else{
					alert('发布失败');
				}
			},
			error: function(err) {
	    	console.log(err);
	    }
		})
	}
}