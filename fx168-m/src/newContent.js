import "./css/newContent.css"
import "./asset/24k99.scss";

import "jquery";
import "./js/startApp.js"
import {
  sckUrl1,
  sckUrl2,
  socketUrlArr,
  sudiUrlArr,
  baseUrl,
  baseUrlHost,
  socketUrl,
  searchUrl,
  index_socket
} from "./js/common.js";

var lazyload = require("./js/jquery.lazyload.min.js");

var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth / 750;
var ua = navigator.userAgent;
var header = document.getElementsByTagName("head")[0];
if (/Android (\d+\.\d+)/.test(ua)) {
  var version = parseFloat(RegExp.$1);
  if (version > 2.3) {
    $(header).append('<meta name="viewport" content="width=0, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
  } else {
    $(header).append('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">');
  }
} else {
  $(header).append('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');
}

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-47403057-1', 'auto');
ga('require', 'displayfeatures');
ga('require', 'linkid', 'linkid.js');
ga('send', 'pageview');


var _bdhmProtocol = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F779dfdbe4a000d1108b8a1daa23f17bd' type='text/javascript'%3E%3C/script%3E"));


var newsIdIndex = null;
$(document).ready(function() {
  console.log(sessionStorage.news_id)
  var newsIdArraboutNewid = []; //相关新闻id
  var parsom = {};
  var keyWord = "";
  var tile1 = "",
    tile2 = "",
    tile3 = "",
    tile4 = "";
  // 相关新闻
  $.ajax({
    url: localStorage.newsIdURLIndex,
    dataType: "jsonp",
    type: "GET",
    data: parsom,
    async: false,
    success: getNewsInnerData,
    beforeSend: function(data) {
      $('.body').html("加载中...")
      $('.body').css({
        "font-size": "0.32rem",
        "text-aglin": "center"
      })
    }
  });

  // 新闻点击量
  $.ajax({
    url: localStorage.clockNewsNum,
    dataType: "jsonp",
    type: "GET",
    data: parsom,
    success: function(data) {

    },

  });

  // 新闻内页
  function getNewsInnerData(data) {
    // 相关新闻内页
    var res = new Array();
    var res = data.data.result;

    keyWord = res.newsKeywords;
    sessionStorage.keyWord = keyWord;

    $.ajax({
      url: searchUrl + "news/searchAppNews.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        keyWord: sessionStorage.keyWord,
        pageSize: 3,
        pageNo: 1
      },
      success: getAboutNewsData
    })
    var substr = res.publishTime.substring(5, 16);
    res.publishTime = substr;
    var newsCon = res.newsHtmlContent;
    $('body').prepend(newsCon);
    $('.TRS_Editor').prepend("<div class='newsTileWrap'></div>");
    $('.newsTileWrap').append("<div class='newsTile'></div>");
    $('.newsTileWrap').append("<div><span class='source'></span><span class='sourceTime'></span></div>");
    $('.newsTile').html(res.newsTitle);
    $('.source').html(res.newsSource);
    $('.sourceTime').html(res.publishTime);
  }


  // 相关新闻
  function getAboutNewsData(data) {
    $('.downloadMoreNews').show();
    var arr = data.data.items;
    var result = "";
    for (var i = 0; i < arr.length; i++) {
      var substr = arr[i].publishTime.substring(5, 16);
      var substr_title = arr[i].newsTitle.substring(0, 28);
      arr[i].publishTime = substr;
      arr[i].newsTitle = substr_title;
      var newsId = arr[i].id;
      // newsIdArrOli2.push(newsId);
      result += '<a class="oli2" href="/active/article/' + arr[i].id + '.html" data_newID="' + arr[i].id + '">' +
        '<img class="newImg lazy" data-original="' + arr[i].image + '" src="'+ require("./img/newPic@2x.png")+'" alt="">' +
        '<div class="odiv">' +
        '<div class="newsTitle">' +
        '<p class="news_tile_p">' + arr[i].newsTitle + '</p>' +
        '<div class="new_bt">' +
        '<p class="new_bt_p1">' +
        '<img class="clickimg" src="'+ require("./img/lll@2x.png")+'"/>' +
        arr[i].clickNum +
        '</p>' +
        '<p class="new_bt_p2">' + arr[i].publishTime + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</a>';
    }

    $('.about_news_wrap').append(result);
    $("img.lazy").lazyload();
    $(".oli2").click(function() {
      newsIdIndex = $(this).attr("data_newID");
      sessionStorage.news_id = newsIdIndex;

      var newsIdURL = baseUrl + "news/getNews.json?newsId=" + newsIdIndex;
      var clockNewsNumUrl = baseUrl + "news/clickNews.json?newsId=" + newsIdIndex;
      localStorage.newsIdURLIndex = newsIdURL;
      localStorage.clockNewsNum = clockNewsNumUrl;

    });
  }

  console.log(sessionStorage.news_id);

  // 点击顶部关闭按钮关闭app下载banner
  closeTopBanner();
});



function closeTopBanner() {
  $('.close').click(function() {
    $('.wrap').hide();
    $('.TRS_Editor').css('margin-top', "0");
  })
}
