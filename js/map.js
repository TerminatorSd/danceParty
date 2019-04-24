/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-04-24 09:12:20
 * @modify date 2019-04-24 09:12:20
 * @desc [description]
 */

var url = location.href.split('#')[0];     //获取当前地址，切记微信是要筛出#后面的地址
$.post("weixin/getJSSDKSign",
    {url:url},
    function(data){
//通过config注入接口权限
    wx.config({
        debug: false,
        appId:data.signModel.appId,
        timestamp: data.signModel.timestamp,//时间戳
        nonceStr: data.signModel.nonceStr,//随机串
        signature: data.signModel.signature,//签名
        jsApiList: [
            'checkJsApi' ,
            'getLocation',//微信定位
            'openLocation',
            'chooseImage'
        ]
    });
//接口处理失败验证
    wx.error(function(res){
        $.alert(res.errMsg)
    });
//接口处理成功
    wx.ready(function(){
        wx.checkJsApi({
            jsApiList: [
                'getLocation'
            ],
            success: function (res) {
                if (res.checkResult.getLocation == false) {
                    alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                    return;
                }
            }
        });
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                var geocoder = new qq.maps.Geocoder({
                    complete: function (result) {   //解析成功的回调函数
                        var address = result.detail.address.substring(5);  //获取详细地址信息
                        $('#nowAddress').text('')
                        $('#nowAddress').text(address)//将解析出来的地址渲染到页面
                    }
                });
                geocoder.getAddress(new qq.maps.LatLng(latitude, longitude));
                //周边设备位置展示
                $.ajax({
                    url:"nearby/getNearby",
                    data:{latitude:latitude,longitude:longitude},
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        var reslut=data.result;//通过后台返回的数据列表渲染页面，这里采用的字符串拼接的方法
                        var html = ''
                        if(reslut.length == 0){
                            $('.siteList').remove()
                            $('.noImg').show()
                            $('.notNews').text('暂无相关信息')
                        }else{
                            $('.siteList').remove()
                            for (var i = 0; i < reslut.length; i++) {
                                html += '<div class="siteList">'
                                    + '<div class="siteBoxNull">'
                                    + '</div>'
                                    + '<ul class="siteListBox-1">'
                                    + '<li>'
                                    + '<p id="name">' + reslut[i].name + '</p>'
                                    + '<i></i>'
                                    + '</li>'
                                    + '<li>'
                                    + '<span class="first-span">' + reslut[i].address + '</span>'
                                    + '<span style="color:#333333;">' + reslut[i].distance + "km" +'</span>'
                                    + '<input type="hidden" value="'+reslut[i].longitude+'" id="longitude"/>'
                                    + '<input type="hidden" value="'+reslut[i].latitude+'" id="latitude"/>'
                                    + '</li>'
                                    + '</ul>'
                                    + '</div>'
                            }
                        }
                        $('body').append(html)
                        $('.siteList').on('click',function(){//切记IOS系统解析出来的经纬度地址是一个string类型的字符串，必选转换IOS系统才能访问
                            var longitude = Number($(this).find('#longitude').val())
                            var latitude = Number($(this).find('#latitude').val())
                            var name = $(this).find('#name').text()
                            var adress = $(this).find('.first-span').text()
                            wx.openLocation({
                                latitude: longitude, // 纬度，浮点数，范围为90 ~ -90
                                longitude: latitude, // 经度，浮点数，范围为180 ~ -180。
                                name: name, // 位置名
                                address: adress, // 地址详情说明
                                scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
                                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                            });
                        })
                    }
                })
            },
            cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
            }
        });

    });
});