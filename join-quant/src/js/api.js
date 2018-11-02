import "../css/api.scss";

import 'highlight.js/styles/github.css'

import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);

var template = require("../template/api.nav.hbs");
var markdown = require("markdown").markdown;
var parms = {
  data: [{
      title: "API文档",
      children: []
    },
    {
      title: "开始写策略",
      children: [{
        title: "实用的策略"
      }, {
        title: "简单但是完整的策略"
      }]
    }, {
      title: "策略引擎介绍",
      children: [{
          title: "回测环境"
        },
        {
          title: "回测过程"
        },
        {
          title: "数据"
        },
        {
          title: "安全"
        },
        {
          title: "运行频率"
        },
        {
          title: "订单处理"
        },
        {
          title: "拆分合并与分红"
        },
        {
          title: "股息红利税的计算"
        },
        {
          title: "滑点"
        },
        {
          title: "交易税费"
        },
        {
          title: "风险指标"
        },
        {
          title: "运行时间"
        },
        {
          title: "模拟盘注意事项"
        },
        {
          title: "模拟交易和回测的差别"
        },
        {
          title: "期货交割日"
        },
        {
          title: "还券细则"
        },
        {
          title: "投资组合优化器"
        }
      ]
    }, {
      title: "策略引擎介绍",
      children: [{
          title: "回测环境"
        },
        {
          title: "回测过程"
        },
        {
          title: "数据"
        },
        {
          title: "安全"
        },
        {
          title: "运行频率"
        },
        {
          title: "订单处理"
        },
        {
          title: "拆分合并与分红"
        },
        {
          title: "股息红利税的计算"
        },
        {
          title: "滑点"
        },
        {
          title: "交易税费"
        },
        {
          title: "风险指标"
        },
        {
          title: "运行时间"
        },
        {
          title: "模拟盘注意事项"
        },
        {
          title: "模拟交易和回测的差别"
        },
        {
          title: "期货交割日"
        },
        {
          title: "还券细则"
        },
        {
          title: "投资组合优化器"
        }
      ]
    }
  ]
}

import ApiBody from "../template/api.js"; //模拟数据

document.addEventListener("DOMContentLoaded", function() {
  $(".left-nav .nav-wrap").append(template(parms));
  $("#jq-api-content").append(ApiBody.data);
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
