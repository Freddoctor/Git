import "./css/css_download/common.css"
import "./css/css_download/app.css"
var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth / 750;
var ua = navigator.userAgent;
var header = document.getElementsByTagName("head")[0];
var meta = document.createElement("meta");
meta.setAttribute("name", "viewport");


//////////////   ---------------------------   //////////////////////////
require(["./exportFunction.js"],function(res){
  var funStr = res.toString();
  console.log(JSON.stringify(funStr))
});
// import("./exportFunction.js").then(module=>{
//    console.log(module)
// })

if (/Android (\d+\.\d+)/.test(ua)) {
  var version = parseFloat(RegExp.$1);
  if (version > 2.3) {
    meta.setAttribute("content", 'width=0,minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi');
  } else {
    meta.setAttribute("content", 'width=640, target-densitydpi=device-dpi');
  }
} else {
  meta.setAttribute("content", 'width=640, user-scalable=no, target-densitydpi=device-dpi');
}

header.appendChild(meta);

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-47403057-1', 'auto');
ga('require', 'displayfeatures');
ga('require', 'linkid', 'linkid.js');
ga('send', 'pageview');

var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F779dfdbe4a000d1108b8a1daa23f17bd' type='text/javascript'%3E%3C/script%3E"));
