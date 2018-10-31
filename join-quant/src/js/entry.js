// import "../css/bootstrap-markdown-editor.css"
import "../css/b.scss"

import pulgin from "./pulgin.js";
// import marked from "./markdown.js";
var editor = ace.edit("editor");
var editorValue = '\
# 导入函数库\n\
import jqdata\n\
# 初始化函数，设定要操作的股票、基准等等\n\
def initialize(context):\n\
    # 定义一个全局变量, 保存要操作的股票\n\
    # 000001(股票:平安银行)\n\
    g.security = "000001.XSHE"\n\
    # 设定沪深300作为基准\n\
    set_benchmark("000300.XSHG")\n\
    # 开启动态复权模式(真实价格)\n\
    set_option("use_real_price", True)\n\
# 每个单位时间(如果按天回测,则每天调用一次,如果按分钟,则每分钟调用一次)调用一次\n\
def handle_data(context, data):\n\
    security = g.security\n\
    # 获取股票的收盘价\n\
    close_data = attribute_history(security, 5, "1d", ["close"])\n\
    # 取得过去五天的平均价格\n\
    MA5 = close_data["close"].mean()\n\
    # 取得上一时间点价格\n\
    current_price = close_data["close"][-1]\n\
    # 取得当前的现金\n\
    cash = context.portfolio.cash\n\
    # 如果上一时间点价格高出五天平均价1%, 则全仓买入\n\
    if current_price > 1.01*MA5:\n\
        # 用所有 cash 买入股票\n\
        order_value(security, cash)\n\
        # 记录这次买入\n\
        log.info("Buying %s" % (security))\n\
    # 如果上一时间点价格低于五天平均价, 则空仓卖出\n\
    elif current_price < MA5 and context.portfolio.positions[security].closeable_amount > 0:\n\
        # 卖出所有股票,使这只股票的最终持有量为0\n\
        order_target(security, 0)\n\
        # 记录这次卖出\n\
        log.info("Selling %s" % (security))\n\
    # 画出上一时间点价格\n\
    record(stock_price=current_price)\n\
';
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
 * TODO: 图表
 */
var log = {
  "data": {
    "state": "2",
    "logArr": ["2016-09-07 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-08 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-09 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-12 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-13 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-14 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-19 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-20 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-21 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-22 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-27 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-28 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-29 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-09-30 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-10-14 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-10-17 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-10-18 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-10-21 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-10-25 09:30:00 - WARNING - 开仓数量必须是100的整数倍，调整为 10300: Order(security=000001.XSHE mode=OrderValue: _value=95739.35 style=MarketOrderStyle side=long margin=False entrust_time=None)", "2016-10-25 09:30:00 - INFO  - 订单已提交: StockOrder(entrust_id=1540962743 security=000001.XSHE mode=OrderValue: _value=95739.35 style=MarketOrderStyle side=long margin=False entrust_time=2016-10-25 09:30:00 error=)", "2016-10-25 09:30:00 - WARNING - 下单检查标的数量: StockOrder(entrust_id=1540962743 security=000001.XSHE mode=OrderValue: _value=95739.35 style=MarketOrderStyle side=long margin=False entrust_time=2016-10-25 09:30:00 error=开仓数量必须是100的整数倍，调整为 10300)", "2016-10-25 09:30:00 - INFO  - order StockOrder(entrust_id=1540962743 security=000001.XSHE mode=OrderValue: _value=95739.35 style=MarketOrderStyle side=long margin=False entrust_time=2016-10-25 09:30:00 error=开仓数量必须是100的整数倍，调整为 10300) trade price: 9.26, amount:10300, commission: 28.61", "2016-10-25 09:30:00 - INFO  - 订单已委托: StockOrder(entrust_id=1540962743 security=000001.XSHE mode=OrderValue: _value=95739.35 style=MarketOrderStyle side=long margin=False entrust_time=2016-10-25 09:30:00 error=开仓数量必须是100的整数倍，调整为 10300)", "2016-10-25 09:30:00 - INFO  - Buying 000001.XSHE", "2016-10-27 09:30:00 - INFO  - 订单已提交: StockOrder(entrust_id=1540962744 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-10-27 09:30:00 error=)", "2016-10-27 09:30:00 - INFO  - order StockOrder(entrust_id=1540962744 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-10-27 09:30:00 error=) trade price: 9.15, amount:10300, commission: 122.52", "2016-10-27 09:30:00 - INFO  - 订单已委托: StockOrder(entrust_id=1540962744 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-10-27 09:30:00 error=)", "2016-10-27 09:30:00 - INFO  - Selling 000001.XSHE", "2016-10-28 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-10-31 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-01 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-02 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-03 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-04 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-07 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-10 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-18 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-21 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-11-23 09:30:00 - WARNING - 开仓数量必须是100的整数倍，调整为 10100: Order(security=000001.XSHE mode=OrderValue: _value=94455.22 style=MarketOrderStyle side=long margin=False entrust_time=None)", "2016-11-23 09:30:00 - INFO  - 订单已提交: StockOrder(entrust_id=1540962745 security=000001.XSHE mode=OrderValue: _value=94455.22 style=MarketOrderStyle side=long margin=False entrust_time=2016-11-23 09:30:00 error=)", "2016-11-23 09:30:00 - WARNING - 下单检查标的数量: StockOrder(entrust_id=1540962745 security=000001.XSHE mode=OrderValue: _value=94455.22 style=MarketOrderStyle side=long margin=False entrust_time=2016-11-23 09:30:00 error=开仓数量必须是100的整数倍，调整为 10100)", "2016-11-23 09:30:00 - INFO  - order StockOrder(entrust_id=1540962745 security=000001.XSHE mode=OrderValue: _value=94455.22 style=MarketOrderStyle side=long margin=False entrust_time=2016-11-23 09:30:00 error=开仓数量必须是100的整数倍，调整为 10100) trade price: 9.35, amount:10100, commission: 28.33", "2016-11-23 09:30:00 - INFO  - 订单已委托: StockOrder(entrust_id=1540962745 security=000001.XSHE mode=OrderValue: _value=94455.22 style=MarketOrderStyle side=long margin=False entrust_time=2016-11-23 09:30:00 error=开仓数量必须是100的整数倍，调整为 10100)", "2016-11-23 09:30:00 - INFO  - Buying 000001.XSHE", "2016-11-24 09:30:00 - WARNING - 下单失败，初步检查下单数量为0: Order(security=000001.XSHE mode=OrderValue: _value=-8.11000000003 style=MarketOrderStyle side=long margin=False entrust_time=None)", "2016-11-24 09:30:00 - INFO  - Buying 000001.XSHE", "2016-11-25 09:30:00 - WARNING - 下单失败，初步检查下单数量为0: Order(security=000001.XSHE mode=OrderValue: _value=-8.11000000003 style=MarketOrderStyle side=long margin=False entrust_time=None)", "2016-11-25 09:30:00 - INFO  - Buying 000001.XSHE", "2016-11-28 09:30:00 - WARNING - 下单失败，初步检查下单数量为0: Order(security=000001.XSHE mode=OrderValue: _value=-8.11000000003 style=MarketOrderStyle side=long margin=False entrust_time=None)", "2016-11-28 09:30:00 - INFO  - Buying 000001.XSHE", "2016-11-29 09:30:00 - WARNING - 下单失败，初步检查下单数量为0: Order(security=000001.XSHE mode=OrderValue: _value=-8.11000000003 style=MarketOrderStyle side=long margin=False entrust_time=None)", "2016-11-29 09:30:00 - INFO  - Buying 000001.XSHE", "2016-12-01 09:30:00 - INFO  - 订单已提交: StockOrder(entrust_id=1540962746 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-01 09:30:00 error=)", "2016-12-01 09:30:00 - INFO  - order StockOrder(entrust_id=1540962746 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-01 09:30:00 error=) trade price: 9.56, amount:10100, commission: 125.52", "2016-12-01 09:30:00 - INFO  - 订单已委托: StockOrder(entrust_id=1540962746 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-01 09:30:00 error=)", "2016-12-01 09:30:00 - INFO  - Selling 000001.XSHE", "2016-12-02 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-05 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-06 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-07 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-08 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-12 09:30:00 - WARNING - 开仓数量必须是100的整数倍，调整为 9900: Order(security=000001.XSHE mode=OrderValue: _value=96422.37 style=MarketOrderStyle side=long margin=False entrust_time=None)", "2016-12-12 09:30:00 - INFO  - 订单已提交: StockOrder(entrust_id=1540962747 security=000001.XSHE mode=OrderValue: _value=96422.37 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-12 09:30:00 error=)", "2016-12-12 09:30:00 - WARNING - 下单检查标的数量: StockOrder(entrust_id=1540962747 security=000001.XSHE mode=OrderValue: _value=96422.37 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-12 09:30:00 error=开仓数量必须是100的整数倍，调整为 9900)", "2016-12-12 09:30:00 - INFO  - order StockOrder(entrust_id=1540962747 security=000001.XSHE mode=OrderValue: _value=96422.37 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-12 09:30:00 error=开仓数量必须是100的整数倍，调整为 9900) trade price: 9.66, amount:9900, commission: 28.69", "2016-12-12 09:30:00 - INFO  - 订单已委托: StockOrder(entrust_id=1540962747 security=000001.XSHE mode=OrderValue: _value=96422.37 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-12 09:30:00 error=开仓数量必须是100的整数倍，调整为 9900)", "2016-12-12 09:30:00 - INFO  - Buying 000001.XSHE", "2016-12-13 09:30:00 - INFO  - 订单已提交: StockOrder(entrust_id=1540962748 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-13 09:30:00 error=)", "2016-12-13 09:30:00 - INFO  - order StockOrder(entrust_id=1540962748 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-13 09:30:00 error=) trade price: 9.47, amount:9900, commission: 121.88", "2016-12-13 09:30:00 - INFO  - 订单已委托: StockOrder(entrust_id=1540962748 security=000001.XSHE mode=OrderTargetAmount: _amount=0 style=MarketOrderStyle side=long margin=False entrust_time=2016-12-13 09:30:00 error=)", "2016-12-13 09:30:00 - INFO  - Selling 000001.XSHE", "2016-12-14 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-15 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-16 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-19 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-20 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-21 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-22 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-23 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-26 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-27 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-28 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-29 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0", "2016-12-30 09:30:00 - WARNING - Security(code=000001.XSHE) 在 positions 中不存在, 为了保持兼容, 我们返回空的 Position 对象, amount\/price\/avg_cost\/acc_avg_cost 都是 0"],
    "offset": "100"
  },
  "status": "0",
  "code": "00000",
  "msg": ""
}

function loadLog() {
  var logArr = log.data.logArr;
  var dataHtml = "";
  for (var i = 0; i < logArr.length; i++) {
    var detial = logArr[i].split(/\s+-\s+/);
    dataHtml += '<p class="python"><span class="log-date">' + detial[0] + '</span> - \
    <span class="log-warning">' + detial[1] + '</span> - ' + detial[2] + '</p>';
  }
  $(".start-details").addClass("hidden");
  $(".end-details").removeClass("hidden");
  $(".end-details").find("pre").html(dataHtml)
}

$("#time time").click(function() {
  import("./chart.js");
  setTimeout(loadLog, 1000)
})
