import "./css/public.scss";
import "./css/activeNotice.scss";

import {
  AssisFunc,
  baseUrl,
  formatDate
} from "./js/public.js";

import "jquery";

$(function() {

  function getUserList() {
    $.ajax({
      url: baseUrl.api + "/active/getClassActivePage.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        activeId: 3,
        t: "A88D6FE54C60C5826F8C4BE4EDBC8C16"
      },
      success: usersShowSuccess
    });
  }

  getUserList();

  copyOpenDetailClick();

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
      openCourseDetail(295);
    })
  }

})
