// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

console.log(process.env.NODE_ENV); ///开发环境与生产环境

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadStock from 'highcharts/modules/stock.js'; //highstock引入
loadStock(Highcharts);

import loadHighchartsMore from 'highcharts/highcharts-more.js';
loadHighchartsMore(Highcharts);

import OptionsZhCn from './assets/highcharts-zh_CN.es6.js' //中文数据格式
OptionsZhCn(Highcharts);


// import darkUnica from 'highcharts/themes/dark-unica.js'; //highstock 风格
// darkUnica(Highcharts);

import indicators from 'highcharts/indicators/indicators.js'; // plotOptions新增指数
import ema  from 'highcharts/indicators/ema.js';
import macd from 'highcharts/indicators/macd.js';

import store from './store/index.js';

indicators(Highcharts);
ema(Highcharts);
macd(Highcharts);

Vue.config.productionTip = false;
Vue.prototype.$Highcharts = Highcharts;

Vue.use(ElementUI);
Vue.use(VueHighcharts, { Highcharts });

Date.prototype.Format = function(fmt) {
    const date = this;
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)|(Y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
