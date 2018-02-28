
$(document).ready(function () {
	
	$('header ul li').click(function () {
		$(this).addClass('active').siblings().removeClass('active');

		// 向后端发请求
	})
})

