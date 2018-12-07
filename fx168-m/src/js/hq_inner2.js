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

var socketOrginUrl = socketUrl;
// import io from 'socket.io-client';
import io from "./socket.io.js";
// import echarts from "echarts";
// import echarts from "./echarts.js";
import Highcharts from "./highstock.js"

// 高精度计算
const math = require('mathjs');
var chart = null;
var socket = null;
var Kchart = null;
var max = "";
var min = "";
var LocationElement = {
  timeRange: null,
}

$(function() {

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
      shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月',
        '9月', '10月', '11月', '12月'
      ],
      thousandsSep: ",",
      weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    },
    chart: {
      events: {
        redraw: function() { //重绘回调

        }
      }
    },
  });

  function timeFormatter(time) { //ios时间戳
    var date = time;
    date = date.replace(/\-/g, "/");
    return date;
  }

  function timeDraw(res, timeRange) { //更新点及线操作
    var series = chart.series[0];
    var time = timeFormatter(res[res.length - 1]);
    var value = res[0];
    var titledata = $(".title_date").attr("data-time");
    var titleTime = new Date(timeFormatter(titledata)).getTime();
    // console.log(res);
    if (new Date(time) >= new Date(timeRange[0]) && new Date(time) < new Date(new Date(timeRange[1]).getTime() + 1000 * 60)) {
      if (new Date(time).getTime() >= (titleTime + 1000 * 60)) {
        chart.series[0].addPoint({
          x: new Date(time).getTime(),
          y: Number(value)
        });
        var dateFirst = Highcharts.dateFormat('%Y/%m/%d %H:%M:00', new Date(time));
        $(".title_date").attr("data-time", dateFirst);
      } else {
        var seriesData = chart.series[0].options.data;
        chart.series[0].data[seriesData.length - 1].update({
          x: new Date(time).getTime(),
          y: Number(value)
        })
      }
      drawLine();
      chart.redraw();
    }
  }

  function updateChart(res) { //更新分时chart
    // var timeRange = sessionStorage.getItem("timeRange");
    var timeRange = LocationElement.timeRange;
    if (timeRange) {
      timeRange = JSON.parse(timeRange)
    }
    if (chart && timeRange) {
      timeDraw(res, timeRange);
    }
  }

  function sortyAxisdata() { //实时排序区间分组
    var data = chart.series[0].options.data;
    var sortArr = new Array();
    for (var i = 0; i < data.length; i++) {
      sortArr.push(data[i].y)
    }
    sortArr.sort(function(a, b) {
      return a - b
    });
    min = sortArr[0];
    max = sortArr[sortArr.length - 1];
    return changetickPositions();
  }

  function changetickPositions() {
    var range = Number(math.eval((max - min) / 8).toFixed(5));
    var minval = parseFloat(min.toFixed(2)) < 10 ? parseFloat(min) : parseFloat(min.toFixed(2));
    var maxval = parseFloat(max.toFixed(2)) < 10 ? parseFloat(max) : parseFloat(max.toFixed(2));
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

  function drawLine() {
    // 绘制参考线:
    var points = chart.series[0].points;
    var lastLine = points[points.length - 1];
    var align = (lastLine.plotX < chart.plotWidth / 2) ? "right" : "left";
    chart.update({
      yAxis: {
        plotLines: [{
          zIndex: 99,
          value: lastLine.y,
          id: "draw-plotLine",
          className: "draw-plotline",
          color: '#0aa20d',
          width: 1,
          label: {
            text: '<div class="label-draw-plotline">分时 ' + lastLine.y + '</div>',
            align: align,
            x: 0,
            useHTML: true,
          }
        }],
        tickPositions: sortyAxisdata()
      }

    })

    ///绘制SVG文字部分;
    var render = chart.renderer.label("<div>自定义SVG</div>",
        lastLine.plotX + chart.plotLeft - 20,
        lastLine.plotY + chart.plotTop - 45,
        'callout',
        lastLine.plotX + chart.plotLeft,
        lastLine.plotY + chart.plotTop)
      .css({
        color: '#FFFFFF',
        align: 'center',
      })
      .attr({
        fill: 'rgba(250, 0, 0, 0.75)',
        padding: 8,
        r: 5,
        zIndex: 6
      })
      .add();
    render.destroy();
  }

  TouchDefault();

  function TouchDefault() { //手动离开屏幕消失tip提示
    // $("body").on("touchend", function(e) {
    //   var target = $(e.target).parents("#container");
    //   if (target.length) {
    //     chart.pointer.reset();
    //     chart.pointer.chartPosition = null; // also reset the chart position, used in #149 fix
    //   }
    // })
    $("body").on("touchend", "#container",function(e) {
      chart.pointer.reset();
      chart.pointer.chartPosition = null;
    });
  }

  var selected = 1;
  sessionStorage.hq_inner_left == 0;
  sessionStorage.clickType = "Min01";
  opsetQuoteData();
  initinnerSocket();
  socket.on('disconnect', function() {
    var socketUrlArr = ["https://app6.fx168api.com:9091", "https://app7.fx168api.com:9091"]; //行情
    var index_socket = Math.floor((Math.random() * socketUrlArr.length));
    socketOrginUrl = socketUrlArr[index_socket];
    quotationAjax(); //Highcharts分时图渲染;
    initinnerSocket();
  });
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

  quotationAjax(); //页面首次加载重新渲染;
  // tab选项卡
  /*
      tabl选项卡start
      @gcy

  */
  function initHTML() { //初始化导航点击
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

    //页面初始化记录分时数据
    navName("分时");
    $(".find_nav_list  ul li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur")

    var nav_w = $(".find_nav_list li").first().width();
    $(".sideline").width(nav_w);
    $(".find_nav_list li").click(function() {
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
  }

  initHTML();

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
    if (Kchart) {
      Kchart.destroy();
      Kchart = null;
    }
    quotationAjax();
  })

  $('.hq_hour').click(function() {
    sessionStorage.clickType = "Min60";
    selected = 1;
    if (Kchart) {
      Kchart.destroy();
      Kchart = null;
    }
    hq_kAjax()
  })

  $('.hq_day').click(function() {
    sessionStorage.clickType = "Day";
    selected = 1;
    if (Kchart) {
      Kchart.destroy();
      Kchart = null;
    }
    hq_kAjax()
  })

  $('.hq_week').click(function() {
    sessionStorage.clickType = "Week";
    selected = 4;
    if (Kchart) {
      Kchart.destroy();
      Kchart = null;
    }
    hq_kAjax()
  })

  $('.hq_month').click(function() {
    sessionStorage.clickType = "Month";
    selected = 5;
    if (Kchart) {
      Kchart.destroy();
      Kchart = null;
    }
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
  function quotationAjax() {
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
  }

  //绘制k线图
  function hq_kAjax() {
    $.ajax({
      // url: baseUrl + "quotation/getData.json",
      url: "https://app5.fx168api.com/h5/quotation/getData.json",
      dataType: "JSONP",
      type: "GET",
      data: {
        "count": 240,
        "type": sessionStorage.clickType,
        "code": getUrlParam('key'),
        "minDate": "",
        "maxDate": Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', new Date())
      },
      success: function(data) {
        initData(data, sessionStorage.clickType)
      }
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
    LocationElement.timeRange = JSON.stringify([timeRange[0], timeRange[timeRange.length - 1]]);
    console.log(LocationElement.timeRange);
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

    var sortArr = newClose.sort(function(a, b) {
      return a - b
    });
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

    $(".title_date").attr("data-time", MinDataData[0].date.replace(/\-/g, "/"));
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
        type: 'area',
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
          fillColor: "rgba(33,47,69,0.89)",
          getExtremesFromAll: true,
          symbol: "none"
        },
        marker: {
          radius: 3,
          symbol: 'circle',
          fillColor: 'white',
          lineColor: '#001dbc',
          lineWidth: 2,
          symbol: "none",
          border: 1,
          states: {
            hover: {
              radius: 5,
              fillColor: 'red',
              lineColor: 'black', // 黑圈 试试修改为空值 或者将states整个注释掉
              lineWidth: 4,
              border: 1
            }
          }
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
        enabled: true,
        headerFormat: '<span style="font-size: 18px">{point.key}</span><br/>',
        pointFormatter: function() {
          var str = '<span style="font-size:18px;">\u25CF</span><span style="font-size:18px;"> 分时:</span>';
          return str + '<span class="concect">' + this.options.y + '</span>'
        },
        crosshairs: [true, true],
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
          className: "Crosshair-Music",
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
          color: "#ff5c01",
          className: "Crosshair-Music",
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
          id: "draw-plotLine",
          color: "#7cb5ec",
          width: 0,
          value: 3133,
          className: "draw-plotline",
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
        tickPositioner: function() { //实时注册ticpositioner区间 (每绘一次执行一次)
          return changetickPositions();
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
    console.log(chart)
  }

  function initData(data, type) {
    if (chart) {
      chart.destroy();
      chart = null;
    }
    if (!data.data) return false;
    console.log(type);
    if ((type.indexOf("Min") != -1) || (type.indexOf("Day") != -1)) {
      $(".title_date").attr("data-kchartime", data.data.maxDate.replace(/\-/g, "/"));
    } else if (type.indexOf("Week") != -1) {
      $(".title_date").attr("data-weektime", data.data.maxDate.replace(/\-/g, "/"));
      weekMonRest(); //强制设置周一 00:00:00
    } else if (type.indexOf("Month") != -1) {
      $(".title_date").attr("data-monthtime", data.data.maxDate.replace(/\-/g, "/"));
    }
    var bigArr = data.data.totalList;
    var arrList = [];
    var dateList = [];
    var arr = [];
    var dataWrap = [];
    var newDate = [];
    var newDateOne = [];
    var vol = [];
    var Karray = new Array();
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
      vol.unshift(vol1);
      var iostimeFomat = timeFormatter(bigArr[i].date);
      // Karray.unshift({
      //   x: new Date(iostimeFomat).getTime(),
      //   open: parseFloat(bigArr[i].openPrice),
      //   high: parseFloat(bigArr[i].highPrice),
      //   low: parseFloat(bigArr[i].lowPrice),
      //   close: parseFloat(bigArr[i].closePrice),
      // })
      Karray.unshift([
        new Date(iostimeFomat).getTime(),
        parseFloat(bigArr[i].openPrice),
        parseFloat(bigArr[i].highPrice),
        parseFloat(bigArr[i].lowPrice),
        parseFloat(bigArr[i].closePrice),
      ])
    }
    hourChart(Karray);
  }

  function calculateMA(dayCount, data) { //MA线计算
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount - 1) {
        continue;
      }
      var sum = 0;
      var dataList = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data[i - j][4];
        dataList = data[i][0]
      }
      result.push([dataList, parseFloat(math.eval(sum / dayCount).toFixed(5))]);
    }
    return result;
  }

  function hourChart(data) {
    //时间戳, 开盘价, 最高价, 最低价, 收盘价 [1147651200000, 67.37, 68.38, 67.12, 67.79],
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
        panning: true,
        pinchType: 'x',
        resetZoomButton: {
          position: {
            y: -1000
          }
        }
      },
      navigator: { //导航区域显示
        enabled: false,
        adaptToUpdatedData: true,
      },
      scrollbar: { //导航条显示
        liveRedraw: true,
        enabled: false,
        barBackgroundColor: 'gray',
        barBorderRadius: 7,
        barBorderWidth: 0,
        height: 24,
        buttonBackgroundColor: 'gray',
        buttonBorderWidth: 0,
        buttonBorderRadius: 7,
        trackBackgroundColor: 'none',
        trackBorderWidth: 1,
        trackBorderRadius: 8,
        trackBorderColor: '#CCC'
      },
      plotOptions: {
        series: {
          lineWidth: 1,
          dataLabels: {
            allowOverlap: true
          },
        },
        getExtremesFromAll: true,
      },
      // rangeSelector: {},
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        borderRadius: 0,
        followTouchMove: false,
        shadow: false,
        borderWidth: 0,
        backgroundColor: 'rgba(10, 162, 13,0.6)',
        shape: "square",
        xDateFormat: '%y-%m-%d %H:%M',
        useHTML: true,
        enabled: true,
        headerFormat: '<span style="font-size: 13px">{point.key}</span><br/>',
        crosshairs: [true, true],
        style: {
          "color": "#fff",
          "cursor": "default",
          "fontSize": "13px",
          "pointerEvents": "none",
          "whiteSpace": "nowrap"
        }
      },
      xAxis: {
        minRange: 0,
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%m-%d',
          week: '%m-%d',
          month: '%y-%m',
          year: '%Y'
        },
        lineWidth: 0,
        lineColor: "#515151",
        tickWidth: 0,
        tickColor: "#515151",
        gridLineWidth: 0.5,
        gridLineColor: "#515151",
        ordinal: true,
        labels: {
          useHTML: false,
          autoRotation: false,
          autoRotationLimit: 0,
          style: {
            'color': '#858585',
            'fontSize': '16px'
          },
          formatter: function(e) {
            return Highcharts.dateFormat('%Y-%m-%d %H:%M', this.value)
          },
          step: 4
        },
      },
      yAxis: [{
        title: {
          text: ''
        },
        offset: 0,
        tickAmount: 3,
        tickPosition: "inside",
        tickmarkPlacement: "on",
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
        labels: {
          y: 0,
          x: 0,
          align: "right",
          style: {
            'color': '#858585',
            'fontSize': '18px'
          },
        },
        plotLines: [{
          id: "draw-KLine",
          color: "#7cb5ec",
          width: 0,
          value: 96.9,
          className: "draw-plotline",
          label: {
            text: '分时',
            align: 'right',
            x: 0
          }
        }],
        height: '100%',
        lineWidth: 0,
        lineColor: "#515151",
        tickWidth: 0,
        tickColor: "#515151",
        gridLineWidth: 0.5,
        gridLineColor: "#515151",
      }],
      series: [{
        type: 'candlestick',
        name: sessionStorage.getItem("series_title"),
        color: 'green',
        lineColor: 'green',
        upColor: '#0d1219',
        upLineColor: 'red',
        data: data,
        // rangeSelector: {
        //   enabled: true
        // },
        // exporting: {
        //   enabled: false
        // },
        // navigator: {
        //   enabled: true
        // },
        // scrollbar: {
        //   enabled: true
        // },
        // credits: {
        //   enabled: false
        // },
        dataGrouping: {
          enabled: false,
        },
        // showInNavigator: false
      }, {
        name: 'MA5',
        type: 'spline',
        color: "#0D58A6",
        data: calculateMA(5, data),
        lineWidth: 1,
        dataGrouping: {
          enabled: false
        },
      }, {
        name: 'MA10',
        type: 'spline',
        color: "#E5FB00",
        data: calculateMA(10, data),
        lineWidth: 1,
        dataGrouping: {
          enabled: false
        },
      }, {
        name: 'MA30',
        type: 'spline',
        color: "#FB000D",
        data: calculateMA(30, data),
        lineWidth: 1,
        dataGrouping: {
          enabled: false
        },
      }]
    };
    var rangeMax = data.length - parseInt(data.length / 4)
    Kchart = Highcharts.stockChart('container2', options, function(c) {
      // 动态改变 x 轴范围即可实现拖动
      c.xAxis[0].setExtremes(data[rangeMax][0], data[data.length - 1][0]);
    });
    drawKchartLine();
  }

  function drawKchartLine() { //动态绘制参考线
    var yData = Kchart.series[0].yData;
    var lastLine = yData[yData.length - 1];
    Kchart.update({
      yAxis: {
        plotLines: [{
          zIndex: 99,
          value: lastLine[3],
          id: "draw-plotLine",
          className: "draw-plotline",
          color: '#0aa20d',
          width: 1,
          label: {
            text: '<div class="label-draw-plotline">CLOSE: ' + lastLine[3] + '</div>',
            align: "left",
            x: 0,
            useHTML: true,
          }
        }],
      }
    })
  }

  function typeKey(type) { //分钟、小时、周、日、月类型判断
    var typeMinute = null;
    var typeWeek = null;
    var typeMonth = null;
    switch (type) {
      case "Min01":
        typeMinute = 1;
        break;
      case "Min03":
        typeMinute = 3;
        break;
      case "Min05":
        typeMinute = 5;
        break;
      case "Min15":
        typeMinute = 15;
        break;
      case "Min30":
        typeMinute = 30;
        break;
      case "Min60":
        typeMinute = 60;
        break;
      case "Day":
        typeMinute = 24 * 60;
        break;
      case "Week":
        typeWeek = 1;
        break;
      case "Month":
        typeMonth = 1;
        break;
    }
    return {
      minute: typeMinute,
      week: typeWeek,
      month: typeMonth
    }
  }

  function timeKchartLine(res) { ///分钟线K线
    if (!Kchart) return false;
    var clickType = sessionStorage.getItem("clickType")
    var minute = typeKey(clickType).minute;
    var week = typeKey(clickType).week;
    var month = typeKey(clickType).month;
    if (minute) {
      minuteKchartLine(res, minute);
    }
    if (week) {
      weekKchartLine(res);
    }
    if (month) {
      monthKchartLine(res);
    }
    MaLineDraw(); //绘制MA线
    drawKchartLine(); //绘制参考线
    Kchart.redraw();
  }

  function minuteKchartLine(res, minute) { //分钟、小时、天绘制
    var series = Kchart.series[0];
    var titledata = $(".title_date").attr("data-kchartime");
    var time = timeFormatter(res[res.length - 1]);
    var value = parseFloat(res[0]);
    var titleTime = new Date(timeFormatter(titledata)).getTime();
    if (new Date(time) >= (titleTime + minute * 1000 * 60)) {
      Kchart.series[0].addPoint([
        new Date(time).getTime(), parseFloat(value), parseFloat(value), parseFloat(value), parseFloat(value)
      ], false)
      var dateFirst = Highcharts.dateFormat('%Y/%m/%d %H:%M:00', new Date(time));
      $(".title_date").attr("data-kchartime", dateFirst);
    } else {
      // 时间戳, 开盘价, 最高价, 最低价, 收盘价
      var seriesData = Kchart.series[0].options.data;
      var dataArr = KLineAreaSort(seriesData, time, value);
      // Kchart.series[0].data[seriesData.length - 1].update(dataArr, false);
      Kchart.series[0].removePoint(seriesData.length - 1, false);
      Kchart.series[0].addPoint(dataArr, false);
    }
  }

  function weekMonRest() { //dataweek时间坐标周一重置
    var titledata = $(".title_date").attr("data-weektime"); //当前获取最大时间maxDate
    var dateFirst = setMonDate(titledata)
    $(".title_date").attr("data-weektime", dateFirst);
  }

  function setMonDate(time) { //强制设置为周一方法
    var RefTime = new Date(timeFormatter(time));
    var weekDay = RefTime.getDay();
    var dValue = 0;
    if (weekDay == 0) {
      dValue = 6;
    } else {
      dValue = weekDay - 1;
    }
    var monDate = new Date(RefTime - dValue * 24 * 60 * 60 * 1000) //周一的00:00:00
    var getMonday = Highcharts.dateFormat('%Y/%m/%d 00:00:00', monDate);
    return getMonday;
  }

  function weekKchartLine(res) { //周绘制
    var series = Kchart.series[0];
    var titledata = $(".title_date").attr("data-weektime");
    var time = timeFormatter(res[res.length - 1]);
    var value = parseFloat(res[0]);
    var titleTime = new Date(timeFormatter(titledata)).getTime();
    if (new Date(time) >= (titleTime + 7 * 24 * 60 * 60 * 1000)) {
      Kchart.series[0].addPoint([
        new Date(time).getTime(), parseFloat(value), parseFloat(value), parseFloat(value), parseFloat(value)
      ], false)
      var dateFirst = setMonDate(time);
      $(".title_date").attr("data-weektime", dateFirst);
    } else {
      // 时间戳, 开盘价, 最高价, 最低价, 收盘价
      var seriesData = Kchart.series[0].options.data;
      var dataArr = KLineAreaSort(seriesData, time, value);
      Kchart.series[0].removePoint(seriesData.length - 1, false);
      Kchart.series[0].addPoint(dataArr, false);
    }
  }

  function monthKchartLine(res) { //月绘制
    var series = Kchart.series[0];
    var titledata = $(".title_date").attr("data-monthtime");
    var time = timeFormatter(res[res.length - 1]);
    var value = parseFloat(res[0]);
    var titleTime = new Date(timeFormatter(titledata)).getMonth();
    if (new Date(time).getMonth() != titleTime) {
      Kchart.series[0].addPoint([
        new Date(time).getTime(), parseFloat(value), parseFloat(value), parseFloat(value), parseFloat(value)
      ], false)
      $(".title_date").attr("data-monthtime", time);
    } else {
      // 时间戳, 开盘价, 最高价, 最低价, 收盘价
      var seriesData = Kchart.series[0].options.data;
      var dataArr = KLineAreaSort(seriesData, time, value);
      Kchart.series[0].removePoint(seriesData.length - 1, false);
      Kchart.series[0].addPoint(dataArr, false);
    }
  }

  function MaLineDraw() { //MA线绘制
    var seriesData = Kchart.series[0].options.data;
    var ma5data = calculateMA(5, seriesData);
    var ma10data = calculateMA(10, seriesData);
    var ma30data = calculateMA(30, seriesData);
    Kchart.series[1].setData(ma5data, false);
    Kchart.series[2].setData(ma10data, false);
    Kchart.series[3].setData(ma30data, false);
  }

  function KLineAreaSort(seriesData, time, value) { //socket数据流K线判断值
    // 时间戳, 开盘价, 最高价, 最低价, 收盘价
    var kEndData = seriesData[seriesData.length - 1];
    var arrPrice = [
      kEndData[1], kEndData[2], kEndData[3], kEndData[4]
    ];
    Math.max.apply(null, arrPrice);
    Math.min.apply(null, arrPrice);
    var maxPrice = value > kEndData[2] ? value : kEndData[2];
    var minPrice = value < kEndData[3] ? value : kEndData[3];
    var closePrice = parseFloat(value);
    return [new Date(time).getTime(), kEndData[1], maxPrice, minPrice, closePrice]
  }

  function KLineXtickPos(seriesData, time) { //x轴tickpostion
    Kchart.update({
      xAxis: {
        tickPositions: KLineXtickPos()
      }
    })
  }

  function KLineYtickPos() { //y轴tickpostion
    Kchart.update({
      yAxis: {
        tickPositions: KLineYtickPos()
      }
    })
  }
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
    socket = io.connect(socketOrginUrl, {
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
        if (data[0].indexOf("-") != -1) {
          quotationAjax()
        }
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
          /////////分时实时划线
          updateChart(data);
          timeKchartLine(data) //K线;
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
    var clickimgRes = '';

    for (var i = 0; i < arr.length; i++) {
      var substr = arr[i].publishTime.substring(5, 16);
      var substr_title = arr[i].newsTitle.substring(0, 28);
      arr[i].publishTime = substr;
      arr[i].newsTitle = substr_title;
      var newsId = arr[i].id;

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
  }
})
