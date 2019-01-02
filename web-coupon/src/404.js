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
