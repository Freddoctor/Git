import "./js/public.js"
import "./css/error.scss";

window.Promise = Promise

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

delay(1000).then((value) => {
  console.log(value);
});


getUUID();

function getUUID() { //canvas16位解码
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 1, 1);
  var b64 = canvas.toDataURL().replace("data:image/png;base64,", "")
  var bin = window.atob(b64);
  var src = bin2hex(bin.slice(-16, -12));
  console.log(src)
  console.log("%c006600fb003f00c4", 'color:#ff5c01')
  return src;
}

function bin2hex(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    result += byte2Hex(c >> 8 & 0xff); // 高字节
    result += byte2Hex(c & 0xff); // 低字节
  }
  return result;
}

function byte2Hex(b) {
  if (b < 0x10)
    return "0" + b.toString(16);
  else
    return b.toString(16);
}


//模板引擎
var runtime = require('art-template/lib/runtime');
runtime.dateFormat = function(date, fmt) {
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
};

var template = require("./template/template.art");
var html = template({
  key: "1010",
  time: new Date(),
  value: "(null)",
  list: [{
    nickName: "Dave",
    age: 25
  }, {
    nickName: "Justin",
    age: 30
  }]
});

var ele = document.getElementById("template");
ele.innerHTML = html;

ele.addEventListener("click", deleteChoose, false)

function deleteChoose(event) {
  var event = event;
  // console.log(event.target.tagName.toLowerCase());
  var attributes = event.target.attributes;
  // console.log(attributes.length);
  var methods = TargetEvent(event);
  console.log(methods);
  for (var i = 0; i < methods.length; i++) {
    if (methods[i].name == "click") {
      var func = methods[i].value;
      window[func](event);
    }
  }
}

window.delate = delate;

function delate(event) {
  console.log(event)
}

function TargetEvent(event) {
  var attributes = event.target.attributes;
  var methods = new Array();
  for (var i = 0; i < attributes.length; i++) {
    if (attributes[i].name.indexOf("@") != -1) {
      methods.push({
        name: attributes[i].name.substr(1),
        value: attributes[i].value
      })
    }
  }
  return methods;
}
