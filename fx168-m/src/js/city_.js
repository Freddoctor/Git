import "jquery";
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
} from "./common.js";

import "./jquery.lazyload.min.js";
import "./dropload.min.js";

$(document).ready(function() {
  $('.moudle').css("height", "0.98rem");
  // var baseUrl="https://app5.fx168api.com/";
  //loadData();//动态加载新闻列表
  // document.getElementById('oli').innerHTML=img;
  var maxId = "",
    minId = "",
    channelId = localStorage.tabUrlIndex;
  var maxId1 = null;
  var minId1 = null;
  var pageSize = 20;

  var parsom = {
    "minId": maxId,
    "maxId": minId,
    "channelId": channelId,
    "pageSize": 20,
    "direct": "down"
  };
  $.ajax({
    //
    url: baseUrl + "news/getNewsByChannel.json",
    dataType: "jsonp",
    type: "GET",
    data: parsom,
    success: ajaxGetData
  });
  //上拉加载

  // 每页展示4个

  var dropload = $('#con').dropload({
    scrollArea: window,
    loadDownFn: function(me) {
      // 加载菜单一的数据
      $.ajax({
        type: 'GET',
        url: baseUrl + "/news/getNewsByChannel.json",
        data: {
          "minId": minId,
          "maxId": maxId,
          "channelId": channelId,
          "pageSize": pageSize,
          "direct": "down"
        },
        dataType: 'jsonp',
        success: function(data) {
          minId = data.data.minId;
          maxId = data.data.maxId;

          var arr = data.data.pager.result;
          var arrLen = data.data.pager.result.length;
          var result = '';
          var newsIdArrOli2 = [];
          var clickimgRes = '';

          for (var i = 0; i < arr.length; i++) {
            var substr = arr[i].publishTime.substring(5, 16);
            var substr_title = arr[i].newsTitle.substring(0, 28);
            arr[i].publishTime = substr;
            arr[i].newsTitle = substr_title;
            var newsId = arr[i].id;
            newsIdArrOli2.push(newsId);
          }

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].hotType && arr[i].hotType != "" && arr[i].hotType != null && arr[i].hotType != undefined) {
              if (arr[i].hotType == 2) {
                clickimgRes = '' + require("../img/img_h5_v.2.0/2d.png")
              } else if (arr[i].hotType == 3) {
                clickimgRes = '' + require("../img/img_h5_v.2.0/3d.png")
              } else if (arr[i].hotType == 4) {
                clickimgRes = '' + require("../img/img_h5_v.2.0/4d.png")
              } else if (arr[i].hotType == 5) {
                clickimgRes = '' + require("../img/img_h5_v.2.0/5d.png")
              }
            }
            result += '<a class="oli2" href="/active/article/' + arr[i].id + '.html" data_newID="' + arr[i].id + '">' +
              '<img class="newImg lazy" data-original="' + arr[i].image + '" src="' + require("../img/newPic@2x.png") + '" alt="">' +
              '<div class="odiv">' +
              '<div class="newsTitle">' +
              '<p class="news_tile_p">' + arr[i].newsTitle + '</p>' +
              '<div class="new_bt">' +
              '<p class="new_bt_p1">' +
              '<img class="clickimg" src="' + clickimgRes + '"/>'

              +
              '</p>' +
              '<p class="new_bt_p2">' + arr[i].publishTime + '</p>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</a>';
            if (arr.length < 20) {

              // 锁定
              me.lock();
              // 无数据
              me.noData();
              break;
            }
          }
          // 为了测试，延迟1秒加载

          $('#content').append(result);
          $("img.lazy").lazyload();
          // 每次数据加载完，必须重置
          me.resetload();
          // initClick();
          $(".oli2").click(function() {
            newsIdIndex = $(this).attr("data_newID");
            var newsIdURL = baseUrl + "news/getNews.json?newsId=" + newsIdIndex;
            var clockNewsNumUrl = baseUrl + "news/clickNews.json?newsId=" + newsIdIndex;
            localStorage.newsIdURLIndex = newsIdURL;
            localStorage.clockNewsNum = clockNewsNumUrl;
          });

        },
        error: function(xhr, type) {
          // 即使加载出错，也得重置
          me.resetload();
        }
      });

    }

  });



  //获取新闻列表数据以及处理数据
  function ajaxGetData(data) {
    minId = data.data.minId;
    maxId = data.data.maxId;

    var newsIdArr = [];
    //日期分割
    var timeArray = new Array();
    var timeArray = data.data.pager.result;
    for (var i = 0; i < timeArray.length; i++) {
      var substr = timeArray[i].publishTime.substring(5, 16);
      var substr_title = timeArray[i].newsTitle.substring(0, 28);
      timeArray[i].publishTime = substr;
      timeArray[i].newsTitle = substr_title;
    }

    for (var i = 0; i < $(".oli").length; i++) {
      // oli[i].innerHTML=data.data.pager.result[i].newsTitle;
      $(".news_tile_p").eq(i).html(timeArray[i].newsTitle);
      $(".new_bt_p1").eq(i).append(timeArray[i].clickNum);
      $(".new_bt_p2").eq(i).html(timeArray[i].publishTime);

      if (timeArray[i].image == null || timeArray[i].image == undefined || timeArray[i].image == '') {
        timeArray[i].image = '' + require("../img/newPic@2x.png");
      }

      $('.newImg').eq(i).attr('src', timeArray[i].image);
      var newsId = timeArray[i].id;
      newsIdArr.push(newsId);
      $('.oli').eq(i).attr("href", "/active/article/" + newsId + ".html");
    }

    $('.upWrap').css("display", "none");
    $(".oli").click(function() {
      for (var i = 0; i < $(".oli").length; i++) {
        index = $(this).index();
        newsIdIndex = newsIdArr[index];
        // window.location.reload();
      }

      var newsIdURL = baseUrl + "/news/getNews.json?newsId=" + newsIdIndex;
      var clockNewsNumUrl = baseUrl + "/news/clickNews.json?newsId=" + newsIdIndex;
      localStorage.newsIdURLIndex = newsIdURL;
      localStorage.clockNewsNum = clockNewsNumUrl;
    });

  };


  //日期分割
  //动态创建标签——新闻列表
  function loadData() {
    var str = "";
    var img = "";
    var div = "";
    var newsTitle = "";
    var news_tile_p = "";
    var news_time_div = "";
    var new_bt_p1 = "";
    var new_bt_p2 = "";
    var num = 0;
    var newsIdURL = '';
    for (var i = 0; i < 20; i++) {
      num++
      str += '<a href="newContent.html" class="oli">' + num + '</a>';
      //str+="<a href='###' class='oli'></a>";
      img = "<img class='newImg' src='" + require("../img/newPic@2x.png") + "'>";
      clickimg = "<img class='clickimg' src='" + require("../img/lll@2x.png") + "'>";
      div = "<div class='odiv'></div>";
      newsTitle = "<div class='newsTitle'></div>";
      news_tile_p = "<p class='news_tile_p'></p>";
      news_time_div = "<div class='new_bt'></div>";
      new_bt_p1 = "<p class='new_bt_p1'></p>";
      new_bt_p2 = "<p class='new_bt_p2'></p>";
    }

    $('#content').prepend(str);
    $('.oli').html(img);
    $('.oli').append(div);
    $('.odiv').append(newsTitle);
    $('.newsTitle').append(news_tile_p);
    $('.newsTitle').append(news_time_div);
    $('.new_bt').append(new_bt_p1);
    $('.new_bt').append(new_bt_p2);
    $('.new_bt_p1').append(clickimg);
  };

  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    if ($('.wrap').css("display") == "none") {
      if (scrollTop >= 200) {
        $('.moudle').css("height", "0.98em");
      } else {
        $('.moudle').css("height", "0rem");
      }
    }

  });
  // 点击顶部关闭按钮关闭app下载banner
  closeTopBanner();
  $('.close').click()

  function closeTopBanner() {
    $('.close').click(function() {
      $('.wrap').hide();
      $('.moudle').css("height", "0");
    })
  }

})
