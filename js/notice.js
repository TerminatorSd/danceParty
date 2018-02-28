
$(document).ready(function () {
	
	$(".item").each(function (e) {
		$(this).click(function () {
			$(this).addClass('des').siblings().removeClass('des').find('p').hide();
			$(this).find('p').show();
		})
	})	
})

