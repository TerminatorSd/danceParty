
"use strict"

var domain = "http://39.108.163.91:3000";
// var domain = "http://127.0.0.1:3000";

//设置cookie
function setCookie(name,value,days)
{
    var exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//查找cookie
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//查找localStorage
function getStorage (name) {
  return JSON.parse(localStorage.getItem(name));
}

//设置localStorage
function setStorage (name, val) {
  localStorage.setItem(name, JSON.stringify(val));
}

