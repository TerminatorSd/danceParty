'use strict';

var userId = getStorage('userId');

$(document).ready(function(){

  if(!userId) {
    alert('please 先注册');
    location.href = 'register.html';
  } else {
    getActivityList();
  }
})

function getActivityList () {
  $.ajax({
    url: domain + '/activity/list',
    type: 'get',
    dataType: 'json',
    data: {
      user_id: userId
    },
    success: function(data) {
      console.log(data);
      if(data.code == 0){
        //动获取数据加载页面
        $('.body').empty(); 
        if (data.data.length) {
          $('.no-activity').hide()
          $.each(data.data,function(i,activity){  //多个活动
            var time = new Date(activity.time).toLocaleString();
            // console.log(activity.status);
            var newActivityHtml = '<a id=' + activity.id ;
            if(activity.status == 0) {
              newActivityHtml += ' href="activity_detail.html?id=' + activity.id + '" class="test-item">';
            }
            else {
              newActivityHtml +=' class="test-item disabled">';
            }
            newActivityHtml += '<img src="../img/exam/right-arrow.png" alt="right" />' + 
              '<p class="title name">'+ activity.name + '</p>' + 
              '<p class="test-num margin-top-4">时间:<span class="time">'+ time + '</span></p>'+
              '<p class="test-num">地点：<span class="place"></span>'+ activity.place + '</p>'+
              '<p class="test-num">标签：<span class="label"></span>'+ activity.label + '</p>'+
              '<p class="test-num">当前状态：<span class="status ';
            
            newActivityHtml += getColorByStatus(activity.status, activity.join_status);
            newActivityHtml += ' ">' + getTextByStatus(activity.status, activity.join_status) + '</span></p>' + '</a>';
            $('.body').append(newActivityHtml);
          }) 
        } else {
          $('.no-activity').show()
        }
      }
      else {
        alert("操作失败！");
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function getTextByStatus(status, join_status) {
    if(status == "0"){
      if(join_status == null) {
        return "报名中";
      } else if(join_status == 1) {
        return "已报名";
      } else {
        return "不可再报名";
      }
    } else if (status == "1"){
      return "已结束"
    } else {
      return "未知";
    }
}

function getColorByStatus(status, join_status) {
    if(status == "0"){
      if(join_status == null) {
        return "text-blue";
      } else if(join_status == 1) {
        return "text-green";
      } else {
        return "text-orange";
      }
    } else if (status == "1"){
      return "text-red"
    } else {
      return "text-blue";
    }
}