import "./css/public.scss";

import {
  AssisFunc,
  baseUrl
} from "./js/public.js"

import "jquery";

$(function() {

  var activeId = null; //活动id
  var activeShareId = null; //分享id
  var helpCount = null; //帮助人数
  var userCenterId = null;
  var openId = null;
  //查看课程介绍
  $("#curse-introduct").click(function() {
    $(".sub_wrap").show();
    $(this).hide();
  })

  $(".sub_wrap .btn_detail").click(function() {
    $(this).parent().hide();
    $("#curse-introduct").show();
  })

  function getAjaxUserList() {
    $.ajax({
      url: baseUrl.api + "/active/getSharePageShowInfo.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: 3,
        userCenterId: "1f2fd1ac1dd7b944c4ce34f9ed265ab6"
      },
      success: usersShowSuccess
    });
  }

  getAjaxUserList();

  function usersShowSuccess(res) {
    var data = res.data
    console.log(data);
    helpCount = data.helpCount;
    activeId = data.activeId;
    activeShareId = data.activeShareId;
    progress(data.classConfigList, data.helpCount); //当前进度
    getWechatUserList(data.wechatUserList); //微信助力人员
    countTime(data.now, data.finishDate); //倒计时
    $("[data-sharepeople]").html(data.helpCount); //助力人数显示
  }

  function getWechatUserList(wechatUserList) {
    var str = "";
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
      $("#assis_wrap ul").html(str + str);
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

  function countTime(now, finishDate) { //倒计时
    var now = new Date().getTime();
    var finishDate = 1544832000000;
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
    var timer = setInterval(function() {
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

  setActive();

  function setActive() { //发起活动
    $("#setActive").click(function() { //发起活动弹出层
      $(".tip-rules").show();
    })

    $(".check_rule").click(function() { //活动规则
      var ins = $(this).find("ins");
      if (ins.hasClass("check_true")) {
        ins.removeClass("check_true").addClass("check_false");
      } else if (ins.hasClass("check_false")) {
        ins.removeClass("check_false").addClass("check_true");
      }
    })

    $(".close_tip").click(function() { //关闭弹框
      $(this).parent().parent().hide();
    })
  }

  setHelp();

  function setHelp() { //帮助助力
    $("#setHelp").click(function() {
      $.ajax({
        url: baseUrl.api + "/active/helpShareActive.json",
        dataType: "jsonp",
        type: "GET",
        data: {
          activeShareId: 2,
          openId: 1
        },
        success: showTip
      });
    })

    function showTip(res) {
      var msg = res.msg;
      $('.alert_success').find("p").html(msg);
      $('.alert_success').fadeIn(500).fadeOut(500);
    }
  }
})


function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  // if (r != null) return unescape(r[2]);
  if (r != null) return r[2];
  return null;
}

getJsapiSignature(); //微信授权

function getJsapiSignature() {
  $.ajax({
    url: baseUrl.api + "/common/getJsapiSignature.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      // url: "location.href.split('#')[0]"
      url:"active.fx168api.com"
    },
    success: function(res) {
      var data = res.data;
      console.log(data)
      wx.config({
        debug: true, // 开启调试模式。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        url: "active.fx168api.com",
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
      });
    }
  });
}
