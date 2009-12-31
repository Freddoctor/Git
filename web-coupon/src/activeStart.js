import "./css/public.scss";

import "./css/appActive.scss";

import AssisFunc from "./js/public.js"

import "jquery";

window.acceptToken = acceptToken;

function acceptToken(str) { //接受app返回值
  if (!str) needToLogin();
  return str;
}

$(function() {

  // isLogin();
  getToken();
  //广告轮播
  AssisFunc.AssisFunc(".box", 5);
  //查看课程介绍
  $("#curse-introduct").click(function() {
    $(".sub_wrap").show();
    $(this).hide();
  })

  var shareJson = {
    isShare: 1, //0:不分享 1:分享
    shareTitle: "分享啊",
    shareUrl: window.location.href,
    sharePlatform: "微信",
    shareImage: "https://avatar.csdn.net/5/4/0/3_alanfancy.jpg",
    shareContent: "给你推荐一赞，去看看大家对它的评价吧"
  };

  $(".sub_wrap .btn_detail").click(function() {
    $(this).parent().hide();
    $("#curse-introduct").show();
  })

  $(".join_active").click(function() {
    shareJs(JSON.stringify(shareJson));
    $(".share_webchat").show();
  })

  $(".share_webchat ul").find("li").each(function(i) {
    $(this).click(function() {
      var str = JSON.stringify(shareJson);
      openCourseDetail(241);
      copy("1112313213213")
      openShare(str);
    })
  })

  $(".cancel").click(function() {
    $(this).parent().parent().hide();
  })
})
