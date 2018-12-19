import "./css/public.scss";

import "./css/appActive.scss";

import {
  AssisFunc,
  baseUrl,
  addEventLog
} from "./js/public.js"

import "jquery";

var shareJson = {
  isShare: 0, //0:不分享 1:分享
  shareTitle: "分享啊",
  // shareUrl: window.location.href,
  shareUrl: "http://192.168.30.175/webchat.html",
  sharePlatform: "朋友圈",
  shareImage: "https://avatar.csdn.net/5/4/0/3_alanfancy.jpg",
  shareContent: "给你推荐一赞，去看看大家对它的评价吧"
};

var activeId = getQueryString("activeId") || 3;

var t = "A88D6FE54C60C5826F8C4BE4EDBC8C16";
var isShared = null;
var shareUrl = null;
var pageShare = true;

function acceptToken(str) { //接受app返回值
  if (!str) {
    addEventLog({
      activeId: activeId,
      eventTags: 4,
      activeShareId: activeId,
      // t: "1F8AE456CB53AC5317E107AA2722DCF6"
    })
    needToLogin();
  } else {
    t = str;
    if (pageShare) {
      shareJs(JSON.stringify(shareJson));
      $(".share_webchat").show();
    }
  }
}

getActiveInfo(); //获取app内部activeId信息

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  // if (r != null) return unescape(r[2]);
  if (r != null) return r[2];
  return null;
}

$(function() {
  // isLogin();
  //查看课程介绍
  $("#curse-introduct").click(function() {
    $(".sub_wrap").show();
    $(".user_coupon").removeClass("margin_top_neg")
    $(this).hide();
    addEventLog({
      activeId: activeId,
      eventTags: 3,
      activeShareId: activeId,
      t: t
    })
  })

  $(".sub_wrap .btn_detail").click(function() {
    $(".user_coupon").addClass("margin_top_neg");
    $(this).parent().hide();
    $('html , body').animate({
      scrollTop: 0
    }, 0);
    $("#curse-introduct").show();
  })

  $(".join_active").click(function() { //参加活动
    if ($(this).hasClass("disable")) return false;
    getToken();
    addEventLog({
      activeId: activeId,
      eventTags: 2,
      activeShareId: activeId,
      t: t
    })
  })

  $(".share_webchat").click(function(e) { //点击阴影隐藏
    if ($(e.target).hasClass("share_webchat")) {
      $(this).hide();
    }
  })

  $(".share_webchat ul").find("li").each(function(i) {
    $(this).click(function() {
      var sharePlatform = $(this).data("webchat");
      shareJson.sharePlatform = sharePlatform;
      afterShareActive(); //发起活动分享
      $(this).parent().parent().parent().hide();
      if (sharePlatform == '朋友圈') {
        addEventLog({
          activeId: activeId,
          eventTags: 6,
          activeShareId: activeId,
          t: t
        })
      } else if (sharePlatform == '微信') {
        addEventLog({
          activeId: activeId,
          eventTags: 7,
          activeShareId: activeId,
          t: t
        })
      }
      openShare(JSON.stringify(shareJson)); //分享至微信/朋友圈
    })
  })

  function afterShareActive() { //发起活动分享
    $.ajax({
      url: baseUrl.api + "/active/afterShareActive.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: activeId,
        t: t
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
        activeId: activeId,
        t: t
      },
      success: getActiveSuccess
    });
  }

  function getActiveSuccess(res) { //课程回调
    var data = res.data;
    if (data == "") return false;
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
    shareJson.shareUrl = data.shareUrl; //分享url
    shareUrl = data.shareUrl;
    isShared = data.isShared;
    AssisFunc(".box", 5); //广告轮播
    helpUserList(data);
  }

  function helpUserList(data) { //助力计时人数进度展示
    $("[data-sharepeople]").html(data.helpCount); //助力人数显示
    progress(data.classConfigList, data.helpCount); //当前进度
    getWechatUserList(data.wechatUserList); //微信助力人员
    countTime(data.shareDate, data.finishDate, data.isOverTime); //倒计时
    if (data.isShared == 0) {
      $(".assistance").hide();
      $(".assis_man").hide();
      $(".join_active.able").html("参加活动");
    } else if (data.isShared == 1) {
      $(".join_active.able").html("分享活动");
    }
  }

  function getWechatUserList(wechatUserList) { //微信助力的人数
    var str = "";
    console.table(wechatUserList);
    if (wechatUserList && typeof wechatUserList == "object") {
      for (var i = 0; i < wechatUserList.length; i++) {
        str += '<li class="clear">' +
          '<img class="left" alt="" src=' + wechatUserList[i].headImgUrl + '>' +
          '<div class="left nickname">' +
          '<aside class="onega">' +
          '<span>' + wechatUserList[i].nickName + '</span>' +
          '<time>' + wechatUserList[i].helpTime + '</time>' +
          '</aside>' +
          '<h5>为您助力</h5>' +
          '</div>' +
          '</li>'
      }
      $("#assis_wrap ul").html(str);
    }
    AssisFunc("#assis_wrap", 2); //助理人员轮播
  }

  function progress(parms, helpCount) { //当前进度
    if (parms && typeof parms == "object") {
      $(".module_art").find("li").each(function(i) {
        if (parms[i] == null) return false;
        var helpPersonRequire = parms[i].helpPersonRequire + "人";
        var rate = parms[i].rate;
        $(this).find("[data-helprequire]").html(helpPersonRequire);
        $(this).find("[data-rate]").html(rate);
      })
      rateProgress(parms, helpCount)
    }
  }

  function rateProgress(parms, helpCount) { //进度条展示
    var discount = 0;
    var pro_way1 = "0%";
    var pro_way2 = "0%";
    var pro_way3 = "0%";
    if (helpCount <= parms[0].helpPersonRequire) {
      discount = parms[0].helpPersonRequire - 0;
      pro_way1 = helpCount / discount * 30 + '%';
      if (helpCount == parms[0].helpPersonRequire) {
        $(".module_progres").addClass("active1");
        $(".module_art li").eq(0).addClass("active")
      } else {
        $(".module_progres").addClass("active0");
      }

    } else if (helpCount > parms[0].helpPersonRequire && helpCount <= parms[1].helpPersonRequire) {
      discount = parms[1].helpPersonRequire - parms[0].helpPersonRequire;
      pro_way1 = '30%';
      pro_way2 = (helpCount - parms[0].helpPersonRequire) / discount * 28 + '%';
      if (helpCount == parms[1].helpPersonRequire) {
        $(".module_progres").addClass("active2");
        $(".module_art li").eq(1).addClass("active")
      } else {
        $(".module_progres").addClass("active1");
        $(".module_art li").eq(0).addClass("active")
      }

    } else if (helpCount > parms[1].helpPersonRequire && helpCount <= parms[2].helpPersonRequire) {
      discount = parms[2].helpPersonRequire - parms[1].helpPersonRequire;
      pro_way1 = '30%';
      pro_way2 = '30%';
      pro_way3 = (helpCount - parms[1].helpPersonRequire) / discount * 26 + '%';
      if (helpCount == parms[2].helpPersonRequire) {
        $(".module_progres").addClass("active3");
        $(".module_art li").eq(2).addClass("active")
      } else {
        $(".module_progres").addClass("active2");
        $(".module_art li").eq(1).addClass("active")
      }

    } else if (helpCount > parms[2].helpPersonRequire) {
      pro_way1 = '30%';
      pro_way2 = '30%';
      pro_way3 = '30%';
      $(".module_progres").addClass("active3");
      $(".module_art li").eq(2).addClass("active")
    }

    $(".pro_way1").css("width", pro_way1);
    $(".pro_way2").css("width", pro_way2);
    $(".pro_way3").css("width", pro_way3);
  }

  function countTime(now, finishDate, isOverTime) { //倒计时
    var now = now;
    var that = this;
    var timer = null;
    clearInterval(timer);
    var finishDate = finishDate;
    var now = new Date(now).getTime();
    var i = 0;
    if (now >= finishDate || isOverTime == 1) {
      $(".time-start").hide().remove();
      $(".active-btn").hide().remove();
      $(".end-btn").show();
      $(".time-end").show();
      endActive();
      return false;
    }
    timer = setInterval(function() {
      var start = now + (1000 * (++i))
      // var date = new Date();
      // var now = date.getTime();
      var endDate = new Date(finishDate); //设置截止时间
      var end = endDate.getTime();
      var leftTime = end - start; //时间差
      var d, h, m, s, ms;
      if (leftTime >= 0) {
        // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        ms = Math.floor(leftTime % 1000);
        if (ms < 100) {
          ms = "0" + ms;
        }
        if (s < 10) {
          s = "0" + s;
        }
        if (m < 10) {
          m = "0" + m;
        }
        if (h < 10) {
          h = "0" + h;
        }
      } else {
        h = "00";
        m = "00";
        s = "00";
        clearInterval(timer);
        $(".time-start").hide().remove();
        $(".active-btn").hide().remove();
        $(".end-btn").show();
        $(".time-end").show();
        endActive();
      }
      $("[data-hour]").html(h);
      $("[data-minutes]").html(m);
      $("[data-seconds]").html(s);
    }, 1000)
  }

  function CouponPage() {
    //在消息内打开页面（奖励分发）
    $.ajax({
      url: baseUrl.api + '/active/getClassActiveCouponPage.json',
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: activeId,
        t: t
      },
      success: function(res) {}
    });
  }

  function returnActiveInfo(res) { //接受appactiveId
    activeId = res;
  }

  function endActive() { //活动结束页面
    $(".user_coupon").hide();
    $(".assistance").hide();
    $(".assis_man").hide();
    var $cloneRule = $(".active_rule").clone(true);
    $(".active_rule").hide();
    $("#bodymain").append($cloneRule);
    $(".join_active.able").hide();
    $(".join_active.disable").show();
    $(".sub_recommend").addClass("mart_zore11");
  }

  window.returnActiveInfo = returnActiveInfo;
})

window.acceptToken = acceptToken;
