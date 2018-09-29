var $ = require("jquery");
$(function() {
  initDetailInfoTabContent()
});

function initDetailInfoTabContent() {
  var noDataImg = '<div class="noImgWrap">' +
    '<img src="' + require("../../../img/img_app/zanwu@2x.png") + '" />' +
    '<p>' + "当前暂无交易员风采" + '<p/>' +
    '<div/>'
  $('.detailInfoChild').html(noDataImg);
}
