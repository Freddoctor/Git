var $ = require('jquery');
import Highcharts from './highstock.js';
import {
  baseUrl,
  boxUrl,
  baseUrl2,
  chartUrl,
  headUrl,
  isNull,
  getQueryString
} from '../js/js_app/common.js';

require("./md5.js");
require("./js_app/jquery.lazyload.min.js");

import point2x from "../img/box_bigIpad/point@2x.png";
import touxiang2x from "../img/touxiang@2x.png";
import bigIpadoz from "../img/box_bigIpad/oz.png";
import qiehuanzhankai2x from "../img/box_bigIpad/qiehuanzhankai@2x.png";

import biaoshi2x from "../img/box_bigIpad/biaoshi@2x.png";
import bigIpad12x from "../img/box_bigIpad/1@2x.png";
import bigIpad22x from "../img/box_bigIpad/2@2x.png";
import bigIpad32x from "../img/box_bigIpad/3@2x.png";
import bigIpaddg from "../img/box_bigIpad/dg.png";
import bigIpadmg from "../img/box_bigIpad/mg.png";
import bigIpadfg from "../img/box_bigIpad/fg.png";
import bigIpadydl from "../img/box_bigIpad/ydl.png";

import shouqi2x from '../img/box_bigIpad/shouqi@2x.png';

import bigIpadrb from '../img/box_bigIpad/rb.png';
import bigIpadzg from '../img/box_bigIpad/zg.png';
import bigIpadyg from '../img/box_bigIpad/yg.png';
import bigIpadjnd from '../img/box_bigIpad/jnd.png';
import bigIpadadly from '../img/adly@2x.png';
import bigIpadxg from '../img/box_bigIpad/xg.png';
import bigIpadhg from '../img/box_bigIpad/hg.png';
import bigIpadxjp from '../img/box_bigIpad/xjp.png';
import bigIpadrs from '../img/box_bigIpad/rs.png';
import bigIpadxxl from '../img/box_bigIpad/xxl.png'
import bigIpadtw from '../img/box_bigIpad/tw.png'


$(function() {
  dbClick()
  // alert(window.location.href)
  // alert(symbol)
  $('.silder').css("width", $(this).find('a').outerWidth());
  initTabInfo();
  chartAjax()

  // console.log($.md5(now+"admin"));
  // console.log(now)

  // 数据列表ajax
  dataList();
  // // 点击列表显示图标
  // clickList ()
  // 列表tab

  // 独家资金面三角定位
  var l_sanjiao = $('.boderRed').outerWidth();
  var san = $('.sanjiao').outerWidth()
  // console.log(san)
  // console.log(l_sanjiao)
  $(".sanjiao").css({
    left: "54%",
    top: "12px"
  })

  // 独家资金面 ajax方法
  duoDaNAjax();
  // 高手交易实时动态 ajax 方法
  transaction();

  dcChartAjax();

  articleAjax();

  organizationViewpoint();

  $('.highcharts-point').attr("stroke", "red");
  // checkScreenFrame();


})

///与app交互window暴露接口
window.p = p;
window.initTabInfo = initTabInfo;
window.initTabInfo2 = initTabInfo2;
window.charts = charts;
window.chartAjax = chartAjax;
window.dataList = dataList;
window.getDataList = getDataList;
window.tableAjax = tableAjax;
window.cliclTableTabAjax = cliclTableTabAjax;
window.duoDaNAjax = duoDaNAjax;
window.transaction = transaction;
window.dcChartAjax = dcChartAjax;
window.articleAjax = articleAjax;
window.organizationViewpoint = organizationViewpoint;
window.brokenLineChart = brokenLineChart;
window.drawBrokenLine = drawBrokenLine;
window.headportrait = headportrait;
window.Androidnews = Androidnews;
window.Iosnews = Iosnews;
window.clickNews = clickNews;
window.getDateDiff = getDateDiff;
window.getByteLen = getByteLen;
window.getUrlParam = getUrlParam;
window.getSymbol = getSymbol;
window.getScreen = getScreen;
window.backNews = backNews;
window.changeURLArg = changeURLArg;
window.dbClick = dbClick;

// 品种
var symbol = "EURUSD";
//var symbol=getUrlParam('code');
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// // 获取当前时间
function p(s) {
  return s < 10 ? '0' + s : s;
}

var myDate = new Date();
//获取当前年
var year = myDate.getFullYear();
//获取当前月
var month = myDate.getMonth() + 1;
//获取当前日
var date = myDate.getDate();
var h = myDate.getHours(); //获取当前小时数(0-23)
var m = myDate.getMinutes(); //获取当前分钟数(0-59)
var s = myDate.getSeconds();

var now = year + p(month) + p(date) + p(h) + p(m) + p(s);
var nowMd5 = $.md5(now + "admin");
//头部 tab选项卡 s
function initTabInfo() {
  //点击选中tab
  $('.tabNav').click(function(e) {
    var index = $(this).index();
    e.preventDefault();
    // console.log(index);
    // console.log(index);
    $('.tabNav a').removeClass('selected');
    $(this).find($('a')).addClass('selected');
    $('.content ul .isShowLi').addClass('isHide');
    $('.content ul .isShowLi').eq(index).addClass('isShow');
    $('.content ul .isShowLi').eq(index).removeClass('isHide');
    $('.silder').css("width", $(this).find('a').outerWidth());
    $('.silder').animate({
      "width": $(this).find('a').outerWidth(),
      "left": $(this).find('a').offset().left
    }, 200);

  });
}
//头部 tab选项卡 e

//列表 tab选项卡 s
function initTabInfo2() {
  //点击选中tab
  $(".tabNav2").click(function(e) {
    e.preventDefault();
    var index = $(this).index();
    // console.log(index);
    $(this).prev().find('a').removeClass('selBg');
    $(this).siblings().find('a').removeClass('selBg');
    $(this).find($('a')).addClass('selBg');
    $(this).parent().next().animate({
      "width": $(this).find('a').outerWidth(),
      "left": $(this).find('a').offset().left
    }, 200);

    var zb_code = $(this).parent().parent().parent().attr("zb_code");
    var pubdatetime = $(this).parent().parent().parent().attr("pubdatetime");
    var tabIsTrue = $(this).parent().parent().parent().attr("tabIsTrue");
    var type = null;
    if (index == 0) {
      type = 0;
    } else if (index == 1) {
      type = 1;
    } else if (index == 2) {
      type = 2;
    } else if (index == 3) {
      type = 3;
    } else if (index == 4) {
      type = 4;
    };

    cliclTableTabAjax(zb_code, pubdatetime, type, $(this));

    // brokenLineChart(zb_code);
  });


}


// hightcharts
function charts(select, title, datas, color) {
  $(select).highcharts({
    chart: {
      plotBackgroundColor: "#111720",
      plotBorderColor: '#111720',
      plotBorderWidth: null,
      style: {
        borderColor: "#111720",

      },
      plotShadow: false,
      spacing: [0, 0, 0, 0]
    },
    credits: {
      text: '',
      href: ''
    },
    colors: color,
    title: {
      floating: true,
      text: title,
      style: {
        color: "#999898"
      }
    },
    tooltip: {
      enabled: false
    },

    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        },
        // point: {
        //     events: {
        //         mouseOver: function(e) {  // 鼠标滑过时动态更新标题
        //             // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
        //             chart.setTitle({
        //                 text: e.target.name+ '\t'+ e.target.y + ' %'
        //             });
        //         }
        //         //,
        //         // click: function(e) { // 同样的可以在点击事件里处理
        //         //     chart.setTitle({
        //         //         text: e.point.name+ '\t'+ e.point.y + ' %'
        //         //     });
        //         // }
        //     }
        // },
      }
    },
    series: [{
      type: 'pie',
      innerSize: '80%',
      name: '占比',
      data: datas
    }]
  }, function(c) {
    // 环形图圆心
    var centerY = c.series[0].center[1],
      titleHeight = parseInt(c.title.styles.fontSize);
    c.setTitle({
      y: centerY + titleHeight / 2
    });
    this.chart = c;
    // console.log(c.path)
    $(".highcharts-point").attr("stroke-width", 0);
    // $(".highcharts-point").mouseenter(function(){

    //     console.log("dsdsa");
    //     $(".highcharts-point").attr("stroke-width",0);
    //     alert("111111");
    // })

  });
}


// chartAjax
function chartAjax() {
  $.ajax({
    url: boxUrl + "/tradeBoxService/datas/overless_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: function(data) {
      // chartBol=true;
      var arr = data.results;
      var wlesstimes = null;
      var wovertimes = null;

      var mlesstimes = null;
      var movertimes = null;

      var jlesstimes = null;
      var jovertimes = null;
      var datasw, datasm, datasj = null;
      var colors = [
        '#2dca7b', //第二个颜色
        '#ef5b5b', //第一个颜色，欢迎加入Highcharts学习交流群294191384
      ]
      // console.log(data.results);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].cmptype == "A") {
          wlesstimes = arr[i].lesstimes;
          wovertimes = arr[i].overtimes;
          datasw = [
            ['利空', wlesstimes],
            ['利多', wovertimes]
          ]
          // console.log(wlesstimes+" "+wovertimes);
          charts("#highchart1", "周数据", datasw, colors);
          $('.over1').html(wovertimes);
          $(".less1").html(wlesstimes);
        } else if (arr[i].cmptype == "B") {
          mlesstimes = arr[i].lesstimes;
          movertimes = arr[i].overtimes;
          datasm = [

            ['利空', mlesstimes],
            ['利多', movertimes]
          ]
          // console.log(wlesstimes+" "+wovertimes);
          charts("#highchart2", "月数据", datasm, colors);
          $('.over2').html(movertimes);
          $(".less2").html(mlesstimes);

        } else if (arr[i].cmptype == "C") {
          jlesstimes = arr[i].lesstimes;
          jovertimes = arr[i].overtimes;
          datasj = [

            ['利空', jlesstimes],
            ['利多', jovertimes]
          ]
          // console.log(wlesstimes+" "+wovertimes);
          charts("#highchart3", "季数据", datasj, colors);
          $('.over3').html(jovertimes);
          $(".less3").html(jlesstimes);
        }
      }
      // $('.charts_wrap').show();
      // $(".highcharts-background").attr({
      //     "width":160,
      //     "height":160
      // })
    }
  });
}


// 挖掘数据面 数据列表 s
function dataList() {
  $.ajax({
    url: boxUrl + "/tradeBoxService/datas/zbsj_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: getDataList
  });
}

function getDataList(data) {
  // console.log(data);
  var res = "";
  var arr = data.results;
  var allArr = [];
  var testArr = [];
  for (var i = 0; i < arr.length; i++) {
    //日期分割
    var substr = arr[i].pub_date.substring(0, 16);
    arr[i].pub_date = substr;
    // console.log(substr);
    var commonImgSrc = "img/box_bigIpad/"
    //判断星级 s
    var styleStar = "";
    if (arr[i].zb_star == 1) {
      styleStar = commonImgSrc + "1@2x.png";
      styleStar = bigIpad12x;
    } else if (arr[i].zb_star == 2) {
      styleStar = commonImgSrc + "2@2x.png";
      styleStar = bigIpad22x;
    } else {
      styleStar = commonImgSrc + "3@2x.png";
      styleStar = bigIpad32x;
    }
    //判断星级 e

    //判断国家 s
    var srcCountry = "";
    if (arr[i].zb_country == 10001) {
      srcCountry = commonImgSrc + "mg.png";
      srcCountry = bigIpadmg;
    } else if (arr[i].zb_country == 10002) {
      srcCountry = commonImgSrc + "rb.png";
      srcCountry = bigIpadrb;
    } else if (arr[i].zb_country == 10003) {
      srcCountry = commonImgSrc + "zg.png";
      srcCountry = bigIpadzg;
    } else if (arr[i].zb_country == 10004) {
      srcCountry = commonImgSrc + "yg.png";
      srcCountry = bigIpadyg;
    } else if (arr[i].zb_country == 10005) {
      srcCountry = commonImgSrc + "dg.png";
      srcCountry = bigIpaddg;
    } else if (arr[i].zb_country == 10006) {
      srcCountry = commonImgSrc + "fg.png";
      srcCountry = bigIpadfg;
    } else if (arr[i].zb_country == 10007) {
      srcCountry = commonImgSrc + "jnd.png";
      srcCountry = bigIpadjnd;
    } else if (arr[i].zb_country == 10010) {
      srcCountry = commonImgSrc + "adly.png";
      srcCountry = bigIpadadly;
    } else if (arr[i].zb_country == 10011) {
      srcCountry = commonImgSrc + "oz.png";
      srcCountry = bigIpadoz;
    } else if (arr[i].zb_country == 10008) {
      srcCountry = commonImgSrc + "xg.png";
      srcCountry = bigIpadxg;
    } else if (arr[i].zb_country == 10009) {
      srcCountry = commonImgSrc + "hg.png";
      srcCountry = bigIpadhg;
    } else if (arr[i].zb_country == 16) {
      srcCountry = commonImgSrc + "xjp.png";
      srcCountry = bigIpadxjp;
    } else if (arr[i].zb_country == 10017) {
      srcCountry = commonImgSrc + "rs.png";
      srcCountry = bigIpadrs;
    } else if (arr[i].zb_country == 10021) {
      srcCountry = commonImgSrc + "xxl.png";
      srcCountry = bigIpadxxl;
    } else if (arr[i].zb_country == 10013) {

    } else if (arr[i].zb_country == 10034) {
      srcCountry = commonImgSrc + "tw.png";
      srcCountry = bigIpadtw;
    } else if (arr[i].zb_country == 10036) {
      srcCountry = commonImgSrc + "ydl.png";
      srcCountry = bigIpadydl;
    }
    //判断国家 e

    //判断前值是否为 空 s
    if (arr[i].pre_value == null || arr[i].pre_value == "" || arr[i].pre_value == undefined) {
      arr[i].pre_value = "--"
    }
    //判断前值是否为 空 e

    //判断预期是否为 空 s
    if (arr[i].expect_value == null || arr[i].expect_value == "" || arr[i].expect_value == undefined) {
      arr[i].expect_value = "--"
    }
    //判断预期是否为 空 e

    //判断实际值是否为 空 s
    if (arr[i].pub_value == null || arr[i].pub_value == "" || arr[i].pub_value == undefined) {
      arr[i].pub_value = "--"
    }
    //判断实际值是否为 空 e



    // console.log(allArr[i])

    res += '<ul class="list_data_list" isjt="' + true + '" zb_code="' + arr[i].zb_code + '" pubdatetime="' + arr[i].pub_datetime + '" tabIsTrue="' + true + '">' +
      '<li class="list_title_ws">' +
      '<div class="list_title_left">'
      //
      +
      '<span>' + arr[i].pub_date + '</span>'

      +
      '</div>' +
      '<div class="list_title_right">' +
      '<img src="' + styleStar + '"/>' +
      '</div>' +
      '</li>' +
      '<li class="omtile_wrap">' +
      '<div class="omtile_wrap_divs">' +
      '<img src="' + srcCountry + '" />' +
      '</div>' +
      '<div class="omtile_wrap_divs omtile_wrap_divs2">' +
      '<div class="list_con">' +
      arr[i].content +
      '</div>' +
      '<div class="flex_between list_data_list_oli">' +
      '<div>'
      // +'<span>'+"前值："+arr[i].pre_value+'</span>'
      +
      '<span class="yqz">' + "前值：" + '</span>' +
      '<span class="flot">' + arr[i].pre_value + '</span>' +
      '</div>' +
      '<div class="mid_list_data_list_oli">'
      // +'<span>'+"预期："+arr[i].expect_value+'</span>'
      +
      '<span class="yqz">' + "预期：" + '</span>' +
      '<span class="flot">' + arr[i].expect_value + '</span>' +
      '</div>' +
      '<div class="sjz">' +
      '<span>' + "实际值" + '</span>' +
      '<span>' + arr[i].pub_value + '</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="omtile_wrap_divs mjt">' +
      '<img class="jt" src="' + require("../img/box_bigIpad/qiehuanzhankai@2x.png") + '" />' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '<div class="bar_chart">' +
      '<div class="country_wrap">' +
      '<img src="' + require("../img/box_bigIpad/biaoshi@1x.png") + '" />' +
      '<span>' + arr[i].country_name + '</span>' +
      '</div>' +
      '<div class="bokerLineWrap">' + '</div>' +
      '<div class="x_date flex_between">' +
      '<span class="x_date_left">' + '</span>' +
      '<span class="x_date_right">' + '</span>' +
      '</div>' +
      '<p class="bar_chart_title">' + "一年内数据公布后行情表现" + '</p>' +
      '<nav class="navTab2" zb_code="' + arr[i].zb_code + '" pubdatetime="' + arr[i].pub_datetime + '" tabIsTrue="' + true + '">' +
      '<div class="tab tabSec">' +
      '<ul>' +
      '<li class="silderHssh detaiInform tabNav2 tabN' + i + '">' +
      '<a class="blue selBg" href="#detailInfo">' + "全部" + '</a>' +
      '</li>' +
      '<li class="silderHssh detaiInform tabNav2 tabN' + i + '" >' +
      '<a href="#detailInfo">' + "大于预期" + '</a>' +
      '</li>' +
      '<li class="silderHssh detaiInform tabNav2 tabN' + i + '" >' +
      '<a href="#detailInfo">' + "大于前值" + '</a>' +
      '</li>' +
      '<li class="silderHssh detaiInform tabNav2 tabN' + i + '" >' +
      '<a href="#detailInfo">' + "小于预期" + '</a>' +
      '</li>' +
      '<li class="silderHssh detaiInform tabNav2 tabN' + i + '" >' +
      '<a href="#detailInfo">' + "小于前值" + '</a>' +
      '</li>' +
      '</ul>'
      // +'<li class="silder2 sli'+i+'">'+'</li>'
      +
      '</div>'

      +
      '</nav>'

      +
      '<ul class="tabale tabale2">' +
      '<li class="tr_title ">' +
      '<span>' + "周期" + '</span>' +
      '<span>' + "上涨" + '</span>' +
      '<span>' + "下跌" + '</span>' +
      '</li>' +
      '<li class=" tr_con">' +
      '<span>' + "半小时" + '</span>' +
      '<span class="bxsUp">' + '</span>' +
      '<span class="bxsDown">' + '</span>' +
      '</li>' +
      '<li class=" tr_con">' +
      '<span>' + "1小时" + '</span>' +
      '<span class="yxsUp">' + '</span>' +
      '<span class="yxsDown">' + '</span>' +
      '</li>' +
      '<li class=" tr_con">' +
      '<span>' + "4小时" + '</span>' +
      '<span class="sxsUp">' + '</span>' +
      '<span class="sxsDown">' + '</span>' +
      '</li>' +
      '<li class="tr_con">' +
      '<span>' + "1日" + '</span>' +
      '<span class="dayUp">' + '</span>' +
      '<span class="dayDown">' + '</span>' +
      '</li>'

      +
      '</ul>'


      +
      '</div>'
  }



  $(".listWrap_box").html(res);
  // 点击伸缩list下的chart
  var sel1 = "";
  $('.list_data_list').click(function(e) {
    e.preventDefault();
    $(this).next('.bar_chart').stop().animate({
      height: 'toggle'
    });
    var chartsWrap = $(this).next('.bar_chart').find($('.bokerLineWrap'));
    var x_date_r = $(this).next('.bar_chart').find($('.x_date .x_date_right'));
    var x_date_l = $(this).next('.bar_chart').find($('.x_date .x_date_left'));
    var zb_code = $(this).attr("zb_code");
    var pubdatetime = $(this).attr("pubdatetime");
    var tabIsTrue = $(this).attr("tabIsTrue");
    var isjt = $(this).attr("isjt");
    $(this).attr("tabIsTrue", false);
    if (tabIsTrue == "true") {
      tableAjax(zb_code, pubdatetime, $(this));
      brokenLineChart(zb_code, chartsWrap, x_date_r, x_date_l);
    } else {

    }
    // if($(this).next('.bar_chart').height()==0){
    //     $(this).css("border","none");
    // }else {
    //     $(this).css("border-bottom","2px solid #ddd");
    // }
    if (isjt == "true") {
      $(this).attr("isjt", false)
      $(this).find('.jt').attr("src", shouqi2x)

    } else {
      $(this).attr("isjt", true)
      $(this).find('.jt').attr("src", qiehuanzhankai2x)
    }
    if (chartsWrap.html() == "") {
      chartsWrap.html("暂无图表信息");
      chartsWrap.addClass('nolineData');
    }

  });
  initTabInfo2();
  $('.box_zzc').hide();

}

function tableAjax(zbc, pub, $this) {
  $.ajax({
    url: boxUrl + "/tradeBoxService/datas/zbupdown_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      zbcode: zbc,
      pubdatetime: pub,
      type: 0,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: function(res) {
      // console.log(res);
      // 半小时 s
      $this.next().find($(".bxsUp")).html(res.results[0].uptimes);
      $this.next().find($(".bxsDown")).html(res.results[0].downtimes);
      // 1小时 s
      $this.next().find($(".yxsUp")).html(res.results[1].uptimes);
      $this.next().find($(".yxsDown")).html(res.results[1].downtimes);
      // 4小时 s
      $this.next().find($(".sxsUp")).html(res.results[2].uptimes);
      $this.next().find($(".sxsDown")).html(res.results[3].downtimes);
      // 1天 s
      $this.next().find($(".dayUp")).html(res.results[3].uptimes);
      $this.next().find($(".dayDown")).html(res.results[3].downtimes);

    }

  });
}

function cliclTableTabAjax(zbc, pub, type, $this) {
  $.ajax({
    url: boxUrl + "/tradeBoxService/datas/zbupdown_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      zbcode: zbc,
      pubdatetime: pub,
      type: type,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: function(res) {
      // console.log(res);
      // 半小时 s
      $this.parent().parent().parent().next().find($(".bxsUp")).html(res.results[0].uptimes);
      $this.parent().parent().parent().next().find($(".bxsDown")).html(res.results[0].downtimes);
      // 1小时 s
      $this.parent().parent().parent().next().find($(".yxsUp")).html(res.results[1].uptimes);
      $this.parent().parent().parent().next().find($(".yxsDown")).html(res.results[1].downtimes);
      // 4小时 s
      $this.parent().parent().parent().next().find($(".sxsUp")).html(res.results[2].uptimes);
      $this.parent().parent().parent().next().find($(".sxsDown")).html(res.results[3].downtimes);
      // 1天 s
      $this.parent().parent().parent().next().find($(".dayUp")).html(res.results[3].uptimes);
      $this.parent().parent().parent().next().find($(".dayDown")).html(res.results[3].downtimes);

    }

  });
}



// 独家资金面 s
// 多单对比 s

function duoDaNAjax() {
  $.ajax({
    url: boxUrl + "/tradeBoxService/tradebox/grade_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: function(data) {
      // console.log(data);
      var buyratio = (data.results[0].buyratio * 100).toFixed(2);
      var sellratio = (data.results[0].sellratio * 100).toFixed(2);
      // console.log(buyratio);
      $('.boderRed').css("width", buyratio + "%");
      $('.borderGreen').css("width", sellratio + "%");
      $('.sjiaoWrap').css("left", (buyratio - 20) + "%");
      $('.ddzb2,.dd').html(buyratio + "%");
      $(".kd").html(sellratio + "%");
      if (parseInt(buyratio) >= 50) {
        $(".jd_data2").html("解读：该品种中近五个交易日市场以做多为主,且多投占比例比较高。");
      } else {
        $(".jd_data2").html("解读：该品种中近五个交易日市场以做空为主,且空投占比例比较高。");
      }

    }
  })
}
// 多单对比 e

// 高手交易实时动态 s

function transaction() {
  var headportraitArr = [];
  $.ajax({
    url: boxUrl + "/tradeBoxService/tzyx/trade_trends",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      number: 4,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: function(data) {
      // console.log(data);
      var transactionArr = data.results;
      var result = "";
      var lots = "";
      var price = "";

      for (var i = 0; i < transactionArr.length; i++) {
        var loginCode = transactionArr[i].loginCode;

        // 判断买入 或卖出 s
        if (transactionArr[i].Type == 0) {
          lots = '<span class="buy">' + "买入：" + '</span>' + transactionArr[i].lots + "手"
        } else if (transactionArr[i].Type == 1) {
          lots = '<span class="buy">' + "卖出：" + '</span>' + transactionArr[i].lots + "手"
        }
        // 判断买入 或卖出 e

        // 判断平仓或开仓 s
        var Price_ = parseFloat(transactionArr[i].Price).toFixed(3);
        var tradeprice_ = parseFloat(transactionArr[i].tradeprice).toFixed(3);
        if (transactionArr[i].TradeType == 1 || transactionArr[i].TradeType == 2) {
          price = '<span class="buy">' + "开仓价：" + '</span>' + Price_
        } else if (transactionArr[i].TradeType == 3) {
          price = '<span class="buy">' + "平仓价：" + '</span>' + tradeprice_
        }

        // 判断平仓或开仓 e
        var ZJStopPrice = transactionArr[i].ZJStopPrice;
        var ZJStopPriceTofixed = parseFloat(ZJStopPrice).toFixed(3);
        var ZJLimitPriceTofixed = parseFloat(transactionArr[i].ZJLimitPrice).toFixed(3)
        // console.log(ZJStopPriceTofixed);
        if (ZJStopPriceTofixed == null || ZJStopPriceTofixed == "NaN" || ZJStopPriceTofixed == undefined) {
          //alert("Sdsdsa")
          ZJStopPriceTofixed = "--";
        }
        if (ZJLimitPriceTofixed == null || ZJLimitPriceTofixed == "NaN" || ZJLimitPriceTofixed == undefined) {
          //alert("Sdsdsa")
          ZJLimitPriceTofixed = "--";
        }
        if (transactionArr[i].ZJLimitPrice == null) {
          transactionArr[i].ZJLimitPrice = "--";
        }
        // console.log(transactionArr[i].ZJStopPrice);
        var sortope_dateTime = transactionArr[i].ope_dateTime.replace(/-/g, '/');
        var timestamp = new Date(sortope_dateTime).getTime();
        // console.log(headportraitArr[i]);
        result += '<ul class="transactionList_wrap">' +
          '<li class="transactionList_tx">' +
          '<img class="head' + loginCode + ' _head" src="' + require("../img/touxiang@2x.png") + '" />' +
          '</li>' +
          '<li class="transactionList_right">' +
          '<div class="flex_between">' +
          '<span class="transaction_uname">' + transactionArr[i].dearName + '</span>' +
          '<span>' +
          '<img src="' + require("../img/box_bigIpad/hezitime@2x.png") + '" />' +
          '<span class="transaction_date">' + getDateDiff(timestamp) + '</span>' +
          '</span>'

          +
          '</div>' +
          '<div class="lotsWrap">' +
          '<p>' +
          '<span class="lop firstLop">' + lots + '</span>' +
          '<span class="lop lop2">' + price + '</span>' +
          '</p>' +
          '<p>' +
          '<span class="lop lopzs">' + "止损：" + ZJStopPriceTofixed + '</span>' +
          '<span class="lop lop2">' + "止盈：" + ZJLimitPriceTofixed + '</span>' +
          '</p>' +
          '</div>' +
          '</li>' +
          '</ul>'
        headportrait(loginCode);
      }
      $('.transactionCon').html(result);



    }
  })
}

// 洞察信息面 chart s
function dcChartAjax() {
  $.ajax({
    url: boxUrl + "/tradeBoxService/infos/overless_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: function(data) {
      // console.log(data)
      var dcxinxiArr = data.results;
      var colors = [
        '#ed5b5b', //第一个颜色，欢迎加入Highcharts学习交流群294191384
        '#2ecb7e', //第二个颜色
        '#929aa5',
      ]
      var res = "";
      for (var i = 0; i < dcxinxiArr.length; i++) {
        if (dcxinxiArr[i].countType == 1) {
          var dcOverWeek = dcxinxiArr[i].over_times;
          var dcLessWeek = dcxinxiArr[i].less_times;
          var dcequalWeek = dcxinxiArr[i].equal_times;
          var dcw = [

            ['利空', dcOverWeek],
            ['利多', dcLessWeek],
            ['观望', dcequalWeek]
          ]

          $('.over4').html(dcOverWeek);
          $(".less4").html(dcLessWeek);
          $(".gw1").html(dcequalWeek);
          charts("#highchart4", "周数据", dcw, colors);
        } else if (dcxinxiArr[i].countType == 2) {
          var dcOverMonth = dcxinxiArr[i].over_times;
          var dcLessMonth = dcxinxiArr[i].less_times;
          var dcequalMonth = dcxinxiArr[i].equal_times;
          var dcw2 = [

            ['利空', dcOverMonth],
            ['利多', dcLessMonth],
            ['观望', dcequalMonth]
          ]
          $('.over5').html(dcOverMonth);
          $(".less5").html(dcLessMonth);
          $(".gw2").html(dcequalMonth);
          charts("#highchart5", "月数据", dcw2, colors);
        } else if (dcxinxiArr[i].countType == 3) {
          var dcOverj = dcxinxiArr[i].over_times;
          var dcLessj = dcxinxiArr[i].less_times;
          var dcequalj = dcxinxiArr[i].equal_times;
          var dcw3 = [

            ['利空', dcOverj],
            ['利多', dcLessj],
            ['观望', dcequalj]
          ]
          $('.over6').html(dcOverj);
          $(".less6").html(dcLessj);
          $(".gw3").html(dcequalj);
          charts("#highchart6", "季数据", dcw3, colors);
        } else if (dcxinxiArr[i].countType == 4) {
          var dcOvery = dcxinxiArr[i].over_times;
          var dcLessy = dcxinxiArr[i].less_times;
          var dcequaly = dcxinxiArr[i].equal_times;
        }
        if (dcOverWeek == 0 && dcLessWeek == 0 && dcequalWeek == 0) {
          $('.noChartData').show();
          $(".noChartDataChild1").html("暂无数据");
        } else {
          $('.noChartData').hide();
        }
        if (dcOverMonth == 0 && dcLessMonth == 0 && dcequalMonth == 0) {
          $('.noChartData').show();
          $(".noChartDataChild2").html("暂无数据");
        } else {
          $('.noChartData').hide();
        }
        if (dcOverj == 0 && dcLessj == 0 && dcequalj == 0) {
          $('.noChartData').show();
          $(".noChartDataChild3").html("暂无数据");
        } else {
          $('.noChartData').hide();
        }
      }

      res = '<ul class="tabale">' +
        '<li class="tr_title">' +
        '<span>' + "周期" + '</span>' +
        '<span>' + "看多" + '</span>' +
        '<span>' + "看平" + '</span>' +
        '<span>' + "看空" + '</span>' +
        '</li>' +
        '<li class=" tr_con">' +
        '<span class="date_ss">' + "一周" + '</span>' +
        '<span class="bxsUp">' + dcOverWeek + '</span>' +
        '<span class="zkanping">' + dcequalWeek + '</span>' +
        '<span class="bxsDown">' + dcLessWeek + '</span>' +
        '</li>' +
        '<li class="tr_con">' +
        '<span>' + "一个月" + '</span>' +
        '<span class="yxsUp">' + dcOverMonth + '</span>' +
        '<span class="ykanping">' + dcequalMonth + '</span>' +
        '<span class="yxsDown">' + dcLessMonth + '</span>' +
        '</li>' +
        '<li class=" tr_con">' +
        '<span>' + "三个月" + '</span>' +
        '<span class="sxsUp">' + dcOverj + '</span>' +
        '<span class="skanping">' + dcequalj + '</span>' +
        '<span class="sxsDown">' + dcLessj + '</span>' +
        '</li>' +
        '<li class=" tr_con">' +
        '<span>' + "半年" + '</span>' +
        '<span class="dayUp">' + dcOvery + '</span>' +
        '<span class="yearkanping">' + dcequaly + '</span>' +
        '<span class="dayDown">' + dcLessy + '</span>' +
        '</li>'

        +
        '</ul>'

      $('.dcTable').html(res);
    }

  });

}


// 洞察信息面 chart e

// 洞察信息面 文章数接口 ajax方法 s

function articleAjax() {
  $.ajax({
    url: boxUrl + "/tradeBoxService/infos/cmsnews_num_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      _type: "json"
    },
    success: function(data) {
      // console.log(data);
      var result = "";
      var articlNumArr = data.results;
      for (var i = 0; i < articlNumArr.length; i++) {

        // 判断文章篇数 是否为undefined
        if (articlNumArr[i].nums == undefined) {
          articlNumArr[i].nums == 0;
        }
        if (articlNumArr[i].type == 0) {
          var allArt = articlNumArr[i].nums;

        } else if (articlNumArr[i].type == 1) {
          var moreArt = articlNumArr[i].nums;

        } else if (articlNumArr[i].type == 2) {
          var lessArt = articlNumArr[i].nums;

        } else if (articlNumArr[i].type == 3) {
          var pingArt = articlNumArr[i].nums;

        }
      }
      if (allArt == undefined) {
        allArt = 0;
      }
      if (moreArt == undefined) {
        moreArt = 0;
      }
      if (lessArt == undefined) {
        lessArt = 0;
      }
      if (pingArt == undefined) {
        pingArt = 0;
      }
      result = '<p>' +
        "解读：该交易品种中近三个月机构发表观点" + allArt + "篇,看多" + moreArt + "篇,看空" + lessArt + "篇，看平" + pingArt + "篇。" +
        '</p>'
      $('.dcxinxi_data').html(result)
    }
  })
}
// 洞察信息面 文章数接口 ajax方法 e

// 机构观点 s
function organizationViewpoint() {
  $.ajax({
    url: boxUrl + "/tradeBoxService/infos/cmsnews_info",
    dataType: "jsonp",
    type: "GET",
    data: {
      symbol: symbol,
      interfaceTimep: now,
      encryptTimeStr: nowMd5,
      number: 20,
      _type: "json"
    },
    success: function(data) {
      // console.log(data);
      var organizationArr = data.results;
      // console.log(organizationArr);

      var result = "";
      for (var i = 0; i < organizationArr.length; i++) {
        var organizationDate = organizationArr[i].newsPubTIme.substring(5, 10);
        result += '<a href="box_ipadNews.html?newsId=' + organizationArr[i].cmsid + '" class="organizationWrap" cmsid="' + organizationArr[i].cmsid + '">' +
          '<li class="organization_title">' +
          '<img src="' + require("../img/box_bigIpad/hezitime@2x.png") + '" />' +
          '<span class="date_arg">' + organizationDate + '</span>' +
          '</li>' +
          '<li class="organization_con">' + organizationArr[i].newsTitle + '</li>' +
          '</a>'
      }
      if (organizationArr.length == 0) {
        result = "暂无数据";
        $('.jggd_wrap').addClass('noNews');
      } else {
        $('.jggd_wrap').removeClass('noNews');
      }
      $('.jggd_wrap').html(result);

      $('.organizationWrap').click(function() {
        backNews();
      })
      // 点击跳原生新闻
      // clickNews();
    }
  })
}
// 机构观点 e


// 挖掘数据面 走势图 s
function brokenLineChart(zbCode, contWrap, x_date_r, x_date_l) {
  $.ajax({
    type: "get",
    //url: "http://192.168.11.110:8063/InterfaceCollect/Default.aspx?Code=Fx168&bCode=IFinancialCalendarDetial9372&succ_callback=CallbackContent",
    url: chartUrl + "/default.aspx?Code=fx168&bCode=IFinancialCalendarDetial" + zbCode + "&succ_callback=CallbackContent",
    dataType: "jsonp",
    // crossDomain: true,
    jsonp: false,
    jsonpCallback: "CallbackContent",
    timeout: 6000,
    success: function(objJson) {
      // console.log(objJson);
      var brokenLineArr = objJson.List[0].DataHistory;
      // console.log(objJson.List);
      var dataArr = [];
      var brokenLinedataArr = [];
      var newPtime = [];
      $.each(brokenLineArr, function(i, val) {
        // console.log(val);
        var dataPubTime = val.DataPubTime;
        newPtime.push(dataPubTime);
        for (var i = 0; i < newPtime.length; i++) {
          var strr = newPtime[i];
          var numStr = getByteLen(newPtime[i]);
          if (numStr == 7) {
            strr = strr + "-01";
          }
        }
        if (i == 1) {
          // console.log(dataPubTime+"sdasdas");
          $(x_date_r).html(dataPubTime);
        } else if (i == brokenLineArr.length - 1) {
          // console.log(dataPubTime+"<<<<<<<<<<<<");
          $(x_date_l).html(dataPubTime);
        }

        var date = strr.replace(/-/g, '/');
        // alert(date)
        var timestamp = new Date(date).getTime();
        // console.log(timestamp);
        var dataVal = val.DataValue;
        // console.log(dataVal);
        dataArr[0] = timestamp;
        dataArr[1] = dataVal;
        brokenLinedataArr.unshift([
          dataArr[0],
          parseFloat(dataArr[1])
        ])
      })
      // console.log(brokenLinedataArr);
      drawBrokenLine(contWrap, brokenLinedataArr);

    }


  });
}


function drawBrokenLine(container, data) {
  $(container).highcharts('StockChart', {
    chart: {

      backgroundColor: '#111720',
      plotBackgroundColor: '#111720',
      plotBorderColor: "#111720",
      plotBorderWidth: 0,
      height: 268,
      marginTop: 44
      //  height: 326,
      //  width: 420
    },
    credits: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    rangeSelector: {
      selected: 6,
      inputEnabled: false
    },
    scrollbar: {
      enabled: false //不显示下方刻度滚动条
    },
    navigator: {
      height: -60,
      enabled: false //不显示下方刻度游标尺

    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          /*数据点是否显示*/
          radius: 5,
          /*数据点大小px*/
          fillColor: '#01d0d2' /*数据点颜色*/
        },


      }
    },
    xAxis: {
      tickLength: 0,
      lineWidth: 1,
      lineColor: "#bbbbbb",
      tickWidth: 0,
      labels: {
        enabled: false,
        x: -20,
        y: 50, //x轴刻度往下移动20px
        style: {
          color: '#bbbbbb', //颜色
          fontSize: '0.2rem' //字体
        }
      },
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%m-%d',
        week: '%m-%d',
        month: '%Y-%m',
        year: '%Y'
      }
      // categories: ['One','Two','three']
    },
    yAxis: {
      gridLineColor: '#212124',
      opposite: false,
      lineWidth: 1,
      lineColor: "#bbbbbb",
      tickWidth: 0,
      labels: {
        y: 0, //x轴刻度往下移动20px
        style: {
          color: '#bbbbbb', //颜色
          fontSize: '0.2rem' //字体
        }
      }, // enabled:false,
    },
    //
    // title : {
    //     text : 'AAPL Stock Price'
    // },
    series: [{
      name: '',
      data: data,
      type: 'area',
      threshold: null,
      lineColor: "#01d0d2",
      // tooltip : {
      //     valueDecimals : 2
      // },
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, "#01d0d2"],
          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        ]
      },

    }]
  });
}

// 获取头像 s
function headportrait(loginCode) {
  $.ajax({
    url: headUrl + "/Handler/GetUserInfoByTzyxID.ashx?userid=" + loginCode + "&succ_callback=Cimg",
    type: "get",
    dataType: "jsonp",
    timeout: 6000,
    success: function(data) {
      // console.log(data[0].result);
      $(".head" + loginCode).attr("src", data[0].result);
    },

  });
}
// 获取头像 e


// js调安卓新闻
function Androidnews(e) {
  if (window.SysClientJs) {
    window.SysClientJs.newsDetail(e);
  }
}
// js调用ios新闻
function Iosnews(e) {
  if (window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.newsDetail.postMessage(e);
  }
}
// 点击洞察信息面跳原生新闻
function clickNews() {
  $('.organizationWrap').click(function() {
    // console.log($(this).attr("cmsid"));
    $(this).find($('.organization_con')).css("color", "#999")
    var newsId = $(this).attr("cmsid");
    if (isAndroid) {
      Androidnews(newsId);
    } else if (isiOS) {
      Iosnews(newsId);
    }
  })
}
// 将时间戳转换成几分钟前几小时前几天前 s
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;

function getDateDiff(dateTimeStamp) {
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    //若日期不符则弹出窗口告之
    //alert("结束日期不能小于开始日期！");
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var result = "";
  if (monthC >= 1) {
    result = parseInt(monthC) + "个月前";
  } else if (weekC >= 1) {
    result = parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}
// 将时间戳转换成几分钟前几小时前几天前 e
// ios转换时间戳必须是年月日形式如果只有年月则会显示 NaN 所以用此方法添加一个“-00” s
function getByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}
// ios转换时间戳必须是年月日形式如果只有年月则会显示 NaN 所以用此方法添加一个“-00” e

// 获取地址栏参数 s
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
// 获取地址栏参数 e

// 获取app 品种参数 symbol s
function getSymbol(symbolStr) {
  if (symbol == symbolStr) {

  } else {
    $('.box_zzc').show();
    symbol = symbolStr;
    initTabInfo();
    chartAjax();
    dataList();
    duoDaNAjax();
    transaction();
    dcChartAjax();
    articleAjax();
    organizationViewpoint();

    // var ohref=changeURLArg(window.location.href,'code',symbol);
    // window.location.href=ohref;
    // window.location.reload();
    // alert(ohref+">>>>>")
  }
}
// 获取app 品种参数 symbol e

// 获取 app大小屏方法 s
function getScreen(screenType, urlNum) {
  if (screenType == "big" && urlNum == 1) {
    window.location.href = "box_bigIpad.html"
  } else if (screenType == "small" && urlNum == 1) {
    window.location.href = "box_ipad.html"
  }

}


// 获取 app大小屏方法 e


// 新闻内页 返回按钮  s

function backNews() {
  if (window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.nextPage.postMessage("back");
  }
}

// function checkScreenFrame(){

//     window.webkit.messageHandlers.checkScreenFrame.postMessage("");
// }
// 新闻内页 返回按钮  e

/*
 * url 目标url
 * arg 需要替换的参数名称
 * arg_val 替换后的参数的值
 * return url 参数替换后的url
 */
function changeURLArg(url, arg, arg_val) {
  var pattern = arg + '=([^&]*)';
  var replaceText = arg + '=' + arg_val;
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi';
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match('[\?]')) {
      return url + '&' + replaceText;
    } else {
      return url + '?' + replaceText;
    }
  }
  return url + '\n' + arg + '\n' + arg_val;
}

// 双击屏幕放大
function dbClick() {
  var lastClickTime = 0;
  var clickTimer;
  document.addEventListener('click', function(event) {
    var nowTime = new Date().getTime();
    if (nowTime - lastClickTime < 400) {
      /*双击*/
      lastClickTime = 0;
      clickTimer && clearTimeout(clickTimer);
      // alert('双击');
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.doubleTapGesture.postMessage("");
      }
    } else {
      /*单击*/
      lastClickTime = nowTime;
      clickTimer = setTimeout(function() {
        // alert('单击');
      }, 400);
    }
  });
}
