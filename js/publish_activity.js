

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
	// body...
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
	if(!name || !time || !place || !time_len || !label){
		alert("未全部填写完成");
	}
	else{
		console.log(label);		
		window.location.href = 'activity.html';
	}
}