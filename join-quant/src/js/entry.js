import "../css/bootstrap-markdown-editor.css"
import "../css/b.scss"

import pulgin from "./pulgin.js";
import marked from "./markdown.js";

var editor = ace.edit("editor");
var editorValue = "";
var data = [{
    key: "test",
    meta: "function test(a,b)",
    value: "test(a,b)",
    score: 100
  },
  {
    key: "after_code_changed",
    meta: "function after_code_changed(context)",
    value: "after_code_changed(context)",
    score: 101
  }
];

editor.setTheme("ace/theme/monokai"); //monokai 主题
editor.setFontSize(16); //设置字体
editor.setValue(editorValue, 1); //设置初始化内容
editor.setKeyboardHandler(""); //设置移动焦点光标 主题
editor.setShowPrintMargin(true);

var langTools = ace.require("ace/ext/language_tools"); //扩展语言包
langTools.addCompleter({
  getCompletions: function(editor, session, pos, prefix, callback) {
    if (prefix.length === 0) {
      return callback(null, []);
    } else {
      return callback(null, data);
    }
  }
});

import python from "./python-ace.js";
editor.getSession().setMode("ace/mode/pythonace"); //自定义语法高亮

editor.getSession().setUseWrapMode(true);
editor.getSession().setUseWorker(false);

editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: false,
  enableLiveAutocompletion: true, //补全代码
});

editor.session.on('change', function(delta) {
  // console.log(editor.getValue())
})

/*
 * TODO: 屏蔽ctrl+s、F11
 */
document.addEventListener('keydown', function(event) {
  var e = window.event || event;
  var keycode = e.keyCode || e.which;
  if (e.ctrlKey && keycode == 83) {
    e.preventDefault();
    window.event.returnValue = false;
  }
  if (e.keyCode == 122) {
    e.preventDefault();
    window.event.returnValue = false;
  }
})

/*
 * TODO: 时间展示
 */
// import moment from 'moment';
// var timeElement = $("#time time");
// setInterval(function() {
//   timeElement.html(moment().format('YYYY-MM-DD HH:mm:ss'));
// }, 1000)


/*
 * TODO: placeholder 文字
 */

import "./ace-placeholder.js";

/*
 * TODO: 用户自定义 ui
 */
import "./ui-setting.js"

/*
 * // TODO: 图表
 */
var seriesOptions = [],
  seriesCounter = 0,
  names = ['MSFT', 'AAPL', 'GOOG'],
  createChart = function() {
    Highcharts.stockChart('container', {
      rangeSelector: {
        enabled: false
      },
      title: {
        text: 'Desktop screen readers from 2009 to 2015'
      },
      subtitle: {
        text: 'Click on point to visit official website'
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
        // 时间格式化字符
        // 默认会根据当前的刻度间隔取对应的值，即当刻度间隔为一周时，取 week 值
        dateTimeLabelFormats: {
          week: '%Y-%m-%d'
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
          compare: 'percent'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2
      },
      series: seriesOptions
    });
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
