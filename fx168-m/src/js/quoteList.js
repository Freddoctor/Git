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
// import io from 'socket.io-client';
import io from "./socket.io.js";
var socket = null;

$(function() {
  // socket 行情请求
  initQuate();
  //断开重连
  // socket.on('disconnect', function() {
  //   var socketUrlArr = [sckUrl1, sckUrl2]; ///行情
  //   var index_socket = Math.floor((Math.random() * socketUrlArr.length));
  //   socketUrl = socketUrlArr[index_socket];
  //   initQuate();
  // });
  // ajax外汇数据请求
  sessionStorage.tabUrlKey == "";
  if (sessionStorage.tabUrlKey == undefined) {
    sessionStorage.tabUrlKey = "wh";
  }
  
  // 加载外汇页面数据
  $.ajax({
    type: 'GET',
    url: baseUrl + "quotation/getQuotationNavConfig.json",
    data: {
      "key": sessionStorage.tabUrlKey,
      "appVersion": "3.1.3",
      "t": ""
    },
    dataType: 'jsonp',
    success: getTabListData
  })

  // 点击tab选下卡
  $(".find_nav_list li").click(function() {
    var index = $(this).index();
    $('.hq_zzc').css("display", "block");
    for (var i = 0; i < $(".find_nav_list li").length; i++) {
      if (index == 0) {
        sessionStorage.tabUrlKey = "wh"; //要闻
      } else if (index == 1) {
        sessionStorage.tabUrlKey = "gjs"; //外汇
      } else if (index == 2) {
        sessionStorage.tabUrlKey = "gz"; //贵金属
      } else if (index == 3) {
        sessionStorage.tabUrlKey = "yy"; //原油
      } else if (index == 4) {
        sessionStorage.tabUrlKey = "jys"; //视屏
      } else if (index == 5) {
        sessionStorage.tabUrlKey = "qh"; //央行
      }
    }
    // ajax栏目列表请求
    $.ajax({
      type: 'GET',
      url: baseUrl + "quotation/getQuotationNavConfig.json",
      data: {
        "key": sessionStorage.tabUrlKey,
        "appVersion": "3.1.3",
        "t": ""
      },
      dataType: 'jsonp',
      success: getTabListData
    })
  });

  var dataListArr = [];
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
  var decimalDigits = [];
  // 回调ajax外汇数据请求success方法
  function getTabListData(data) {
    // console.log(data);
    // 遮罩层隐藏
    var hq_time = setInterval(function() {
      $('.hq_zzc').css("display", "none");
    }, 1500)

    dataListArr = data.data.result;

    var hqListResult = "";
    for (var i = 0; i < dataListArr.length; i++) {
      hqListResult += '<a class="hq_List" data-key=' + dataListArr[i].key + ' href="hq_inner2.html?key=' + dataListArr[i].key + '">' +
        '<div class="hq_nk">' +
        '<p class="hq_name">' + dataListArr[i].name + '<p>' +
        '<p class="hq_key">' + dataListArr[i].key + '<p>' +
        '</div>' +
        '<div class="hq_tradePrice">' +
        '<span>' + dataListArr[i].tradePrice + '</span>' +
        '</div>' +
        '<div class="range">' +
        '<span class="rangeShow1" style="'+  BackgroundGive(dataListArr[i].range) + '">' + dataListArr[i].range + '</span>' +
        '<span class="rangeShow2" style="'+ BackgroundGive(dataListArr[i].range) + '">' + dataListArr[i].rangePercent + '</span>' +
        '</div>' +
        '</a>'
    }

    function BackgroundGive(range){
       if(range < 0) {
         return "background:#119A38";
       }else if(range > 0) {
         return "background:#CE2121";
       }else {
         return "background:#666973"
       }
    }
    // 插入数据列表到content
    $('.content').html("");
    $('.content').append(hqListResult);
    // 判断背景颜色
    // for (var i = 0; i < $('.hq_List').length; i++) {
    //   if ($('.rangeShow1').eq(i).html() < 0) {
    //     $('.rangeShow1').eq(i).css("background", "#119A38");
    //     $('.rangeShow2').eq(i).css("background", "#119A38");
    //   } else if ($('.rangeShow1').eq(i).html() > 0) {
    //     $('.rangeShow1').eq(i).css("background", "#CE2121");
    //     $('.rangeShow2').eq(i).css("background", "#CE2121");
    //   } else {
    //     $('.rangeShow1').eq(i).css("background", "#666973");
    //     $('.rangeShow2').eq(i).css("background", "#666973");
    //   }
    // }
    for (var i = 0; i < dataListArr.length; i++) {
      dateArr.push(dataListArr[i].date); //时间
      titleArr.push(dataListArr[i].name) //标题
      tradePriceArr.push(dataListArr[i].tradePrice) //现价
      rangeArr.push(dataListArr[i].range) //涨跌
      rangePercentArr.push(dataListArr[i].rangePercent) //涨跌幅
      openPriceArr.push(dataListArr[i].openPrice) //今开
      highPriceArr.push(dataListArr[i].highPrice) //最高
      preClosePriceArr.push(dataListArr[i].preClosePrice) //昨收
      lowPriceArr.push(dataListArr[i].lowPrice) //最低
      h1KeyArr.push(dataListArr[i].key) //key
      decimalDigits.push(dataListArr[i].decimalDigits);
    }
  }

  $('.content').on('click','.hq_List', function() {
    for (var i = 0; i < $('.hq_List').length; i++) {
      var index = $(this).index();
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
      sessionStorage.decimalDigits = decimalDigits[index]; //key
    }
  })


  // 点击涨跌幅
  $('.tab_son_zd span').click(function() {
    if ($(this).html() == "涨跌") {
      $(this).html("涨跌幅");
      $('.rangeShow1').css("display", "none");
      $('.rangeShow2').css("display", "inline-block");
    } else {
      $(this).html("涨跌");
      $('.rangeShow2').css("display", "none");
      $('.rangeShow1').css("display", "inline-block");
    }

  })

})


function initQuate() {
  var hq_key = [];
  var hq_value = [];
  // 测试socket  http://123.206.99.244:9091
  socket = io.connect(socketUrl, {
    'reconnect': true
  });

  socket.on('connect', function(data) {
    socket.emit('quotationH5', {
      "secret": "h5Socket",
      "appType": "h5"
    });
  });


  socket.on('quotationPushH5', function(data) {
    var resArr = JSON.parse(data);
    var key1 = null;
    var data = null;

    $.each(resArr, function(key, value) {
      key1 = key;
      data = value;
    })

    var index ;
    for (var i = 0; i < $('.hq_List').length; i++) {
      if ($('.hq_List').eq(i).attr("data-key") == key1) {
        index = i;
        break;
      }
    }

    if (data[0] > $('.hq_List .hq_tradePrice span').eq(index).html()) {
      $('.hq_List .hq_tradePrice span').eq(index).css({
        "background": "rgb(206, 33, 33)"
      });
    } else if (data[0] < $('.hq_List .hq_tradePrice span').eq(index).html()) {
      $('.hq_List .hq_tradePrice span').eq(index).css({
        "background": "rgb(17, 154, 56)"
      });
    }
    if (data[5] > 0) {
      $('.hq_List .rangeShow1').eq(index).css({
        "background": "rgb(206, 33, 33)"
      });
    } else if (data[5] < 0) {
      $('.hq_List .rangeShow1').eq(index).css({
        "background": "rgb(17, 154, 56)"
      });
    }
    if (data[6] > 0) {
      $('.hq_List .rangeShow2').eq(index).css({
        "background": "rgb(206, 33, 33)"
      });
    } else if (data[6] < 0) {
      $('.hq_List .rangeShow2').eq(index).css({
        "background": "rgb(17, 154, 56)"
      });
    }
    $('.hq_List .hq_tradePrice span').eq(index).html(data[0]);

    $('.hq_List .rangeShow1').eq(index).html(data[5]);
    $('.hq_List .rangeShow2').eq(index).html(data[6]);
    var myTime = setTimeout(function() {
      $('.hq_List .hq_tradePrice span').css({
        "background": "none"
      });
    }, 300)
  });
}
