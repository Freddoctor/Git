import "./css/public.scss";

import "./css/appActive.scss";

import {
  AssisFunc,
  baseUrl
} from "./js/public.js"

import "jquery";

var shareJson = {
  isShare: 1, //0:不分享 1:分享
  shareTitle: "分享啊",
  shareUrl: window.location.href,
  sharePlatform: "朋友圈",
  shareImage: "https://avatar.csdn.net/5/4/0/3_alanfancy.jpg",
  shareContent: "给你推荐一赞，去看看大家对它的评价吧"
};

var activeId = null;
var t = null;
var isShared = null;
var shareUrl = null;

function acceptToken(str) { //接受app返回值
  if (!str) {
    needToLogin();
  } else {
    shareJs(JSON.stringify(shareJson));
    $(".share_webchat").show();
  }
}

$(function() {
  // isLogin();
  //查看课程介绍
  $("#curse-introduct").click(function() {
    $(".sub_wrap").show();
    $(this).hide();
  })

  $(".sub_wrap .btn_detail").click(function() {
    $(this).parent().hide();
    $("#curse-introduct").show();
  })

  $(".join_active").click(function() { //参加活动
    getToken();
  })

  $(".share_webchat ul").find("li").each(function(i) {
    $(this).click(function() {
      var sharePlatform = $(this).data("webchat");
      shareJson.sharePlatform = sharePlatform;
      afterShareActive(); //发起活动分享
      $(this).parent().parent().parent().hide();
      openShare(JSON.stringify(shareJson)); //分享至微信/朋友圈
    })
  })

  function afterShareActive() { //发起活动分享
    $.ajax({
      url: baseUrl.api + "/active/afterShareActive.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: 2,
        t: "1F8AE456CB53AC5317E107AA2722DCF6"
      },
      success: shareActiveSuccess
    });
  }

  function shareActiveSuccess(res) { //活动分享之后的回调
    console.log(res.msg);
  }

  $(".cancel").click(function() { //取消操作
    $(this).parent().parent().hide();
  })

  getAjaxActivePage();

  function getAjaxActivePage() { //获取app内课程活动数据
    $.ajax({
      url: baseUrl.api + "/active/getClassActivePage.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: 3,
        t: "1F8AE456CB53AC5317E107AA2722DCF6"
      },
      success: getActiveSuccess
    });
  }

  function getActiveSuccess(res) { //课程回调
    var data = res.data;
    var list = data.haveCouponUserList;
    var htmlstr = "";

    for (var i = 0; i < list.length; i++) {
      var str = list[i];
      if (str.indexOf("获取") != -1 && str.indexOf("元优惠券") != -1) {
        var name = str.split("获取")[0];
        var span = str.split("获取")[1].split("元")[0];
        htmlstr += "<li><em>" + name + "</em>" + " - 获取<span>" + span + "</span>" + str.split("获取")[1].split("元")[1] + "</li>";
      }
    }

    $(".box .wrap_list").html(htmlstr);

    shareUrl = data.shareUrl;
    isShared = data.isShared;
    AssisFunc(".box", 5); //广告轮播
  }

})

function addEventLog(parm, success) { //增加操作日志
  $.ajax({
    url: baseUrl.api + "/active/addEventLog.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      activeId: parm.activeId,
      eventTags: parm.eventTags,
      activeShareId: parm.activeShareId,
      t: parm.t
    },
    success: function(res) {
      if (typeof success == "function") {
        success(res);
      }
    }
  })
}
window.acceptToken = acceptToken;
