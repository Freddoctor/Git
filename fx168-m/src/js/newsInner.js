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

import "jquery";
import "./dropload.min.js"

$(document).ready(function() {

  // minId=data.data.minId;
  //  maxId=data.data.maxId;;//动态加载新闻列表
  // document.getElementById('oli').innerHTML=img;
  var maxId = "",
    minId = "",
    channelId = localStorage.tabUrlIndex;
  var maxId1 = null;
  var minId1 = null;
  var pageSize = 20;
  var pageNo = 1;

  var parsom = {
    "minId": maxId,
    "maxId": minId,
    "channelId": channelId,
    "pageSize": 20,
    "direct": "down"
  };
  $.ajax({
    url: baseUrl + "news/getNewsByChannel.json",
    dataType: "jsonp",
    type: "GET",
    data: parsom,
    success: ajaxGetData
  });
  //上拉加载
  var itemIndex = 0;
  var tab1LoadEnd = false;
  var tab2LoadEnd = false;
  var counter = 0;
  // 每页展示4个
  var num = 20;
  var pageStart = 0,
    pageEnd = 0;
  var dropload = $('#con').dropload({
    scrollArea: window,
    // domDown : {
    //     domClass   : 'dropload-down',
    //     domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
    //     domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
    //     domNoData  : '<div class="dropload-noData">暂无更多评论</div>'
    // },
    loadDownFn: function(me) {
      // 加载菜单一的数据
      // if(itemIndex == '0'){
      $.ajax({
        type: 'GET',
        url: searchUrl + "news/searchAppNews.json",
        data: {
          keyWord: sessionStorage.keyWord,
          pageSize: pageSize,
          pageNo: pageNo
        },
        dataType: 'jsonp',
        success: function(data) {
          pageNo++;
          var arr = data.data.items;
          var arrLen = data.data.items.length;
          var result = '';
          var newsIdArrOli2 = [];


          for (var i = 0; i < arr.length; i++) {
            var substr = arr[i].publishTime.substring(5, 16);
            var substr_title = arr[i].newsTitle.substring(0, 28);
            arr[i].publishTime = substr;
            arr[i].newsTitle = substr_title;
            var newsId = arr[i].id;
            newsIdArrOli2.push(newsId);

          }

          // counter++;
          // pageEnd = num * counter;
          // pageStart = pageEnd - num;

          // if(pageStart <= arr.length){
          for (var i = 0; i < arr.length; i++) {
            result += '<a class="oli2" href="newContent.html">' +
              '<img class="newImg" src="' + arr[i].image + '" alt="">' +
              '<div class="odiv">' +
              '<div class="newsTitle">' +
              '<p class="news_tile_p">' + arr[i].newsTitle + '</p>' +
              '<div class="new_bt">' +
              '<p class="new_bt_p1">' +
              '<img class="clickimg" src="'+ require("../img/lll@2x.png")+'"/>' +
              arr[i].clickNum +
              '</p>' +
              '<p class="new_bt_p2">' + arr[i].publishTime + '</p>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</a>';
            if (arr.length < 20) {
              // 数据加载完
              // tab1LoadEnd = true;
              // 锁定
              me.lock();
              // 无数据
              me.noData();
              break;
            }
          }
          // 为了测试，延迟1秒加载
          setTimeout(function() {
            $('#content').eq(itemIndex).append(result);
            // 每次数据加载完，必须重置
            me.resetload();
            // initClick();
            $(".oli2").click(function() {
              for (var i = 0; i < $(".oli2").length; i++) {
                index = $(this).index();
                newsIdIndex = newsIdArrOli2[index];
              }
              var newsIdURL = newsConetntUrl + "/news/getNews.json?newsId=" + newsIdIndex;
              localStorage.newsIdURLIndex = newsIdURL;
            });


          }, 1000);

          // }

        },
        error: function(xhr, type) {
          // 即使加载出错，也得重置
          me.resetload();
        }
      });

      // }
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
      $('.newImg').eq(i).attr('src', timeArray[i].image);
      if (timeArray[i].image == null || timeArray[i].image == undefined || timeArray[i].image == '') {
        timeArray[i].image = 'img/新闻图@2x.png';

      }

      var newsId = timeArray[i].id;
      newsIdArr.push(newsId);

    }


    $(".oli").click(function() {
      for (var i = 0; i < $(".oli").length; i++) {
        index = $(this).index();
        newsIdIndex = newsIdArr[index];
        window.location.reload();
      }

      var newsIdURL = baseUrl + "/news/getNews.json?newsId=" + newsIdIndex;
      localStorage.newsIdURLIndex = newsIdURL;

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
      str += "<a href='newContent.html' class='oli'>" + num + "</a>";
      //str+="<a href='###' class='oli'></a>";
      img = "<img class='newImg' src='img/新闻图@2x.png'>";
      clickimg = "<img class='clickimg' src='"+ require("../img/lll@2x.png")+"'>";
      div = "<div class='odiv'></div>";
      newsTitle = "<div class='newsTitle'></div>";
      news_tile_p = "<p class='news_tile_p'></p>";
      news_time_div = "<div class='new_bt'></div>";
      new_bt_p1 = "<p class='new_bt_p1'></p>";
      new_bt_p2 = "<p class='new_bt_p2'></p>";

    }


    document.getElementById('content').innerHTML = str;
    $('.oli').html(img);
    $('.oli').append(div);
    $('.odiv').append(newsTitle);
    $('.newsTitle').append(news_tile_p);
    $('.newsTitle').append(news_time_div);
    $('.new_bt').append(new_bt_p1);
    $('.new_bt').append(new_bt_p2);
    $('.new_bt_p1').append(clickimg);
  };

})
