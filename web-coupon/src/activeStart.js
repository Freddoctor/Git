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
    addEventLog({
      activeId: 3,
      eventTags: 4,
      activeShareId: 3,
      t: "1F8AE456CB53AC5317E107AA2722DCF6"
    })
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
    $(".user_coupon").removeClass("margin_top_neg")
    $(this).hide();
    addEventLog({
      activeId: 3,
      eventTags: 3,
      activeShareId: 3,
      t: "1F8AE456CB53AC5317E107AA2722DCF6"
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
    getToken();
    addEventLog({
      activeId: 3,
      eventTags: 2,
      activeShareId: 3,
      t: "1F8AE456CB53AC5317E107AA2722DCF6"
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
          activeId: 3,
          eventTags: 6,
          activeShareId: 3,
          t: "1F8AE456CB53AC5317E107AA2722DCF6"
        })
      } else if (sharePlatform == '微信') {
        addEventLog({
          activeId: 3,
          eventTags: 7,
          activeShareId: 3,
          t: "1F8AE456CB53AC5317E107AA2722DCF6"
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
        activeId: 2,
        t: "A88D6FE54C60C5826F8C4BE4EDBC8C16"
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
        t: "A88D6FE54C60C5826F8C4BE4EDBC8C16"
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
    countTime(data.now, data.finishDate); //倒计时
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
  window.countTime = countTime;

  function countTime(now, finishDate) { //倒计时
    var now = now;
    var that = this;
    var timer = null;
    clearInterval(timer);
    var finishDate = 1546041600000 || finishDate;
    var now = new Date(now).getTime();
    var i = 0;
    console.log(now, finishDate)
    if (now >= finishDate) {
      $(".time-start").hide().remove();
      $(".active-btn").hide().remove();
      $(".end-btn").show();
      $(".time-end").show();
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
        $(".time-end").show()
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
        activeId: 3,
        t: "A88D6FE54C60C5826F8C4BE4EDBC8C16"
      },
      success: function(res) {}
    });
  }

})


window.acceptToken = acceptToken;
