// 在各个浏览器打开app方法
var startApp="fx168://m.fx168.com/main?type=sy";//q启动app
var newsInner="fx168://m.fx168.com/newsDetail?id="+sessionStorage.news_id;//新闻内页
var satrt_sudi="fx168://m.fx168.com/main?type=express";//速递
var queote="fx168://m.fx168.com/main?type=quotation&key="+sessionStorage.hq_inner_key+"&keyWords="+sessionStorage.hq_inner_title+"&date="+sessionStorage.hq_inner_date+"&tradePrice="+sessionStorage.hq_inner_tradePrice
+"&range="+sessionStorage.hq_inner_range+"&rangePercent="+sessionStorage.hq_inner_rangePercent+"&openPrice="+sessionStorage.hq_inner_openPrice+"&highPrice="+sessionStorage.hq_inner_highPrice+"&preClosePrice="+sessionStorage.hq_inner_preClosePrice+"&lowPrice="+sessionStorage.hq_inner_lowPrice+"&decimalDigits="+sessionStorage.decimalDigits

import "jquery";

$("#downApp").click(function(){
  openApp(queote);
});

//行情内页
var zhuanTiInner="fx168://m.fx168.com/special?zhuanTiId="+sessionStorage.zhuanTiId;//专题内页
function openApp(el){
    var ua = window.navigator.userAgent.toLowerCase();
    //微信
    // alert(el)
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168';
    }else{//非微信浏览器
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            var loadDateTime = new Date();
            window.setTimeout(function() {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.location = "https://itunes.apple.com/cn/app/id535352246";//ios下载地址
                } else {
                window.close();
                }
            },2000);
            window.location = el;
          }else if (navigator.userAgent.match(/android/i)) {
            var state = null;
            try {

                //'window.location = "fx168://m.fx168.com/newsDetail?id=2329383";
                window.location = el;
                setTimeout(function(){
                    window.location= "http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168"; //android下载地址

                },2000);
            } catch(e) {}
        }
    }
}
