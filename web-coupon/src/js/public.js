! function(n) {
  var e = n.document,
    t = e.documentElement,
    i = 750,
    d = i / 100,
    o = "orientationchange" in n ? "orientationchange" : "resize",
    a = function() {
      var n = t.clientWidth || 320;
      n > 750 && (n = 750);
      t.style.fontSize = n / d + "px"
    };
  e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
}(window);


function AssisFunc(obj, num) { //滚动轮播广告
  var $boxwrap = $(obj);
  var $moveBox = $boxwrap.find("ul");

  var Hight = $moveBox.height();
  // console.log(Hight);

  if ($moveBox.find("li").length <= num) {
    return false;
  }

  load(num);

  function load(num) {
    var str = new String();

    for (var i = 0; i <= num; i++) {
      str += "<li class='clear'> " + $moveBox.find("li").eq(i).html() + "</li>";
    }
    // console.log(str)
    $moveBox.append(str);
    // var first = $moveBox.find("li:first").clone(true);
    // var second = $moveBox.find("li").eq(1).clone(true);
    // var third = $moveBox.find("li").eq(2).clone(true);
    // $moveBox.append(first);
    // $moveBox.append(second);
    // $moveBox.append(third);
  }

  var timer;
  var i = 0;
  clearInterval(timer);
  timer = setInterval(function() {
    i++;
    $moveBox.css({
      "transform": "translateY(" + -i + "px)",
      "webkitTransform": "translateY(" + -i + "px)"
    });
    if (-i == -parseInt(Hight)) {
      $moveBox.css({
        "webkitTransform": "translateY(" + 0 + "px)",
        "transform": "translateY(" + 0 + "px)",
      });
      i = 0;
    }
  }, 30)
}

var loginToken = ""; //登陆状态token
var ua = window.navigator.userAgent;
var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isWeiXin = (function() {
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
})()

var baseUrl = {
  url99: "http://192.168.30.190:99",
  provUrl: "http://123.206.224.250:8080",
  api: "http://192.168.30.190:99"
}

// js调安卓方法拿USERID
function isLogin() {
  if (isiOS && window.webkit && !isWeiXin) {
    window.webkit.messageHandlers.isLogin.postMessage("123");
  } else if (window.SysClientJs && isAndroid) {
    window.SysClientJs.isLogin()
  }
}

function getToken() { //原生获取token
  if (isiOS && window.webkit && !isWeiXin) {
    alert(111)
    window.webkit.messageHandlers.getToken.postMessage("123");
  } else if (window.SysClientJs && isAndroid) {
    window.SysClientJs.getToken()
  }
}

function needToLogin() { //需要登录原生app
  if (isiOS && window.webkit && !isWeiXin) {
    window.webkit.messageHandlers.needToLogin.postMessage("123");
  } else if (window.SysClientJs && isAndroid) {
    window.SysClientJs.needToLogin()
  }
}

function returnIsLogin(str) {
  // 是否登录备用接口
  // $(".join_active").html(str);
}

function shareJs(shareJson) { //分享接口
  if (window.SysClientJs && isAndroid) {
    window.SysClientJs.shareJs(shareJson);
  }
  if (isiOS && window.webkit && !isWeiXin) {
    window.webkit.messageHandlers.shareJs.postMessage(shareJson);
  }
}

function openShare(sharetitles) { //终端分享列表
  // NSArray *sharetitles = [NSArray arrayWithObjects:@"微信",@"朋友圈",@"新浪微博",@"QQ",@"QQ空间",@"短信",@"邮件", nil];
  if (isiOS && window.webkit && !isWeiXin) {
    window.webkit.messageHandlers.openShare.postMessage(sharetitles);
  }
  if (window.SysClientJs && isAndroid) {
    window.SysClientJs.openShare(sharetitles);
  }
}

function openCourseDetail(idName) { //跳转课程
  if (isiOS && window.webkit && !isWeiXin) {
    window.webkit.messageHandlers.openCourseDetail.postMessage(idName);
  }
  if (window.SysClientJs && isAndroid) {
    window.SysClientJs.openCourseDetail(idName);
  }
}

function copy(str) { //复制
  if (isiOS && window.webkit && !isWeiXin) {
    window.webkit.messageHandlers.copy.postMessage(str);
  }
  if (window.SysClientJs && isAndroid) {
    window.SysClientJs.copy(str);
  }
}

function formatDate(date, fmt) {
  var currentDate = new Date(date);
  var o = {
    "M+": currentDate.getMonth() + 1, //月份
    "d+": currentDate.getDate(), //日
    "h+": currentDate.getHours(), //小时
    "m+": currentDate.getMinutes(), //分
    "s+": currentDate.getSeconds(), //秒
    "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度
    "S": currentDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function addEventLog(parm, success) { //增加操作日志
  if(!window.$) return false;
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

window.isLogin = isLogin;
window.shareJs = shareJs;
window.openShare = openShare;
window.returnIsLogin = returnIsLogin;
window.openCourseDetail = openCourseDetail;
window.copy = copy;
window.getToken = getToken;
window.needToLogin = needToLogin;



module.exports.AssisFunc = AssisFunc;
module.exports.isiOS = isiOS;
module.exports.isAndroid = isAndroid;
module.exports.baseUrl = baseUrl;
module.exports.formatDate = formatDate;
module.exports.addEventLog = addEventLog;
