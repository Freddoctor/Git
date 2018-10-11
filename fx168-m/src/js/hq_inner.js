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
// var echarts = require("echarts");
// import io from 'socket.io-client';
import io from "./socket.io.js";
// import echarts from "echarts";
import echarts from "./echarts.js";

// sessionStorage.hq_inner_key = sessionStorage.hq_inner_key?sessionStorage.hq_inner_key:"FESEUR";

$(function() {
  var selected = 1;
  sessionStorage.hq_inner_left = 0;
  sessionStorage.pagecount3 = "分时";
  var socket = null;
  $('.hqIn_title').html(sessionStorage.hq_inner_title);
  $('.title_date').html(sessionStorage.hq_inner_date);
  $('.hq_inner_trade').html(sessionStorage.hq_inner_tradePrice);
  $('.hq_inner_range').html(sessionStorage.hq_inner_range);
  $('.hq_inner_rangePercent').html(sessionStorage.hq_inner_rangePercent);
  $('.hq_data_open').html(sessionStorage.hq_inner_openPrice);
  $('.hq_data_high').html(sessionStorage.hq_inner_highPrice);
  $('.hq_data_preClose').html(sessionStorage.hq_inner_preClosePrice);
  $('.hq_data_low').html(sessionStorage.hq_inner_lowPrice);
  sessionStorage.clickType = "Min01";
  // socket 行情请求
  $('.hq_inner_con_Left').attr("data-key", sessionStorage.hq_inner_key)
  var hq_key = [];
  var hq_value = [];
  socket = io.connect(socketUrl, {
    'reconnect': true
  });
  socket.on('connect', function(data) {
    socket.emit('quotationH5', {
      "secret": "h5Socket",
      "appType": "h5"
    });
  });
  socket.on('quotationPushH5', function(data) {;
    var resArr = JSON.parse(data);
    var key1 = null;
    var data = null;
    $.each(resArr, function(key, value) {
      key1 = key;
      data = value;
    })

    if ($('.hq_inner_con_Left').attr("data-key") == key1) {
      $('.hq_inner_trade').html(data[0]);
      $('.hq_inner_range').html(data[5]);
      $('.hq_inner_rangePercent').html(data[6]);
      $('.title_date').html(data[7])
    }
    // $('.hq_List').eq(i).attr("data-key")==hq_key[i]
  });

  // 判断价格的颜色
  if (sessionStorage.hq_inner_range > 0) {
    $('.hq_inner_trade').css("color", "#EC1A1A");
    $('.hq_inner_range').css("color", "#EC1A1A");
    $('.hq_inner_rangePercent').css("color", "#EC1A1A");
    $('.hq_inner_tradeWrap img').attr("src", "" + require("../img/hjt@2x.png"));
  } else {
    $('.hq_inner_trade').css("color", "#0AA20D");
    $('.hq_inner_range').css("color", "#0AA20D");
    $('.hq_inner_rangePercent').css("color", "#0AA20D");
    $('.hq_inner_tradeWrap img').attr("src", "" + require("../img/ljt@2x.png"));
  }
  // tab选项卡
  /*
      tabl选项卡start
      @gcy

  */
  $('.titleBar1').html(sessionStorage.fgTile); //改变标题

  $(".find_nav_list").css("left", sessionStorage.hq_inner_left + "px");

  $(".find_nav_list li").each(function() {
    if ($(this).find("a").text() == sessionStorage.pagecount3) {
      $(".sideline").css({
        left: 0
      });
      $(".sideline").css({
        width: $(this).outerWidth()
      });
      $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
      navName(sessionStorage.pagecount3);
      return false
    } else {
      $(".sideline").css({
        left: 0
      });
      $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
    }
  });
  var nav_w = $(".find_nav_list li").first().width();
  $(".sideline").width(nav_w);
  $(".find_nav_list li").on('click', function() {
    nav_w = $(this).width();
    $(".sideline").stop(true);
    $(".sideline").animate({
      left: $(this).position().left
    }, 300);
    $(".sideline").animate({
      width: nav_w
    });
    $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
    var fn_w = ($(".find_nav").width() - nav_w) / 2;
    var fnl_l;
    var fnl_x = parseInt($(this).position().left);
    if (fnl_x <= fn_w) {
      fnl_l = 0;
    } else if (fn_w - fnl_x <= flb_w - fl_w) {
      fnl_l = flb_w - fl_w;
    } else {
      fnl_l = fn_w - fnl_x;
    }
    $(".find_nav_list").animate({
      "left": fnl_l
    }, 300);
    sessionStorage.hq_inner_left = fnl_l;
    var c_nav = $(this).find("a").text();
    navName(c_nav);
  });
  var fl_w = $(".find_nav_list").width();
  var flb_w = $(".find_nav_left").width();
  var x1,y1,ty_left;
  $(".find_nav_list").on('touchstart', function(e) {
    var touch1 = e.originalEvent.targetTouches[0];
    x1 = touch1.pageX;
    y1 = touch1.pageY;
    ty_left = parseInt($(this).css("left"));
  });
  $(".find_nav_list").on('touchmove', function(e) {
    var touch2 = e.originalEvent.targetTouches[0];
    var x2 = touch2.pageX;
    var y2 = touch2.pageY;
    if (ty_left + x2 - x1 >= 0) {
      $(this).css("left", 0);
    } else if (ty_left + x2 - x1 <= flb_w - fl_w) {
      $(this).css("left", flb_w - fl_w);
    } else {
      $(this).css("left", ty_left + x2 - x1);
    }
    if (Math.abs(y2 - y1) > 0) {
      e.preventDefault();
    }
  });

  function navName(c_nav) {
    switch (c_nav) {
      case "分时":
        sessionStorage.pagecount3 = "分时";
        break;
      case "1小时":
        sessionStorage.pagecount3 = "1小时";
        break;
      case "日线":
        sessionStorage.pagecount3 = "日线";
        break;
      case "周线":
        sessionStorage.pagecount3 = "周线";
        break;
      case "月线":
        sessionStorage.pagecount3 = "月线";
        break;
      case "期货":
        sessionStorage.pagecount3 = "分钟";
        break;
    }
  }
  // table end
  $('.hq_inner_fz').click(function() {
    if ($('.hq_inner_fzx_wrap').css("display") == "none") {
      $('.hq_inner_fzx_wrap').css("display", "block");
    } else if ($('.hq_inner_fzx_wrap').css("display") == "block") {
      $('.hq_inner_fzx_wrap').css("display", "none");
    }
  })

  $('.hq_inner_fzx_wrap ul li').click(function() {
    $('.hq_inner_fzx_wrap').css("display", "none")
    var index = $(this).index();
    $('.hq_inner_fzx_wrap ul li').eq(index).each(function() {
      $('.hq_inner_fz a').html($(this).text());
    })
  })

  for (var i = 0; i < $('.find_nav_list li').length; i++) {
    $('.find_nav_list li').eq(i).click(function() {
      if ($(this).index() < 5) {
        $('.hq_inner_fzx_wrap').css("display", "none");
        $('.hq_inner_fz a').html("分钟");
      }
      if ($(this).index() > 0) {
        $('#container').css("display", "none");
        $('#container2').css("display", "block");
      } else if ($(this).index() == 0) {
        $('#container2').css("display", "none");
        $('#container').css("display", "block");
      }
    })
  }

  $('.min').click(function() {
    sessionStorage.clickType = "Min01";
  })

  $('.hq_hour').click(function() {
    sessionStorage.clickType = "Min60";
    selected = 1;
    hq_kAjax()
  })

  $('.hq_day').click(function() {
    sessionStorage.clickType = "Day";
    selected = 1;
    hq_kAjax()
  })

  $('.hq_week').click(function() {
    sessionStorage.clickType = "Week";
    selected = 4;
    hq_kAjax()
  })

  $('.hq_month').click(function() {
    sessionStorage.clickType = "Month";
    selected = 5;
    hq_kAjax()
  })

  $('.hq_min01').click(function() {
    sessionStorage.clickType = "Min01";
    selected = 1;
    hq_kAjax()
  })

  $('.hq_min03').click(function() {
    sessionStorage.clickType = "Min03";
    selected = 6;
    hq_kAjax()
  })

  $('.hq_min05').click(function() {
    sessionStorage.clickType = "Min05";
    selected = 2;
    hq_kAjax()
  })

  $('.hq_min15').click(function() {
    sessionStorage.clickType = "Min15";
    selected = 2;
    hq_kAjax()
  })

  $('.hq_min30').click(function() {
    sessionStorage.clickType = "Min30";
    selected = 2;
    hq_kAjax()
  })

  //绘图分时图ajax
  $.ajax({
    url: baseUrl + "quotation/getData.json",
    dataType: "JSONP",
    type: "GET",
    data: {
      "count": 240,
      "type": sessionStorage.clickType,
      "code": sessionStorage.hq_inner_key
    },
    success: getMinDataData
  })

  //绘制k线图
  function hq_kAjax() {
    $.ajax({
      url: baseUrl + "quotation/getData.json",
      dataType: "JSONP",
      type: "GET",
      data: {
        "count": 240,
        "type": sessionStorage.clickType,
        "code": sessionStorage.hq_inner_key
      },
      success: initData
    })
  }
  // var chart=$('#container').highcharts();
  // chart.showLoading();
  // 分时图回调函数
  function getMinDataData(data) {
    var MinDataData = data.data.totalList;
    var MinDataDataArr = []; //收盘价
    var hqMinDate = []; //日期
    var dateStr = "";
    var dataWrap = [];
    var dateArr = [];
    var closeArr = [];
    var newClose = [];
    for (var i = 0; i < MinDataData.length; i++) {
      hqMinDate.push(MinDataData[i].date);
      var dateStr = MinDataData[i].date;
      var dateArrss = dateStr.split(" ");
      dateArr.unshift(dateArrss[1]);
      closeArr.unshift(MinDataData[i].closePrice);
      newClose.unshift(MinDataData[i].closePrice);
    }

    var sortArr = newClose.sort();
    var max = "";
    var min = "";
    for (var i = 0; i < sortArr.length; i++) {
      min = sortArr[0];
      max = sortArr[i];
    }
    // 开始画图

    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var option = {
      title: {
        left: 0,
        text: '',
      },
      tooltip: {
        textStyle: {
          color: 'white',
          decoration: 'none',
          fontFamily: 'Verdana, sans-serif',
          fontSize: 30,
          fontStyle: 'italic',
          fontWeight: 'bold'
        },
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        position: function(pt) {
          return [pt[0], '10%'];
        }
      },
      grid: [{
        left: '5%',
        right: '1%'

      }],
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        left: 0,
        type: 'category',
        boundaryGap: false,
        data: dateArr,
        axisLabel: { //调整x轴的lable
          textStyle: {
            fontSize: 20, // 让字体变大
            color: '#3E454D'
          }
        },
      },
      yAxis: {
        axisLabel: { //调整x轴的lable
          textStyle: {
            fontSize: 20, // 让字体变大
            color: '#3E454D'

          }
        },
        splitNumber: 3,
        type: 'value',
        boundaryGap: [0, '100%'],
        min: min,
        max: max
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
      }, {
        start: 0,
        end: 100,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: [{
        name: '',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: '#84b3ff'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#2b3c59',
              opacity: 0.2
            }, {
              offset: 1,
              color: '#2b3c59',
              opacity: 0.2
            }])
          }
        },
        data: closeArr
      }]
    };
    if (option && typeof option === "object") {
      var startTime = +new Date();
      myChart.setOption(option, true); //显示
      var endTime = +new Date();
      var updateTime = endTime - startTime;
    }

  }




  function initData(data) {
    var bigArr = data.data.totalList;
    var arrList = [];
    var dateList = [];
    var arr = [];
    var dataWrap = [];
    var newDate = [];
    var vol = [];
    for (var i = 0; i < bigArr.length; i++) {
      var dates = bigArr[i].date;
      var dateArr = dates.split(" ");
      var newDate1 = dateArr[0]

      var high = bigArr[i].highPrice;
      var open = bigArr[i].openPrice;
      var low = bigArr[i].lowPrice;
      var close = bigArr[i].closePrice;
      var vol1 = bigArr[i].amount;
      dataWrap.unshift([
        parseFloat(open),
        parseFloat(close),
        parseFloat(low),
        parseFloat(high),
        parseFloat(vol1),
      ]);
      newDate.unshift(newDate1);
      vol.unshift(vol1);
    }

    //MA计算公式
    function calculateMA(dayCount) {
      var result = [];
      for (var i = 0, len = newDate.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += dataWrap[i - j][1];
        }
        result.push((sum / dayCount).toFixed(2));
      }
      return result;
    }

    var dom = document.getElementById("container2");
    var myChart = echarts.init(dom);
    var option = {
      // backgroundColor:'#0D1219',
      title: {
        text: '',
        left: 0
      },
      tooltip: {
        textStyle: {
          color: 'white',
          decoration: 'none',
          fontFamily: 'Verdana, sans-serif',
          fontSize: 30,
          fontStyle: 'italic',
          fontWeight: 'bold'
        },
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      // legend: {
      //     data: ['KLine', 'MA5','MA10','MA30']
      // },
      grid: [{
        left: '10%',
        right: '7%',
        height: '55%'
      }, {
        left: '10%',
        right: '7%',
        top: '71%',
        height: '30%'
      }],
      xAxis: [{
        axisLabel: { //调整x轴的lable
          textStyle: {
            fontSize: 20 // 让字体变大
          }
        },
        type: 'category',
        data: newDate,
        scale: true,
        boundaryGap: false,
        axisLine: {
          onZero: false
        },
        splitLine: {
          show: false
        },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      }, {
        type: 'category',
        gridIndex: 1,
        data: newDate,
        axisLabel: {
          show: false
        }
      }],
      yAxis: [{
        axisLabel: { //调整x轴的lable
          textStyle: {
            fontSize: 20 // 让字体变大
          }
        },
        scale: true,
        splitArea: {
          show: false
        },
      }, {
        gridIndex: 1,
        splitNumber: 3,
        axisLine: {
          onZero: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 14 // 让字体变大
          }
        }
      }],
      dataZoom: [{
        type: 'inside',
        dataZoomIndex: 100,
        xAxisIndex: [0, 0],
        start: 80,
        end: 100
      }, {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '97%',
        start: 80,
        end: 100
      }],
      series: [{
        name: 'K线周期图表(matols.com)',
        type: 'candlestick',
        data: dataWrap,
        itemStyle: {
          normal: {
            color: '#EC1A1A',
            color0: '#0AA20D',
            borderColor: '#EC1A1A',
            borderColor0: '#0AA20D'
          }
        },
        markPoint: {
          data: [{
              type: 'max',
              name: '最大值'
            },
            {
              type: 'min',
              name: '最小值'
            }
          ]
        },
      }, {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
          normal: {
            opacity: 0.5,
            color: 'blue'
          }
        }
      }, {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          normal: {
            opacity: 0.5,
            color: 'yellow'
          }
        }
      }, {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30),
        smooth: true,
        lineStyle: {
          normal: {
            opacity: 0.5,
            color: 'red'
          }
        }
      }, {
        name: '成交量',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: vol,
        itemStyle: {
          normal: {
            color: function(params) {
              var colorList;
              if (dataWrap[params.dataIndex][1] > dataWrap[params.dataIndex][0]) {
                colorList = '#ef232a';
              } else {
                colorList = '#14b143';
              }
              return colorList;
            },
          }
        }
      }]
    };
    if (option && typeof option === "object") {
      var startTime = +new Date();
      myChart.setOption(option, true); //显示
      var endTime = +new Date();
      var updateTime = endTime - startTime;
    }
  }
})
