import "jquery";
import "./css/template.css"
//数据data.json
import {
  data
}
from "./js/detail.json"

console.log(data);

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

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


function showQueryList() { //根据pro_id获取相应的页面信息
  var queryString = getQueryString("pro_id");
  var list = data;
  var valueList = new Array();
  for(var i = 0 ;i < list.length ;i ++) {
    if (list[i].label == queryString) {
      valueList = list[i].value;
      break;
    }
  }
  var str = "";
  for(var j = 0 ;j < valueList.length ;j ++) {
    str += '<li><span class="label">' + valueList[j].label + '</span><span class="value">' + valueList[j].value +'</span></li>'
  }
  $("[data-idpro]").html(queryString);
  $("[data-childpro]").html(str);
}

showQueryList();
// function showTop(proId) {
//   $("[data-idpro]").html(proId);
// }

// function showList(result) {
//   var str = "";
//   if (Object.prototype.toString.call(result) == "[object Array]") {
//     for (var i = 0; i < result.length; i++) {
//       str += "<li><span class='label'>" + result[i].label + "</span>" + "<span class='value'>" + result[i].value + "</span></li>"
//     }
//   }
//   $("[data-childpro]").html(str);

// }

// function ServiceDetail(idName) {
//   this.idName = idName;
//   this.id = null;
//   this.result = [];
// }

// ServiceDetail.prototype.getQueryId = function() {
//   this.id = getQueryString.call(this, this.idName);
//   return this;
// }

// ServiceDetail.prototype.getResult = function() {
//   for (var i = 0; i < dataList.length; i++) {
//     if (dataList[i].value == this.id) {
//       this.result = dataList[i].label.children;
//       break;
//     }
//   }
//   return this;
// }

// ServiceDetail.prototype.showTop = function() {
//   showTop.call(this, this.id);
//   return this;
// }

// ServiceDetail.prototype.showList = function() {
//   showList.call(this, this.result);
//   return this;
// }

// ServiceDetail.prototype.init = function() {
//   this.getQueryId().getResult().showTop().showList();
//   return this;
// }

// var product = new ServiceDetail("pro_id").init();
