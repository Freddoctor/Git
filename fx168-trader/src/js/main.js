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

var activeId = getQueryString("activeId");

var baseUrl = {
    dev: "http://192.168.30.190:99",
    build: "http://123.206.224.250:8080",
    api: "https://app5.fx168api.com"
    //api:'http://192.168.30.190:99'
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    // if (r != null) return unescape(r[2]);
    if (r != null) return r[2];
    return null;
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
        activeId: activeId,
        eventTags: 1,
        activeShareId: activeId
    });

    $(".btn_dialog").click(function(){
        var index = $(this).index();
        var dialog = $(".dialog");
        if (dialog.eq(index).data("dialog") == index) {
            dialog.eq(index).show().siblings(".dialog").hide();
        }
    });

    $(".dialog").on("click","ins",function(){
        $(this).parent().parent().hide();
    })

})