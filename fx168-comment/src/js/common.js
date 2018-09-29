
var sckUrl1="https://app6.fx168api.com:9091";
var sckUrl2="https://app7.fx168api.com:9091";
var socketUrlArr=["https://app6.fx168api.com:9091","https://app7.fx168api.com:9091"];//行情
var sudiUrlArr=['https://app10.fx168api.com:9093','https://app8.fx168api.com:9093'];//速递socket
var baseUrl="https://app5.fx168api.com/h5/";//正式服务器https://app5.fx168api.com/h5/   //http://192.168.30.190:99/h5 //测试服务器 //http://123.206.224.250:8080/h5/  bate环境
// var baseUrl="http://192.168.30.190:8083/";
//var baseUrlHost="http://"+window.location.host+"/";
var baseUrlHost="";
var socketUrl="";
var searchUrl="https://app4.fx168api.com/";


var index_socket = Math.floor((Math.random()*socketUrlArr.length));
socketUrl=socketUrlArr[index_socket];
// console.log(index_sudi)

// 数据监控
// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

//   ga('create', 'UA-47403057-1', 'auto');
//   ga('require', 'displayfeatures');
//   ga('require', 'linkid', 'linkid.js');
//   ga('send', 'pageview');


//   var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
// document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F779dfdbe4a000d1108b8a1daa23f17bd' type='text/javascript'%3E%3C/script%3E"))
