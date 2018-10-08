
var baseUrl="http://m.fx168.com/";
// var baseUrl="http://123.206.224.250:8080";
 var baseUrl2="https://app5.fx168api.com/";
 //var baseUrl2="http://192.168.30.190:99/
 // var baseUrl2="http://123.206.224.250:8080"

// 盒子
var boxUrl="https://tradebox.t.fx168api.com";//  http://tradebox.t.fx168api.com:8082 http://192.168.30.66:8085
var chartUrl="http://fx168api.fx168.com/InterfaceCollect";//http://fx168api.fx168.com/InterfaceCollect  测试http://192.168.2.92:8004
var headUrl="http://t.fx168.com";
// var baseUrl2="http://123.206.224.250:8080";    //http://123.206.224.250:8080/   http://192.168.30.190:99
//var baseUrl="http://192.168.30.173:8020/h5.v.2.0";

/**
  公共加载
*/
// var app_v=null;

function isNull(value){
  if(typeof value =="undefined" || value==null || value==""){
  	return true;
  }
    return false;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null)
        return unescape(r[2]);
    return "";
}
