import "../css/community.scss";

var template = require("../template/community.group.hbs"); //大层模板
import parms from "../template/postList.js"; //数据

console.info(parms);

parms.data.postArr.forEach(function(item, index) {
  item.isTop = item.isTop == "1" ? true : false;
})

document.addEventListener("DOMContentLoaded", function() {
  $("#community-template").html(template(parms));
})

import Endecrypt from "./endecrypt.js";

var data = Endecrypt.Encrypt("zeropadding") //加密

data = Endecrypt.Decrypt(data); //解密

var fixImage = $("<div class='fixImage'></div>");
$("#community-template").on("mouseenter", ".template-wrap li img", function(i) {
  var _this = $(this);
  var _parent = _this.parents("li");
  var src = _this.attr("src");
  fixImage.html("<img src='" + src + "'>")
  _parent.append(fixImage);
  console.log("自身高度",fixImage.offset().top);
  console.log("滚动高度",$(document).scrollTop());
  console.log("浏览器高度",$(window).height())
  // calcHight(fixImage);
});

$("#community-template").on("mouseleave", ".template-wrap li img", function(i) {
  var _this = $(this);
  var _parent = _this.parents("li");
  _parent.find(fixImage).remove();
});

function calcHight(obj) {
  if (!obj) return false;
  if ((obj.offset().top + $(document).scrollTop()) < $(window).height()) {
    obj.css({
      top:"50%"
    })
  }
}
