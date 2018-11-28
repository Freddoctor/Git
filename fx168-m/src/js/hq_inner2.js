import "jquery";
import "../js/jquery.lazyload.min.js";
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

// import io from 'socket.io-client';
import io from "./socket.io.js";
// import echarts from "echarts";
import echarts from "./echarts.js";
import Highcharts from "./highstock.js"

// 高精度计算
const math = require('mathjs');
var chart = null;
var socket = null;

Highcharts.setOptions({
  global: {
    useUTC: false //取消默认格林威治时间
  },
  lang: {
    contextButtonTitle: "图表导出菜单",
    decimalPoint: ".",
    downloadJPEG: "下载JPEG图片",
    downloadPDF: "下载PDF文件",
    downloadPNG: "下载PNG文件",
    downloadSVG: "下载SVG文件",
    drillUpText: "返回 {series.name}",
    loading: "加载中",
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    noData: "没有数据",
    numericSymbols: ["千", "兆", "G", "T", "P", "E"],
    printChart: "打印图表",
    resetZoom: "恢复缩放",
    resetZoomTitle: "恢复图表",
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    thousandsSep: ",",
    weekdays: ["星期一", "星期二", "星期三", "星期三", "星期四", "星期五", "星期六", "星期天"]
  }
});

function timeFormatter(time) { //ios时间戳
  var date = time;
  date = date.replace(/\-/g, "/");
  return date;
}


function updateChart(res) { //更新分时chart
  var timeRange = sessionStorage.getItem("timeRange");
  if (timeRange) {
    timeRange = JSON.parse(timeRange)
  }
  if (chart && timeRange) {
    var series = chart.series[0];
    var time = timeFormatter(res[res.length - 1]);
    var value = res[0];
    //一分钟定时回执
    var titledata = $(".title_date").attr("data-time");
    var titleMin = Number($(".title_data").attr("data-min"));
    var titleTime = new Date(timeFormatter(titledata)).getTime();
    if (new Date(time) >= new Date(timeRange[0]) && new Date(time) <= new Date(timeRange[1])) {
      drawLine();
      if (new Date(time).getTime() >= (titleTime + 1000 * 60)) {
        chart.series[0].addPoint({
          x: new Date(time).getTime(),
          y: Number(value)
        });
        var dateFirst = Highcharts.dateFormat('%Y/%m/%d %H:%M:00', new Date(time));
        $(".title_date").attr("data-time", dateFirst);
        // 更新最大值 最小值
        updateTickPosition();
      } else {
        var seriesData = chart.series[0].options.data;
        seriesData[seriesData.length - 1] = {
          x: new Date(time).getTime(),
          y: Number(value)
        };
        chart.update({
          series: [{
            name: sessionStorage.getItem("series_title"),
            data: seriesData
          }]
        })
      }
    }
    // chart.series[0].removePoint(series.yData.length-1);
  }
}

function yAxisMinMax() {
  // 最大值最小值实时更新
  var yData = chart.series[0].yData;
  yData.sort();
  var min = yData[0];
  var max = yData[yData.length - 1];
  return {
    max: Number(max),
    min: Number(min)
  }
}

function yAxisRange() {
  // yAxisRange实时运算
  var This = yAxisMinMax();
  var range = Number(math.eval((This.max - This.min) / 8).toFixed(5));
  var minval = parseFloat(This.min.toFixed(2)) < 10 ? parseFloat(This.min) : parseFloat(This.min.toFixed(2));
  var maxval = parseFloat(This.max.toFixed(2)) < 10 ? parseFloat(This.max) : parseFloat(This.max.toFixed(2));
  var average = parseFloat(((minval + maxval) / 2).toFixed(2)) < 10 ? parseFloat((minval + maxval) / 2) : parseFloat(((minval + maxval) / 2).toFixed(2));
  // 保留小数点
  var averageMin = math.eval(minval - range);
  var averageCenter = math.eval(average.toFixed(5));
  var averageMax = math.eval(maxval + range);
  averageMin = averageMin > 10 ? averageMin.toFixed(2) : averageMin.toFixed(5);
  averageCenter = averageCenter > 10 ? averageCenter.toFixed(2) : averageCenter.toFixed(5);
  averageMax = averageMax > 10 ? averageMax.toFixed(2) : averageMax.toFixed(5);
  return [Number(averageMin), Number(averageCenter), Number(averageMax)];
}

function updateTickPosition() {
  chart.update({
    yAxis:{
      tickPositioner: function() {
        return yAxisRange.call(this);
      }
    }
  })
  console.log(chart)
}

function drawLine() {
  // 绘制参考线:
  var points = chart.series[0].points;
  var lastLine = points[points.length - 1];
  chart.update({
    yAxis: {
      plotLines: [{
        value: lastLine.y,
        color: '#0aa20d',
        width: 1,
        label: {
          text: '分时 ' + lastLine.y,
          align: 'right',
          x: 0,
          style: {
            color: '#ff5c01',
            fontWeight: 'bold'
          }
        }
      }]
    }
  })
}

$(function() {
  initinnerSocket();
  socket.on('disconnect', function() {
    var socketUrlArr = ["https://app6.fx168api.com:9091", "https://app7.fx168api.com:9091"]; //行情
    var index_socket = Math.floor((Math.random() * socketUrlArr.length));
    socketUrl = socketUrlArr[index_socket];
    initinnerSocket();
  });
  var selected = 1;
  sessionStorage.hq_inner_left == 0;
  sessionStorage.clickType = "Min01";
  opsetQuoteData();

  sessionStorage.quateJson = 1

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
    $('.sum').css("display", "block");
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
  var x1, y1, ty_left;

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
    $('.sum').css("display", "none");

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
    url: "https://app5.fx168api.com/quotation/getMinHourData.json",
    dataType: "JSONP",
    type: "GET",
    data: {
      // "count": 240,
      // "type": sessionStorage.clickType,
      "code": getUrlParam('key')
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
        "code": getUrlParam('key')

      },
      success: initData
    })
  }
  // 分时图回调函数
  function fillZero(value) { //补零
    var data = parseInt(value);
    if (data < 10) {
      data = "0" + data;
    }
    return data;
  }

  function dateFormat(str) { //highchart 分时时间
    return Highcharts.dateFormat('%H:%M', new Date(str));
  }

  function getMinDataData(data) {
    // console.log(data);
    if (data.data == null) return false;
    var MinDataData = data.data.totalList;
    var MinDataDataArr = []; //收盘价
    var hqMinDate = []; //日期
    var dateStr = "";
    var dataWrap = [];
    var dateArr = [];
    var closeArr = [];
    var newClose = [];
    var dataSort = []; ///时间轴
    var timeRange = data.data.timeRange.split("~");
    timeRange.forEach(function(item, index) {
      return timeRange[index] = item.replace(/\-/g, "/")
    })
    sessionStorage.setItem("timeRange", JSON.stringify([timeRange[0], timeRange[timeRange.length - 1]]));
    var popList = new Array(); //时间区间
    var breaksList = new Array(); //breaks区间
    var breakArr = new Array();
    for (var i = 0; i < timeRange.length; i++) {
      if (2 * i >= timeRange.length) break;
      popList.push([timeRange[2 * i], timeRange[2 * i + 1]])
    }
    if (timeRange.length > 3) {
      for (var i = 0; i < timeRange.length; i++) {
        if (2 * (i + 1) >= timeRange.length) break;
        breaksList.push({
          from: new Date(timeRange[2 * i + 1]).getTime(),
          to: new Date(timeRange[2 * (i + 1)]).getTime()
        })
        breakArr.push([new Date(timeRange[2 * i + 1]).getTime(), new Date(timeRange[2 * (i + 1)]).getTime()])
      }
    }
    for (var i = 0; i < MinDataData.length; i++) {
      hqMinDate.push(MinDataData[i].date);
      var dateStr = MinDataData[i].date;
      var dateArrss = dateStr.split(" ");
      dataSort.unshift((dateStr));
      dateArr.unshift(dateArrss[1]);
      var iosTime = dateStr.replace(/\-/g, "/");
      closeArr.unshift({
        x: new Date(iosTime).getTime(),
        y: parseFloat(MinDataData[i].closePrice)
      });
      newClose.unshift(MinDataData[i].closePrice);
    }

    var sortArr = newClose.sort();
    var max = "";
    var min = "";
    for (var i = 0; i < sortArr.length; i++) {
      min = parseFloat(sortArr[0]);
      max = parseFloat(sortArr[i]);
    }
    // 开始画图
    var version = '3.2.2';
    var dom = document.getElementById("container");
    var breaks = breaksList,
      minQuote = Number(new Date(timeRange[0]).getTime()),
      maxQuote = Number(new Date(timeRange[timeRange.length - 1]).getTime()),
      height = $('#container').height(),
      width = $('#container').width();
    var pointersX = new Array(); //展示x轴坐标数字
    var breakWords = new Array(); // 中断合并数字
    timeRange.forEach(function(item, index) {
      if (index == 0 || (index % 2 != 0)) {
        pointersX.push(new Date(item).getTime());
      }
      if (index == 0) {
        breakWords.push(dateFormat(item));
      } else if (index != 0 && (index % 2 != 0) && (index != (timeRange.length - 1))) {
        breakWords.push(dateFormat(item) + "/" + dateFormat(timeRange[index + 1]));
      } else if (index == (timeRange.length - 1)) {
        breakWords.push(dateFormat(item));
      }
    })

    var rangePercent = sessionStorage.getItem("rangePercent") ? sessionStorage.getItem("rangePercent") : "0.05%"
    var options = {
      chart: {
        borderRadius: 0,
        animation: false,
        backgroundColor: "#0D1219",
        plotBorderColor: '#515151',
        plotBorderWidth: 1,
        spacingTop: 18,
        spacingRight: 18,
        spacingLeft: 18,
      },
      pointersX: pointersX,
      breakArr: breakArr,
      breakWords: breakWords,
      plotOptions: {
        series: {
          lineWidth: 1,
          dataLabels: {
            allowOverlap: true
          },
          getExtremesFromAll: true
        }
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false,
        title: " "
      },
      noData: {
        useHTML: true,
      },
      tooltip: {
        // pointFormat: '<span style="color:{point.color};font-size:18px;display:block;">\u25CF</span><span style="font-size:18px;"> 时分:</span>' +
        //   '<span style="font-size:18px;">{point.y}</span>',
        // split: true,
        borderRadius: 0,
        followTouchMove: true,
        shadow: false,
        borderWidth: 0,
        backgroundColor: 'rgba(10, 162, 13,0.6)',
        shape: "square",
        xDateFormat: '%H:%M',
        useHTML: true,
        headerFormat: '<span style="font-size: 18px">{point.key}</span><br/>',
        pointFormatter: function() {
          var str = '<span style="font-size:18px;">\u25CF</span><span style="font-size:18px;"> 分时:</span>';
          return str + '<span class="concect">' + this.options.y + '</span>'
        },
        style: {
          "color": "#fff",
          "cursor": "default",
          "fontSize": "18px",
          "pointerEvents": "none",
          "whiteSpace": "nowrap"
        }
      },
      xAxis: {
        type: "datetime",
        offset: 0,
        ordinal: false,
        showLastLabel: true,
        tickLength: 0,
        tickPosition: "inside",
        min: minQuote,
        max: maxQuote,
        lineWidth: 0,
        lineColor: "#515151",
        tickWidth: 0,
        tickColor: "#515151",
        gridLineWidth: 0.5,
        gridLineColor: "#515151",
        crosshair: {
          dashStyle: "Solid",
          snap: true,
          color: "#ff5c01"
        },
        endOnTick: true,
        labels: {
          useHTML: false,
          autoRotation: false,
          autoRotationLimit: 0,
          style: {
            'color': '#858585',
            'fontSize': '18px'
          },
          formatter: function(e) {
            var This = options;
            var len = This.pointersX.length;
            if (len == 3) {
              if (this.value == This.pointersX[1]) {
                return This.breakWords[1]
              }
            }
            return Highcharts.dateFormat('%H:%M', this.value)
          }
        },
        breaks: breaks,
        tickPositioner: function() { //显示x轴最终展示的series
          return options.pointersX;
        }
      },
      yAxis: {
        height: '100%',
        title: "",
        offset: 0,
        crosshair: {
          dashStyle: "Solid",
          snap: true,
          color: "#ff5c01"
        },
        lineWidth: 0,
        lineColor: "#515151",
        tickWidth: 0,
        tickColor: "#515151",
        gridLineWidth: 0.5,
        gridLineColor: "#515151",
        labels: {
          y: 0,
          x: 0,
          align: "left",
          style: {
            'color': '#858585',
            'fontSize': '18px'
          },
        },
        plotLines: [{
          color: "#7cb5ec",
          width: 0,
          value: 3133,
          label: {
            text: '分时',
            align: 'right',
            x: 0
          }
        }],
        startOnTick: true,
        tickPosition: "outside",
        tickmarkPlacement: "on",
        endOnTick: true,
        softMin: min,
        softMax: max,
        tickPositioner: function() {
          // var range = Number(math.eval((max - min) / 8).toFixed(5));
          // var minval = parseFloat(min.toFixed(2)) < 10 ? parseFloat(min) : parseFloat(min.toFixed(2));
          // var maxval = parseFloat(max.toFixed(2)) < 10 ? parseFloat(max) : parseFloat(max.toFixed(2));
          // var average = parseFloat(((minval + maxval) / 2).toFixed(2)) < 10 ? parseFloat((minval + maxval) / 2) : parseFloat(((minval + maxval) / 2).toFixed(2));
          // // 保留小数点
          // var averageMin = math.eval(minval - range);
          // var averageCenter = math.eval(average.toFixed(5));
          // var averageMax = math.eval(maxval + range);
          // averageMin = averageMin > 10 ? averageMin.toFixed(2) : averageMin.toFixed(5);
          // averageCenter = averageCenter > 10 ? averageCenter.toFixed(2) : averageCenter.toFixed(5);
          // averageMax = averageMax > 10 ? averageMax.toFixed(2) : averageMax.toFixed(5);
          // return [Number(averageMin), Number(averageCenter),Number(averageMax)]
        },
      },
      credits: {
        enabled: false
      },
      series: [{
        name: sessionStorage.getItem("series_title"),
        data: closeArr
      }]
    };
    chart = Highcharts.chart('container', options);
    ////绘制实时线
    drawLine();
    updateTickPosition();
  }

  var myStart = 70;
  $('.add').click(function() {
    myStart += 5;
    if (myStart >= 100) {
      myStart = 100;
    }
    hq_kAjax();
  })
  $('.jian').click(function() {
    if (myStart <= 0) {
      myStart = 0;
    }
    myStart -= 5;
    hq_kAjax();
  })


  function initData(data) {
    var bigArr = data.data.totalList;
    var arrList = [];
    var dateList = [];
    var arr = [];
    var dataWrap = [];
    var newDate = [];
    var newDateOne = [];
    var vol = [];
    for (var i = 0; i < bigArr.length; i++) {
      var dates = bigArr[i].date;
      var dateArr = dates.split(" ");
      var newDate1 = dates
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
      // newDateOne.unshift(dates);
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
        result.push((sum / dayCount).toFixed(6));
      }

      return result;

    }

    var dom = document.getElementById("container2");
    var myChart = echarts.init(dom);
    opsetQuoteData();
    var option = {
      animation: false,
      // backgroundColor:'#0D1219',
      title: {
        text: '',
        left: 0
      },

      tooltip: {
        triggerOn: 'mousemove',
        trigger: 'axis',
        formatter: function(params) {
          var res = params[0].name;
          res += '<br/>' + params[0].seriesName;
          res += '<br/>  开盘 : ' + params[0].value[0] + '</br>' + '  最高 : ' + params[0].value[3];
          res += '<br/>  收盘 : ' + params[0].value[1] + '</br>' + '  最低 : ' + params[0].value[2];
          return res;
        },
        textStyle: {
          color: 'white',
          decoration: 'none',
          // fontFamily: 'Microsoft YaHei',
          fontSize: 24,
          // fontStyle: 'italic',
          fontWeight: 'bold'
        },
      },
      // legend: {
      //     data: ['KLine', 'MA5','MA10','MA30']
      // },
      grid: [{
        left: '2%',
        right: '7%',
        height: '80%'
      }],
      xAxis: [{
        // offset:100,
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
        splitNumber: 3,
        min: 'dataMin',
        max: 'dataMax'
      }],
      yAxis: [{
        position: 'right',
        splitLine: {
          lineStyle: {
            color: '#1a1e24',
            width: 2
          }
        },
        splitNumber: 3,
        axisLabel: { //调整x轴的lable
          textStyle: {
            fontSize: 20 // 让字体变大
          }
        },
        scale: true,
        splitArea: {
          show: false
        },

      }],
      dataZoom: [{
        disabled: true,

        type: 'inside',
        dataZoomIndex: 100,
        xAxisIndex: [0, 0],
        start: myStart,
        end: 100
      }],
      series: [{

        name: newKey,
        type: 'candlestick',
        data: dataWrap,
        itemStyle: {
          normal: {
            color: '#0D1219',
            color0: '#0AA20D',
            borderColor: '#EC1A1A',
            borderColor0: '#0AA20D',


          }
        },

      }, {
        name: 'MA5',
        type: 'line',
        symbol: 'none',
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
        symbol: 'none',
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
        symbol: 'none',
        data: calculateMA(30),
        smooth: true,
        lineStyle: {
          normal: {
            opacity: 0.5,
            color: 'red'
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
// 获取地址栏参数 s
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
// 获取地址栏参数 e
function opsetQuoteData() {
  $.ajax({
    type: 'GET',
    url: "https://app5.fx168api.com/quotation/getQuotationTradeInfo.json",
    data: {
      "key": getUrlParam('key'),

    },
    dataType: 'jsonp',
    success: getTabListData
  })
}
var newKey = "";

function getTabListData(data) {
  // console.log(data);
  var arr = data.data;
  newKey = arr.name;
  // console.log(newKey)
  sessionStorage.setItem("series_title", arr.keyWord);
  $('.hqIn_title').html(arr.keyWord);
  var Minutes = timeFormatter(arr.date);
  var dateFirst = Highcharts.dateFormat('%Y/%m/%d %H:%M:00', new Date(Minutes));
  console.log(dateFirst)
  $('.title_date').html(arr.date).attr({
    "data-time": dateFirst,
    "data-min": new Date(dateFirst).getMinutes()
  });
  $('.hq_inner_trade').html(arr.tradePrice);
  $('.hq_inner_range').html(arr.range);
  $('.hq_inner_rangePercent').html(arr.rangePercent);
  $('.hq_data_open').html(arr.openPrice);
  $('.hq_data_high').html(arr.highPrice);
  $('.hq_data_preClose').html(arr.preClosePrice);
  $('.hq_data_low').html(arr.lowPrice);
  quateAboutNews();
  sessionStorage.setItem("rangePercent", arr.rangePercent) //range范围
}

function initinnerSocket() {
  // socket 行情请求
  $('.hq_inner_con_Left').attr("data-key", getUrlParam('key'));
  var hq_key = [];
  var hq_value = [];
  socket = io.connect(socketUrl, {
    'reconnect': true
  });

  socket.emit('quotationH5', {
    "secret": "h5Socket",
    "appType": "h5"
  });

  socket.on('quotationPushH5', function(data) {
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
      // 当时间大于等于上一个时间时再赋值
      var stringTime2 = $('.title_date').html();
      var timestamp3 = Date.parse(new Date(stringTime2.replace(/\-/g, "/")));
      timestamp3 = timestamp3 / 1000; //上一个时间
      var stringTime = data[7].replace(/\-/g, "/");
      var timestamp2 = Date.parse(new Date(stringTime));
      timestamp2 = timestamp2 / 1000; //推送的时间
      if (timestamp2 >= timestamp3) {
        $('.title_date').html(data[7]);
        /////////分时实施划线
        updateChart(data);
      }
      sessionStorage.hq_inner_date = data[7];
      sessionStorage.hq_inner_tradePrice = data[0];
      sessionStorage.hq_inner_range = data[5];
      sessionStorage.hq_inner_rangePercent = data[6];
    }


    // $('.hq_List').eq(i).attr("data-key")==hq_key[i]


  });
}

// 相关新闻
function quateAboutNews() {
  $.ajax({
    url: searchUrl + "news/searchAppNews.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      keyWord: newKey,
      pageSize: 3,
      pageNo: 1
    },
    success: quateAboutNewsSuc
  })
}

function quateAboutNewsSuc(data) {
  var arr = data.data.items;
  var result = "";

  //console.log(data)
  var clickimgRes = '';

  for (var i = 0; i < arr.length; i++) {
    var substr = arr[i].publishTime.substring(5, 16);
    var substr_title = arr[i].newsTitle.substring(0, 28);
    arr[i].publishTime = substr;
    arr[i].newsTitle = substr_title;
    var newsId = arr[i].id;
    // newsIdArrOli2.push(newsId);

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
  }

  $('.quateAbout').html(result);
  $("img.lazy").lazyload();
  // $(".oli2").click(function(){
  //     newsIdIndex=$(this).attr("data_newID");
  //     var newsIdURL=baseUrl+"news/getNews.json?newsId="+newsIdIndex;
  //     var clockNewsNumUrl=baseUrl+"news/clickNews.json?newsId="+newsIdIndex;
  //     localStorage.newsIdURLIndex=newsIdURL;
  //     localStorage.clockNewsNum=clockNewsNumUrl;

  // });
}
