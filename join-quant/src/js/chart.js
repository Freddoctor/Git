import Highcharts from 'highcharts/highstock';
import Exporting from "highcharts/modules/exporting.js";
Exporting(Highcharts);

var seriesOptions = [];
var seriesCounter = 0;
var names = ['MSFT', 'AAPL', 'GOOG'];
var protocol = window.location.protocol;
var defaultOptions = {
  rangeSelector: {
    enabled: false
  },
  lang: {
    contextButtonTitle: "图表导出菜单",
    decimalPoint: ".",
    downloadJPEG: "下载JPEG图片",
    downloadPDF: "下载PDF文件",
    downloadPNG: "下载PNG文件",
    downloadSVG: "下载SVG文件",
    drillUpText: "返回 {series.name}",
    invalidDate: "无效的时间",
    loading: "加载中...",
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    noData: "没有数据",
    numericSymbols: null,
    printChart: "打印图表",
    resetZoom: "重置缩放比例",
    resetZoomTitle: "重置为原始大小",
    shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    thousandsSep: ",",
    weekdays: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    rangeSelectorFrom: "开始时间",
    rangeSelectorTo: "结束时间",
    rangeSelectorZoom: "范围",
    zoomIn: "缩小",
    zoomOut: "放大"
  },
  global: {
    canvasToolsURL: protocol + "//cdn.hcharts.cn/highcharts/modules/canvas-tools.js",
    VMLRadialGradientURL: protocol + +"//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png"
  },
  title: {
    text: '第一个测试数据'
  },
  subtitle: {
    text: '测试苏不提'
  },
  credits: {
    enabled: false
  },
  xAxis: {
    tickInterval: 7 * 24 * 3600 * 1000, // 坐标轴刻度间隔为一星期
    tickWidth: 0,
    gridLineWidth: 1,
    labels: {
      align: 'left',
      x: 3,
      y: -3
    },
    dateTimeLabelFormats: {
      millisecond: "%H:%M:%S.%L",
      second: "%H:%M:%S",
      minute: "%H:%M",
      hour: "%H:%M",
      day: "%Y-%m-%d",
      week: "%Y-%m",
      month: "%Y-%m",
      year: "%Y"
    }
  },
  yAxis: {
    labels: {
      formatter: function() {
        return (this.value > 0 ? ' + ' : '') + this.value + '%';
      }
    },
    plotLines: [{
      value: 0,
      width: 2,
      color: 'silver'
    }]
  },
  plotOptions: {
    series: {
      compare: 'percent',
      dataGrouping: {
        dateTimeLabelFormats: {
          millisecond: ["%Y-%m-%d %H:%M:%S.%L", "%Y-%m-%d %H:%M:%S.%L", " ~ %H:%M:%S.%L"],
          second: ["%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M:%S", " ~ %H:%M:%S"],
          minute: ["%Y-%m-%d %H:%M", "%Y-%m-%d %H:%M", " ~ %H:%M"],
          hour: ["%Y-%m-%d %H:%M", "%Y-%m-%d %H:%M", " ~ %H:%M"],
          day: ["%Y-%m-%d", "%Y-%m-%d", " ~ %Y-%m-%d"],
          week: ["%Y-%m-%d", "%Y-%m-%d", " ~ %Y-%m-%d"],
          month: ["%Y-%m", "%Y-%m", " ~ %Y-%m"],
          year: ["%Y", "%Y", " ~ %Y"]
        }
      }
    },
    ohlc: {
      tooltip: {
        split: false,
        pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>' + "开盘：{point.open}<br/>" + "最高：{point.high}<br/>" + "最低：{point.low}<br/>" + "收盘：{point.close}<br/>"
      }
    },
    candlestick: {
      tooltip: {
        split: false,
        pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>' + "开盘：{point.open}<br/>" + "最高：{point.high}<br/>" + "最低：{point.low}<br/>" + "收盘：{point.close}<br/>"
      }
    }
  },
  tooltip: {
    dateTimeLabelFormats: {
      millisecond: "%H:%M:%S.%L",
      second: "%H:%M:%S",
      minute: "%H:%M",
      hour: "%H:%M",
      day: "%Y-%m-%d",
      week: "%Y-%m-%d",
      month: "%Y-%m",
      year: "%Y"
    },
    split: false,
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
    valueDecimals: 2
  },
  exporting: {
    enabled: false,
    url: protocol + "//export.highcharts.com.cn"
  },
  loading: {
    showDuration: 5000
  },
  credits: {
    text: "点我进去",
    href: "javascript:;"
  },
  series: seriesOptions
}

var createChart = function() {
  Highcharts.stockChart('container', defaultOptions);
};

$.each(names, function(i, name) {
  $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/' + name.toLowerCase() + '-c.json&callback=?', function(data) {
    seriesOptions[i] = {
      name: name,
      data: data
    };
    seriesCounter += 1;
    if (seriesCounter === names.length) {
      createChart();
      $(".highcharts-root").find("text[text-anchor=end]").each(function(i) {
        "Highcharts.com.cn" == $(this).html() && $(this).remove();
      })
    }
  });
});
