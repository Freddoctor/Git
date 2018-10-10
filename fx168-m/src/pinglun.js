import "./css/newsList.css"
import "./css/home.css"
import "./asset/24k99.scss";

var $ = require("jquery");
var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth / 750;
var ua = navigator.userAgent;
var header = document.getElementsByTagName("head")[0];
if (/Android (\d+\.\d+)/.test(ua)) {
  var version = parseFloat(RegExp.$1);
  if (version > 2.3) {
    $(header).append('<meta name="viewport" content="width=0, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
  } else {
    $(header).append('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">');
  }
} else {
  $(header).append('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');
}


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


var _bdhmProtocol = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F779dfdbe4a000d1108b8a1daa23f17bd' type='text/javascript'%3E%3C/script%3E"));

var newsList = require("./js/newsList.js");
var home = require("./js/home.js");
