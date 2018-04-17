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
			var data = JSON.parse(resource);
	        if(data.code == 0){	
	        	var user = data.data[0];
	        	//昵称赋值
	        	$('input[name="name"]').val(user.name);

	        	//身份赋值
	        	if(user.type=='学生') {
	        		$('.student').addClass('chosen-identity').next().attr('src', '../img/register/radio-active.png');
	        		$('.worker').removeClass('chosen-identity').next().attr('src', '../img/register/radio-grey.png');
	        	}
	        	else {
	        		$('.worker').addClass('chosen-identity').next().attr('src', '../img/register/radio-active.png');
					$('.student').removeClass('chosen-identity').next().attr('src', '../img/register/radio-grey.png');
	        	}

	        	//学校赋值
	        	$('.school .right').addClass('margin-right-4').text(user.school);
	        	
	        	//性别赋值
	        	if(user.gender=='男生') {
	        		$('.boy').addClass('chosen-gender').next().attr('src', '../img/register/radio-active.png');
	        		$('.girl').removeClass('chosen-gender').next().attr('src', '../img/register/radio-grey.png');
	        	}
	        	else {
	        		$('.girl').addClass('chosen-gender').next().attr('src', '../img/register/radio-active.png');
	        		$('.boy').removeClass('chosen-gender').next().attr('src', '../img/register/radio-grey.png');
	        	}

	        	//手机号赋值
	        	$('input[name="phone"]').val(user.phone);

	        	//标签赋值
	        	var label_str = new Array(5);
	        	label_str[0] = new RegExp("地板舞");
	        	label_str[1] = new RegExp("破瓶");
	        	label_str[2] = new RegExp("黑怕");
	        	label_str[3] = new RegExp("锁舞");
	        	label_str[4] = new RegExp("鹅笨");
	        	$.each($('.label'),function(i,j){
	        		if(label_str[i].test(user.label)) {
	        			$(j).addClass('active')
	        		}
	        	})

	        	//图片赋值
	        	$('photo').attr('src',user.img_url);
	        }
	        else{
	        	console.log(data.errMsg);
	        }	          
	    },
	    error: function(err) {
	      console.log(err);
	    }
	    
	})


	// 下拉菜单选择
	$('.hide-select').each(function (e) {
		$(this).change(function () {
			$(this).parent().find('.right').text($(this).find("option:selected").text()).addClass('margin-right-4');
			$(this).parent().find('img').hide();
		})
	})

	// 身份选择
	$('.radio-identity').each(function (e) {
		$(this).click(function () {
			$(this).find('img').attr('src', '../img/register/radio-active.png').siblings().addClass('chosen-identity');
			$(this).siblings().find('img').attr('src', '../img/register/radio-grey.png').siblings().removeClass('chosen-identity');
		})
	})

	// 性别选择
	$('.radio-gender').each(function (e) {
		$(this).click(function () {
			$(this).find('img').attr('src', '../img/register/radio-active.png').siblings().addClass('chosen-gender');
			$(this).siblings().find('img').attr('src', '../img/register/radio-grey.png').siblings().removeClass('chosen-gender');
		})
	})

	// label选择
	$('.label').each(function (e) {
		$(this).click(function () {
			$(this).toggleClass('active');
		})
	})
})

function upLoad() {
	var file = $('.photo').find('input')[0].files[0];
	//console.log(file);

	var reader = new FileReader();
	reader.onload = function(e){
		var imgFile = e.target.result;
		console.log(imgFile);
		$('.photo-img').attr('src',imgFile);
		$('.photo-img').attr('style','display:block');
	}
	reader.readAsDataURL(file);
}

function nextStep() {

	var name = $('input[name = name]').val();
	var identity = $('.chosen-identity').text();
	var school = $('select[name = school] .right').text();
	var gender = $('.chosen-gender').text();
	var phone = $('input[name = phone]').val();
	var label = '';
	$.each($('.active'), function () {
		if (label) {
			label += ',' + $(this).text();
		}
		else {
			label += $(this).text();
		}
	});

	//头像图片
	var img_url = $('.photo-img').attr('src');

	//社会工作者无须选择学校，是学生但未选择学校要重新输入
	if(!name || !gender || !phone || !label || (identity =="学生" && school=="选择你的大学")){
		alert("未全部填写完成!");
	}
	else{
		$.ajax({
		    url: domain + '/update/user/info',
		    type: 'post',
		    dataType: 'json',
		    data: {
				name:name,
				school: school,
				label: label,
				gender: gender,
				phone: phone,
				img_url: img_url	    	
		    },
		    success: function(data) {
		        if(data.code == 0){
		        	//console.log(data.data.id);
		        	alert("修改成功！");
		        	setStorage('user_id',data.data.id);
					window.location.href = 'mine.html';
		        }
        		else {
		          alert("修改失败！");
		        }
		    },
		    error: function(err) { 
		      console.log(err);
		    }
		});
	}
}