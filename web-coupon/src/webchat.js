import "./css/public.scss";

import {
  AssisFunc,
  baseUrl,
  addEventLog,
  jsonp,
  getImageUrl
} from "./js/public.js"

import "jquery";

var code = getQueryString("code");

var sign = getQueryString("sign") || "B73FF07F9D585A9D008604B30581EC7A%1D%2BiVcZf6M0UgPm12ntMKcMC2L1OEm8HU6qkwwmXX6ciOuTvj%2Fhp11ctoq7pVAtulI0UNE41OYXPSADY2fChJHp8ZyKyjeDMFLMuQsKABC384%3D%1DCFC0sb%2Ft2UkNXWps2ug7JgEPiAKLy2%2FGslo%2BC2CkJz95huPOlHg41TniS3%2B80tcySYBahhJhPFPaJr%2FPRD79ZJdyKAvyV62A514ZVJzbruJGHKx9Nfnc5KLK84iJNvNUTH04PbLU76%2F%2FGgXrTZiTZpWMWhyzfR8K%2FRIv%2FVbx8zk%3D";

var openId = null;

var shareImage = null;

var shareUrl = null;

var shareData = { //微信分享配置参数
  title: '就差你了，快帮我助力一下参与FX168财经学院课程优惠活动',
  desc: '快来和我一起参加活动，获取超值优惠',
  link: null,
  imgUrl: null
};

if (!code) {
  localStorage.setItem("link",window.location.href);
  $("body").html("");
  window.location.href =
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 'wxeb4937fe06467ccd' + '&redirect_uri=' +
    encodeURIComponent(window.location.href) +
    '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
}

$(function() {

  var activeId = null; //活动id
  var activeShareId = null; //分享id
  var helpCount = null; //帮助人数
  var userCenterId = null;

  var checkIsHelp = false;
  //查看课程介绍
  $("#curse-introduct").click(function() {
    // 点击“展开课程介绍”事件
    $(".sub_wrap").show();
    $(".assistance").removeClass("margin_top_neg");
    $(this).hide();
    addEventLog({
      activeId: activeId,
      eventTags: 3,
      activeShareId: activeShareId,
    })
  })

  $(".sub_wrap .btn_detail").click(function() {
    $(this).parent().hide();
    $(".assistance").addClass("margin_top_neg");
    $('html , body').animate({
      scrollTop: 0
    }, 0);
    $("#curse-introduct").show();
  })


  function getAjaxUserList() { //获取用户列表ajax
    // data: {
    //   activeId: 3,
    //   userCenterId: "d210c5c78630f81b099680da22831aa6"
    // },
    jsonp.get(baseUrl.api + "/active/getSharePageShowInfo.json", {
      sign: sign
    }, function(res) {
      usersShowSuccess(res);
    })
  }

  function usersShowSuccess(res) {
    var data = res.data
    helpCount = data.helpCount;
    activeId = data.activeId;
    activeShareId = data.activeShareId;
    progress(data.classConfigList, data.helpCount); //当前进度
    getWechatUserList(data.wechatUserList); //微信助力人员
    countTime(data.shareDate, data.finishDate, data.isOverTime); //倒计时
    $("[data-sharepeople]").html(data.helpCount); //助力人数显示
    checkIsAlreadyHelp() // 检测是否助力过
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

  function countTime(shareDate, finishDate, isOverTime) { //倒计时
    var now = shareDate;
    var finishDate = finishDate;
    var now = new Date(now).getTime();
    var i = 0;
    console.log(now, finishDate)
    if (now >= finishDate || isOverTime == 1) {
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
    $("#setActive").unbind("click");
    $(".check_rule").unbind("click");
    $(".close_tip").unbind("click");

    $("#setActive").click(function() { //发起活动弹出层
      $(".tip-rules").show();
      addEventLog({
        activeId: activeId,
        eventTags: 9,
        activeShareId: activeShareId,
      })
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

  function setHelp() { //帮助助力
    $("#setHelp").unbind("click");
    $("#setHelp").click(function() {
      $.ajax({
        url: baseUrl.api + "/active/helpShareActive.json",
        dataType: "jsonp",
        type: "GET",
        data: {
          activeShareId: activeShareId,
          openId: openId
        },
        success: function(res) {
          showTip(res);
          addEventLog({
            activeId: activeId,
            eventTags: 8,
            activeShareId: activeShareId,
          })
        }
      });
    })
    var isDisable = false; //1秒多次阻止点击
    function showTip(res) {
      var msg = res.msg;
      if (isDisable) return false;
      setTimeout(function() {
        isDisable = false;
      }, 1000)
      if (msg == "success") {
        msg = "助力成功"
      }
      $('.alert_success').find("p").html(msg);
      $('.alert_success').fadeIn(500).fadeOut(500);
      $("#setHelp").remove();
      $("#shareMoreHelp").show().css("display", "block");
      shareMoreHelp();
      isDisable = true;
    }
  }

  function shareMoreHelp() { //帮TA找更多人助力
    $("#shareMoreHelp").unbind("click");
    $(".share").unbind("click");
    $("#setHelp").remove();
    $("#shareMoreHelp").show().css("display", "block");;
    $("#shareMoreHelp").html("帮TA找更多人助力");

    $("#shareMoreHelp").click(function() {
      $(".share").show();
    })
    $(".share").click(function() {
      $(this).hide();
    })
  }

  if (code) {
    getOpenId(code);
  }

  function onReadyHelp(res) { //是否已经帮助过
    if (res == 1) {
      shareMoreHelp();
    } else {
      setHelp();
    }
  }

  function getOpenId(code) { //获取openId的值
    $.ajax({
      url: baseUrl.api + "/common/acceptWechatCode.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        code: code
      },
      success: function(res) {
        if (!res.data) return false;
        openId = res.data.openId;
        getAjaxUserList();
      }
    });
  }

  function checkIsAlreadyHelp() { //检测是否助力
    $.ajax({
      url: baseUrl.api + "/active/checkIsAlreadyHelp.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeShareId: activeShareId,
        openId: openId
      },
      success: function(res) {
        onReadyHelp(res.data.isAlreadyHelp); //确认是否在助力
      }
    });
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
      url: location.href.split('#')[0]
    },
    success: function(res) {
      var data = res.data;
      shareData.link = data.url;
      wx.config({
        debug: false, // 开启调试模式。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        url: data.url,
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "previewImage"] // 必填，需要使用的JS接口列表
      });
      shareImage = getImageUrl(window.location.href, "activeShareImg");
      var imgUrl = shareImage ? shareImage : require("./images/webchat.jpg");
      shareData.imgUrl = imgUrl;
      wxShare(shareData)
    }
  });
}

function wxShare(shareData) {
  console.log(shareData)
  wx.ready(function() { //微信分享
    wx.checkJsApi({
      jsApiList: [
        'onMenuShareAppMessage',
        'previewImage',
        'onMenuShareTimeline'
      ],
      success: function(res) {
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
      }
    });
  })
}
