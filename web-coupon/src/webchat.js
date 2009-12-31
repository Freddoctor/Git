import "./css/public.scss";

import AssisFunc from "./js/public.js"

import "jquery";

$(function() {
  //广告轮播
  AssisFunc.AssisFunc("#assis_wrap", 2);

  //查看课程介绍
  $("#curse-introduct").click(function() {
    $(".sub_wrap").show();
    $(this).hide();
  })

  $(".sub_wrap .btn_detail").click(function() {
    $(this).parent().hide();
    $("#curse-introduct").show();
  })

})


function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  // if (r != null) return unescape(r[2]);
  if (r != null) return r[2];
  return null;
}

var sign = getQueryString("sign");
alert(sign)
alert(sign?sign.length:0)
