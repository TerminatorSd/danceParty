
$(document).ready(function () {
	
	$('header ul li').click(function () {
		$(this).addClass('active').siblings().removeClass('active');

		// 向后端发请求
		
		$.ajax({
		    url: domain + 'url',
		    type: 'get',
		    dataType: 'json',
		    data: {
		    	data
		    },
		    success: function(data) {
		        if(data.errcode == 0){
		            // success code
		        }
		        else
		            alert("get userlists failed!");
		    },
		    error: function(err) {
		        console.log(err);
		    }
		});
	})
})

