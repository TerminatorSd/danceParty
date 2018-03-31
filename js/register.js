'use strict';

$(document).ready(function () {

	// getList();

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

function getList () {
	$.ajax({
	    url: domain + '/all/schol',
	    type: 'get',
	    dataType: 'json',
	    data: {},
	    success: function(data) {
	        if(data.errcode == 0){
	          alert(JSON.stringify(data.data));
	        }
	        else
	          alert("操作失败！");
	    },
	    error: function(err) {
	      console.log(err);
	    }
	});
}

// 点击下一步
function nextStep () {

	//setStorage('id', '1');

	//alert(getStorage('id'));
	
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
	//var img

	//社会工作者无须选择学校，是学生但未选择学校要重新输入
	if(!name || !gender || !phone || !label || (identity =="学生" && school=="选择你的大学")){
		alert("未全部填写完成!");
	}
	else{
		if(identity=="社会工作者"){
			alert(name+','+identity+','+gender+','+phone+','+label);
		}else{
			alert(name+','+identity+','+school+','+gender+','+phone+','+label);
		}
		// 发送注册请求，成功后跳转
		// alert('sth');
		window.location.href = 'activity.html';
	}
}