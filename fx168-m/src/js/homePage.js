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

var $ = require("jquery");
var swiper = require("./swiper.min.js");
import io from 'socket.io-client';
var socket = null;
var lazyload = require("./jquery.lazyload.min.js");
var dropLoad = require("./dropload.min.js");
// 点击顶部关闭按钮关闭app下载banner
$(document).ready(function() {
  // 行情socket
  initQuate();
  //断开重连
  socket.on('disconnect', function() {
    var socketUrlArr = [sckUrl1, sckUrl2]; //行情
    var index_socket = Math.floor((Math.random() * socketUrlArr.length));
    socketUrl = socketUrlArr[index_socket];
    initQuate();
  });
  // 点击隐藏首页头部app下载
  closeTopBanner();
  $('.close').click();
  // 首页新闻banner
  indexPageNewsBanner();
  // 行情轮播
  // initCreatSwiperSlide ();
  // 获取行情轮播图子栏目ajax
  initQuoteBannerSliderAjax();
  // 速递ajax
  sudiAjax();
  // 新闻内容
  newCon();


  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    if ($('.wrap').css("display") == "none") {
      if (scrollTop >= 200) {
        $('.moudle').css("height", "1.79rem");
      } else {
        $('.moudle').css("height", "0rem");
      }
    }

  });


})






var maxId = "",
  minId = "";








// 点击隐藏首页头部app下载
function closeTopBanner() {
  $('.close').click(function() {
    $('.wrap').hide();
    $('.moudle').css("height", "0");

  })
}

function indexPageNewsBanner() {
  $.ajax({
    url: baseUrl + "news/getFocusNewsBanner.json?channelId=1&appType=0&8EEC5E2BCDAEF8D194C9C69B43A1473C",
    dataType: "jsonp",
    type: "GET",
    data: {},
    success: getBannerData

  });

}
// 轮播图回调 start
function getBannerData(data) {
  // console.log(data);
  var bannerArr = [];
  var bannerIdArr = [];
  var length = "";
  var resBannerImage = "";
  for (var i = 0; i < data.data.pager.result.length; i++) {
    var length = data.data.pager.result.length;
    var banner_src = data.data.pager.result[i].image;
    bannerArr.push(banner_src);
    var bannerId = data.data.pager.result[i].id;
    bannerIdArr.push(bannerId);
    resBannerImage += '<a href="/active/article/' + bannerId + '.html" class="swiper-slide bannerSlide1" bannerId="' + bannerId + '">' +
      '<img src="'+ require("../img/newPic@2x.png")+'">' +
      '<div class="slide_font">' +
      '<span>' + '</span>'

      +
      '</div>' +
      '</a>'
  }
  $('.wrapper_ban').html(resBannerImage);
  for (var i = 0; i < $(".wrapper_ban .swiper-slide").length; i++) {
    $(".wrapper_ban .swiper-slide img").eq(i).attr("src", bannerArr[i]);
    $(".slide_font span").eq(i).html(data.data.pager.result[i].newsTitle);


  }
  var swiper = new Swiper('.swiper-container1', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop: true,
    effect: 'fade',
    autoplay: 3500,
    autoplayDisableOnInteraction: false
  });
  var newsIdIndex = null;

  // $('.wrapper_ban a').click(function(){
  //     newsIdIndex=$(this).attr("bannerId");
  //     var newsIdURL=baseUrl+"/news/getNews.json?newsId="+newsIdIndex;

  //     localStorage.newsIdURLIndex=newsIdURL;
  // })
}

// 轮播图回调 end

// 行情轮播start
function initCreatSwiperSlide() {
  var swiper = new Swiper('.swiper-container2', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    // loop : true,
    // effect : 'fade',
    autoplay: 5000,
    autoplayDisableOnInteraction: false
  });
}
// 行情轮播end

function initQuoteBannerSliderAjax() {
  $.ajax({
    url: baseUrl + "/quotation/getQuotationNavConfig.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      key: "h5sy"
    },
    success: QuoteBannerSliderAjaxSuccess

  });
}
// 将silde添加到swoper容器
function QuoteBannerSliderAjaxSuccess(data) {
  // console.log(data);
  var arr = data.data.result;
  var banner_wrap_len = parseInt(arr.length / 3);
  var remainder = arr.length % 3;
  // console.log(remainder);
  if (remainder != 0) {
    banner_wrap_len += 1;
    // console.log(banner_wrap_len)
  }
  // initSlideNum(data,0,3,".swiper-slide_banner1");
  // initSlideNum(data,3,6,".swiper-slide_banner2");
  // initSlideNum(data,6,9,".swiper-slide_banner3");
  var swiper_slidesChild = "";
  for (var i = 0; i < banner_wrap_len; i++) {
    var iNum = i + 1;
    swiper_slidesChild += '<div class="swiper-slide swiper-slide_banner' + iNum + ' ">' +
      '</div>'
  }

  $('.quote_ban').html(swiper_slidesChild);
  initCreatSwiperSlide();
  for (var i = 0; i < banner_wrap_len; i++) {
    var iNum = i + 1;
    var stPage = i * 3;
    var enPage = 3 + (i * 3);
    // console.log(enPage);
    if (enPage > arr.length) {
      enPage = arr.length;
      // console.log(enPage)

    }
    initSlideNum(data, stPage, enPage, ".swiper-slide_banner" + iNum);
  }

  //  initSlideNum(data,0,3,".swiper-slide_banner1");
  // initSlideNum(data,3,6,".swiper-slide_banner2");
}
// 初始化行情轮播slide
function initSlideNum(data, startPage, endPage, continer) {
  var result = "";
  var arr = data.data.result;
  var styleColor = "";

  var banner_wrap_len = arr.length / 3;
  // console.log(banner_wrap_len);


  for (var i = startPage; i < endPage; i++) {
    // console.log(arr[i].range);
    if (arr[i].range > 0) {
      styleColor = "isRed"
    } else if (arr[i].range < 0) {
      styleColor = "isGreen"
    } else {
      styleColor = "isGray"
    }
    sessionStorage.decimalDigits = arr[i].decimalDigits;
    result += '<a class="quote_silder" href="hq_inner2.html?key=' + arr[i].key + '" data-key="' + arr[i].key + '">' +
      '<span class="quote_silder_title ">' + arr[i].name + '</span>' +
      '<span class="quote_silder_tradePrice ' + styleColor + '">' + arr[i].tradePrice + '</span>' +
      '<span class="quote_silder_range">' +
      '<span class="_range_ ' + styleColor + '">' + arr[i].range + '</span>' +
      '<span class="_rangePercent_ ' + styleColor + '">' + arr[i].rangePercent + '</span>' +
      '</span>' +
      '</a>'
  }
  $(continer).html(result);

  $('.quote_silder').click(function() {
    for (var i = 0; i < $('.quote_silder').length; i++) {
      sessionStorage.hq_inner_key = $(this).attr("data-key"); //key

    }
  })
  // 数据迁移
  var dateArr = []; //时间
  var titleArr = [] //标题
  var tradePriceArr = [] //现价
  var rangeArr = []; //涨跌
  var rangePercentArr = []; //涨跌幅
  var openPriceArr = []; //今开
  var highPriceArr = []; //最高
  var preClosePriceArr = [] //昨收
  var lowPriceArr = [] //最低
  var h1KeyArr = []; //key
  for (var i = 0; i < arr.length; i++) {
    dateArr.push(arr[i].date); //时间
    titleArr.push(arr[i].name) //标题
    tradePriceArr.push(arr[i].tradePrice) //现价
    rangeArr.push(arr[i].range) //涨跌
    rangePercentArr.push(arr[i].rangePercent) //涨跌幅
    openPriceArr.push(arr[i].openPrice) //今开
    highPriceArr.push(arr[i].highPrice) //最高
    preClosePriceArr.push(arr[i].preClosePrice) //昨收
    lowPriceArr.push(arr[i].lowPrice) //最低
    h1KeyArr.push(arr[i].key) //key
  }
  $('.quote_silder').click(function() {
    for (var i = 0; i < $('.quote_silder').length; i++) {
      var index = $('.quote_silder').index(this);
      // console.log(index);
      sessionStorage.hq_inner_date = dateArr[index]; //时间
      sessionStorage.hq_inner_title = titleArr[index]; //标题
      sessionStorage.hq_inner_tradePrice = tradePriceArr[index]; //现价
      sessionStorage.hq_inner_range = rangeArr[index]; //涨跌
      sessionStorage.hq_inner_rangePercent = rangePercentArr[index]; //涨跌幅
      sessionStorage.hq_inner_openPrice = openPriceArr[index]; //今开
      sessionStorage.hq_inner_highPrice = highPriceArr[index]; //最高
      sessionStorage.hq_inner_preClosePrice = preClosePriceArr[index]; //昨收
      sessionStorage.hq_inner_lowPrice = lowPriceArr[index]; //最低
      sessionStorage.hq_inner_key = h1KeyArr[index]; //key
    }
  })

}




// 行情socket推送
function initQuate() {
  var hq_key = [];
  var hq_value = [];
  socket = io.connect(socketUrl, {
    'reconnect': true
  }); //'http://123.206.224.250:9091'
  socket.on('connect', function(data) {
    socket.emit('quotationH5Sy', {
      "secret": "h5Socket",
      "appType": "h5Sy"
    });
  });
  socket.on('quotationPushH5Sy', function(data) {
    //.console.log(data)
    var resArr = JSON.parse(data);
    var key1 = null;
    var data = null;
    $.each(resArr, function(key, value) {
      key1 = key;
      data = value;
    })
    for (var i = 0; i < $('.quote_silder').length; i++) {

      if ($('.quote_silder').eq(i).attr("data-key") == key1) {
        if (data[0] > $('.quote_silder_tradePrice').eq(i).html()) {
          $('.quote_silder').eq(i).css({
            "background": "#f9d5d5"
          });
          $('.quote_silder_tradePrice').eq(i).css({
            "color": "#e45555"
          })
          $('._range_').eq(i).css({
            "color": "#e45555"
          })
          $('._rangePercent_').eq(i).css({
            "color": "#e45555"
          })
        } else if (data[0] < $('.quote_silder_tradePrice').eq(i).html()) {
          $('.quote_silder').eq(i).css({
            "background": "#c4eee5"
          });
          $('.quote_silder_tradePrice').eq(i).css({
            "color": "#24b796"
          })
          $('._range_').eq(i).css({
            "color": "#24b796"
          })
          $('._rangePercent_').eq(i).css({
            "color": "#24b796"
          })
        }
        $('.quote_silder_tradePrice').eq(i).html(data[0]);
        $('._range_').eq(i).html(data[5]);
        $('._rangePercent_').eq(i).html(data[6]);
        var myTime = setTimeout(function() {
          $('.quote_silder').css({
            "background": "none"
          });
        }, 300)

      }

    }
  });
}


// 速递ajax
function sudiAjax() {
  $.ajax({
    type: 'GET',
    url: baseUrl + "newsExpress/getData_V2.json",
    data: {
      pageSize: 2,
      firstPubTime: ""
    },
    dataType: 'jsonp',
    success: function(data) {
      //console.log(data);
      var result = "";
      var arr = data.data.result;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].zhiding == true) {
          $('.sudi_big_wrap').show();
          result += '<ul>' +
            '<li>' +
            '<p class="sudi_title">' +
            '<img src="img/img_h5_v.2.0/time@2x.png" />' +
            '<span>' + arr[i].publishTime + '</span>'

            +
            '</p>' +
            '</li>' +
            '<li class="sudi_tabTitle">' + arr[i].title + '</li>' +
            '</ul>'
        }

      }
      $('.sudi_wrap_a').html(result);

    }
  });
}


function newCon() {
  //新闻
  var arr = [];
  var direct = "first";
  var dropload = $('#con').dropload({
    scrollArea: window,
    domDown: {
      domClass: 'dropload-down',
      domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
      domNoData: '<div class="dropload-noData">暂无更多新闻</div>'
    },
    loadDownFn: function(me) {
      $.ajax({
        type: 'GET',
        // url: baseUrl+"news/getNewsByChannel.json",
        url: baseUrl + "news/getMergeNewsByChannel.json",
        data: {
          "minId": minId,
          "maxId": maxId,
          pageSize: 20,
          channelId: 1,
          "direct": direct
        },

        dataType: 'jsonp',
        success: function(data) {
          direct = "down"
          minId = data.data.minId;
          //maxId=data.data.maxId;
          var newArr = data.data.pager.result;
          arr = newArr;
          var result = "";
          var clickimgRes = '';
          // console.log(data)
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].hotType && arr[i].hotType != "" && arr[i].hotType != null && arr[i].hotType != undefined) {
              if (arr[i].hotType == 2) {
                // clickimgRes = 'img/img_h5_v.2.0/2d.png'
                clickimgRes = require("../img/img_h5_v.2.0/2d.png")
              } else if (arr[i].hotType == 3) {
                // clickimgRes = 'img/img_h5_v.2.0/3d.png'
                clickimgRes = require("../img/img_h5_v.2.0/3d.png")
              } else if (arr[i].hotType == 4) {
                // clickimgRes = 'img/img_h5_v.2.0/4d.png'
                clickimgRes = require("../img/img_h5_v.2.0/4d.png")
              } else if (arr[i].hotType == 5) {
                // clickimgRes = 'img/img_h5_v.2.0/5d.png'
                clickimgRes = require("../img/img_h5_v.2.0/5d.png")
              }
            }
            if (arr[i].id) {
              // console.log(i)
              var substr = arr[i].publishTime.substring(5, 16);
              var substr_title = arr[i].newsTitle.substring(0, 28);
              arr[i].publishTime = substr;
              arr[i].newsTitle = substr_title;
              var newsId = arr[i].id;


              result += '<a class="oli2 ' + arr[i].newsTypeCode + '" href="/active/article/' + arr[i].id + '.html" data_newID="' + arr[i].id + '">' +
                '<img class="newImg lazy" data-original="' + arr[i].image + '" src="'+ require("../img/newPic@2x.png")+'" alt="">' +
                '<div class="odiv">' +
                '<div class="newsTitle">' +
                '<p class="news_tile_p">' + arr[i].newsTitle + '</p>' +
                '<div class="new_bt">' +
                '<p class="new_bt_p1">' +
                '<img class="clickimg" src="' + clickimgRes + '"/>'
                // +arr[i].clickNum
                +
                '</p>' +
                '<p class="new_bt_p2">' + arr[i].publishTime + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</a>';
            } else {
              result += '<a class="zhuanti_wrap" href="zhuanti.html?thirdPartyId=' + arr[i].thirdPartyId + '" data_thirdPartyId="' + arr[i].thirdPartyId + '">' +
                '<ul>' +
                '<li class="news_tile_p">' + arr[i].newsTitle + '</li>' +
                '<li class="zhuanti_img_wrap">' +
                '<img class="zhuanti_img lazy" data-original="' + arr[i].newsImage + '" src="'+ require("../img/newPic@2x.png")+'"/>' +
                '<span class="zhuanti_tag">' + arr[i].newsTypeName + '</span>' +
                '</li>'



                +
                '</ul>'

                +
                '</a>'

            }

            // newsIdArrOli2.push(newsId);
            if (arr.length < 20) {
              // 锁定
              me.lock();
              // 无数据
              me.noData();
              break;
            }

          }
          $('#content').append(result);
          $("img.lazy").lazyload();

          // $(".oli2").click(function(){
          //     newsIdIndex=$(this).attr("data_newID");
          //     sessionStorage.news_id=newsIdIndex;
          //     var newsIdURL=baseUrl+"/news/getNews.json?newsId="+newsIdIndex;
          //     var clockNewsNumUrl=baseUrl+"/news/clickNews.json?newsId="+newsIdIndex;
          //     localStorage.newsIdURLIndex=newsIdURL;
          //     localStorage.clockNewsNum=clockNewsNumUrl;

          // });
          $(".zhuanti_wrap").click(function() {
            sessionStorage.zhuanTiId = $(this).attr("data_thirdPartyId");
          });

          // 每次数据加载完，必须重置
          me.resetload();


        }
      })
    }
  })
}
