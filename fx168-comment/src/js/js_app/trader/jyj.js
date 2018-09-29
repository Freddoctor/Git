var $ = require("jquery");
import sort0 from "../../../img/img_app/sort0.png";
import sort1 from "../../../img/img_app/sort1.png";
import sort2 from "../../../img/img_app/sort2.png";
var sortList = [
  sort0,
  sort1,
  sort2
];
import {
  baseUrl,
  boxUrl,
  baseUrl2,
  chartUrl,
  headUrl,
  isNull,
  getQueryString
} from '../common.js';

$(function() {
  initDetailInfoTabContent()
});

function initDetailInfoTabContent() {
  // alert("Sec")
  $.ajax({
    url: baseUrl2 + '/comment/getAgentTraderList.json',
    type: 'GET',
    dataType: 'JSONP',
    data: {
      agentName: "jyj"
    },
    success: function(data) {

      var arr = data.data.traderList;
      // console.log(arr);
      var result = "";
      if (data != undefined && arr.length > 0) {
        for (var i = 0; i < (arr.length > 5 ? 5 : arr.length); i++) {
          var elSortNum = "";
          if (i <= 2) {
            // elSortNum='<img class="sort_nums" src="../img/img_app/sort'+i+'.png" />'
            elSortNum = '<img class="sort_nums" src="' + sortList[i] + '">'
          } else {
            elSortNum = '<span class="sort_tol">' + (i + 1) + '</span>'
          }

          result += '<ul class="list_jyfc">' +
            '<li class="elSortNum">' +
            '<span>' + elSortNum + '</span>' +
            '<img class="nick_header lazy" data-original="' + arr[i].IMG + '" src="' + require("../../../img/img_app/touxiang@2x.png") + '" />' +
            '</li>' +
            '<li class="headerNick">' +
            '<div class="nick_name">' + arr[i].SName + '</div>' +
            '<div>' +
            '<span class="_elWrap">' +
            '<span>' + "跟随数：" + '</span>' +
            '<span>' + arr[i].FollowNumber + '</span>' +
            '</span>' +
            '<span>' +
            '<span>' + "收藏数：" + '</span>' +
            '<span>' + arr[i].FavoritesNumber + '</span>' +
            '</span>'

            +
            '</div>' +
            '<div>' +
            '<span class="_elWrap">' +
            '<span>' + "交易胜率：" + '</span>' +
            '<span>' + arr[i].AllWinRate + '</span>' +
            '</span>' +
            '<span>' +
            '<span>' + "总盈利率" + '</span>' +
            '<span>' + arr[i].AllProfit + '</span>' +
            '</span>' +
            '</div>' +
            '</li>' +
            '</ul>'
        }

        $('.detailInfoChild').html(result);
        $("img.lazy").lazyload();
      } else {
        var noDataImg = '<div class="noImgWrap">' +
          '<img src="' + require("../../../img/img_app/zanwu@2x.png") + '" />' +
          '<p>' + "当前暂无交易员风采" + '<p/>' +
          '<div/>'
        $('.detailInfoChild').html(noDataImg);
      }


    },
    error: function() {
      var noDataImg = '<div class="noImgWrap">' +
        '<img src="' + require("../../../img/img_app/zanwu@2x.png") + '" />' +
        '<p>' + "当前暂无交易员风采" + '<p/>' +
        '<div/>'
      $('.detailInfoChild').html(noDataImg);
    }
  })
}
