import "./css/404.css"
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
