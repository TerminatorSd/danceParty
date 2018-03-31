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

	setStorage('id', '1');

	alert(getStorage('id'));
	
	// 发送注册请求，成功后跳转
	// alert('sth');
	
	window.location.href = 'activity.html';
}