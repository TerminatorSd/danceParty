

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
	

	window.location.href = 'activity.html';
}