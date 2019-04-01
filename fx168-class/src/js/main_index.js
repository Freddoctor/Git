import 'jquery';

! function (n) {
  var e = n.document,
    t = e.documentElement,
    i = 750,
    d = i / 100,
    o = "orientationchange" in n ? "orientationchange" : "resize",
    a = function () {
      var n = t.clientWidth || 320;
      n > 750 && (n = 750);
      t.style.fontSize = n / d + "px"
    };
  e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
}(window);

var ua = window.navigator.userAgent;
var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isWeiXin = (function () {
  return ua.toLowerCase().indexOf('micromessenger') !== -1
})()

var baseUrl = {
  url99: "http://192.168.30.190:99",
  provUrl: "http://123.206.224.250:8080",
  // api: "https://app5.fx168api.com",
  api:'http://192.168.30.190:99'
}


function addEventLog(parm, success) { //增加操作日志
  if (!window.$) return false;
  $.ajax({
    url: baseUrl.api + "/active/addEventLog.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      activeId: parm.activeId,
      eventTags: parm.eventTags,
      activeShareId: parm.activeShareId
    },
    success: function (res) {
      if (typeof success == "function") {
        success(res);
      }
    }
  })
}

function openCourseDetail(idName) { //跳转课程
  if (isiOS && window.webkit && !isWeiXin) {
    window.webkit.messageHandlers.openCourseDetail.postMessage(idName);
  }
  if (window.SysClientJs && isAndroid && !isWeiXin) {
    window.SysClientJs.openCourseDetail(idName);
  }
}

$(function () {

  addEventLog({
    activeId: 299,
    eventTags: 1,
    activeShareId: 299
  });

  $("body").on("click", ".btn_footer", function () {
    addEventLog({
      activeId: 299,
      eventTags: 2,
      activeShareId: 299
    });
    openCourseDetail(299);
  })

})