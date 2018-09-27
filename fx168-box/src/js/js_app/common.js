var baseUrl="http://m.fx168.com/";
var baseUrl2="https://app5.fx168api.com/";

var boxUrl="http://tradebox.t.fx168api.com:8082";
var chartUrl="http://fx168api.fx168.com/InterfaceCollect";
var headUrl="http://t.fx168.com";

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

module.exports.baseUrl = baseUrl;
module.exports.baseUrl2 = baseUrl2;
module.exports.boxUrl = boxUrl;
module.exports.chartUrl = chartUrl;
module.exports.headUrl = headUrl;
module.exports.isNull = isNull;
module.exports.getQueryString = getQueryString;
