import "./css/public.scss";

import {
  AssisFunc,
  baseUrl
} from "./js/public.js"

import "jquery";

$(function() {
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
    $("[data-sharepeople]").html(data.helpCount);
    progress(data.classConfigList, data.helpCount);
    getWechatUserList(data.wechatUserList);
    //广告轮播
    AssisFunc("#assis_wrap", 2);
    countTime(data.now, data.finishDate)
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
  }

  function progress(parms, helpCount) { //进度条
    if (parms && typeof parms == "object") {
      $(".module_art").find("li").each(function(i) {
        var helpPersonRequire = parms[i].helpPersonRequire + "人";
        var rate = parms[i].rate;
        $(this).find("[data-helprequire]").html(helpPersonRequire);
        $(this).find("[data-rate]").html(rate);
      })
      rateProgress(parms, helpCount)
    }
  }

  function rateProgress(parms, helpCount) {
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


  function fullZero(num,calc) {
    var str = '';
    if (num < calc) {
      str = "0" + num;
    }
    return str;
  }

  function countTime(now, finishDate) {
    var now = now;
    var finishDate = finishDate;
    var timer = setInterval(function() {
      var date = new Date();
      var now = date.getTime();
      var endDate = new Date(finishDate); //设置截止时间
      var end = endDate.getTime();
      var leftTime = end - now; //时间差
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
        return false;
      }
      $("[data-hour]").html(h);
      $("[data-minutes]").html(m);
      $("[data-seconds]").html(s);
    }, 500)
  }
})


function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  // if (r != null) return unescape(r[2]);
  if (r != null) return r[2];
  return null;
}
