import "../css/shoplist.scss"

var template = require("../template/shop.data.list.hbs");
import ieHack from "../template/ieHack.hbs"

//list数据
import parms from "../template/getshoplist.js";
console.log(parms)
//判断是否升降序
parms.data.forEach(function(item, index) {
  item.fitCash = (parseInt(item.fitCash)) / 10000 + "万元"
  item.type = item.type == "0" ? false : true
})

$("body").append(ieHack)
$("#template").html(template(parms));

$(".nav ul").on("click", "li", function() {
  $(this).addClass("active").siblings().removeClass("active");
  $(this).toggleClass("price");
})
