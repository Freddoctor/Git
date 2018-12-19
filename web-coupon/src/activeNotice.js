import "./css/public.scss";
import "./css/activeNotice.scss";

import {
  AssisFunc,
  baseUrl,
  formatDate
} from "./js/public.js";

import "jquery";

var t = "A88D6FE54C60C5826F8C4BE4EDBC8C16"

var activeId = getQueryString("activeId") || 3;

var courseSetId = 295;

function acceptToken(str) { //接受app返回值
  if (!str) {
    addEventLog({
      activeId: activeId,
      eventTags: 4,
      activeShareId: activeId,
    })
    needToLogin();
  } else {
    t = str;
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

  function getUserList() {
    $.ajax({
      url: baseUrl.api + "/active/getClassActivePage.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: activeId,
        t: t
      },
      success: usersShowSuccess
    });
  }

  getUserList();

  copyOpenDetailClick();

  getClassActiveCouponPage();

  function getClassActiveCouponPage() { //获取优惠券信息
    $.ajax({
      url: baseUrl.api + "/active/getClassActiveCouponPage.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: activeId,
        t: t
      },
      success: function(res) {
        console.log(res);
        var data = res.data;
        if (data.couponStatus == 0) {
          // 可用
        } else if (data.couponStatus == 1) {
          // 过期
          $(".use_btn").remove();
          $(".nouse_btn").show().css("display", "block").html("优惠券已过期");
        } else if (data.couponStatus == 2) {
          //已使用
          $(".use_btn").remove();
          $(".nouse_btn").show().css("display", "block").html("优惠券已使用");
        }
        courseSetId = data.courseSetId; //进入课程ID
        var couponCode = data.couponCode; //优惠券码
        var rata = data.rate;
        var helpCount = data.helpCount;
        $("#coupon-password").html(couponCode);
        $("[data-helpcount]").html(helpCount);
        $("[data-rata]").html(rata + '元');
      }
    });
  }

  function usersShowSuccess(res) {
    console.log(res);
    var data = res.data;
    var time = data.finishDate;
    var timeFormat = formatDate(time, 'yyyy年MM月dd日hh时mm分'); //yyyy-MM-dd hh:mm:ss
    $("[data-endtime]").html(timeFormat)
    getWechatUserList(data.wechatUserList);
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


  function copyOpenDetailClick() { //copy 优惠券码;
    $("[data-copy]").click(function() {
      var str = $("#coupon-password").html();
      copy(str);
    });
    $(".use_btn").click(function() {
      openCourseDetail(courseSetId);
    })
  }

  function returnActiveInfo(res) { //接受appactiveId
    activeId = res;
    getToken(); //id活动获取后获取token
  }

  window.returnActiveInfo = returnActiveInfo;
})

window.acceptToken = acceptToken;
