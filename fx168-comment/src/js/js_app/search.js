var $ = require("jquery");
var Swiper = require("../swiper.min.js");
var dropload = require("../dropload.min.js");
var lazyload = require("../jquery.lazyload.min.js")
import {
  baseUrl,
  boxUrl,
  baseUrl2,
  chartUrl,
  headUrl,
  isNull,
  getQueryString
} from './common.js';

var brokerUserId = typeof getQueryString == 'function' ? getQueryString("brokerUserId") : null;

//app交互暴露window外部接口
window.initAd = initAd;
window.testClick = testClick;
window.myDropLoad = myDropLoad;
window.getSearchData = getSearchData;
window.getDetail = getDetail;
window.clickTab = clickTab;
window.clickSelects =clickSelects;
window.traderSq = traderSq;
window.selectTradeList_suc = selectTradeList_suc;
$(function() {


  var conFontHeight = $('.con-font').outerHeight();
  $(".con-font").css({
    height: "0.62rem"
  });
  // getSearchData();
  // $("#test").click(function(e){
  // 	e.preventDefault();
  // 	testClick();

  // })

  window.adMap = {};
  initAd();
  // myDropLoad();
  // getSearchData("GKFX");
  clickTab();
  clickSelects();


})


function initAd() {
  var baiduStr = null;
  $.ajax({
    url: baseUrl2 + "/comment/getBaiduAdInfo.json",
    dataType: "jsonp",
    type: "GET",
    data: {

    },
    success: function(data) {
      var dataObj_ad = data.data;
      $.each(dataObj_ad, function(key, val) {
        adMap[key] = val["adId"];
      });
    }
  })
}

function testClick() {
  getSearchData($("#tad").val());;
}

var counter = 0;
// 每页展示4个
var num = 20;
var pageStart = 0,
  pageEnd = 0;
var mykeyWords = "";
var mykeyWords2 = "";
var pageSize = 20;
var pageNo = 1;
var droploader = null;

function myDropLoad() {
  droploader = $('.con').dropload({

    scrollArea: window,
    domDown: {
      domClass: 'dropload-down',
      domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
      domNoData: '<div class="dropload-noData">已展示全部搜索结果</div>'
    },
    loadDownFn: function(me) {
      if (mykeyWords == "" || mykeyWords == null) {
        return;
      }
      var needToGetAd = {};
      $.ajax({
        url: baseUrl2 + "/comment/getBrokerList.json",
        // url:"https://app3.fx168api.com/small/news/getNewsByChannel.json?channelId=1",
        dataType: "jsonp",
        type: "GET",
        data: {
          "keyWord": mykeyWords,
          "pageSize": pageSize,
          "pageNo": pageNo
        },
        success: function(data) {
          pageNo++;
          var commissionArr = [];
          commissionArr = data.data;
          var listResArr = commissionArr.result;
          if (listResArr.length == 0) {
            var noImg = "";
            me.lock();
            me.noData();
            $("#haveResult .dataMe").html("");
            $("#haveResult").hide();
            $("#noResult").show();
            me.resetload();

          } else {
            $("#haveResult").show();
            $("#noResult").hide();


            var result = "";
            var keyWords = "";
            var resultgg = "";
            var abjArr = [];

            var isLock = true;
            if (listResArr.length == pageSize) {
              isLock = false;
            }
            for (var i = 0; i < listResArr.length; i++) {
              var keyWordsArr = listResArr[i].keyWords;
              var evaluationObj = listResArr[i].evaluation;
              for (var j = 0; j < keyWordsArr.length; j++) {
                keyWords += '<span>' + keyWordsArr[j] + '</span>'
              }
              resultgg = "";
              if (evaluationObj != null && evaluationObj != undefined && evaluationObj != "") {
                resultgg += '<a href=' + evaluationObj.url + '>' +
                  '<img class="gg_img" src="'+ require("../../img/img_app/ceping@2x.png")+'" />' +
                  '<span class="gg_font">' + evaluationObj.summary + '</span>' +
                  '</a>'
              }
              var brokerId = listResArr[i].userId;
              var value = adMap[brokerId];
              var strAd = "";
              if (typeof value != undefined && value != null && value != "") {
                strAd = '<span class="listBaiduAd">' +
                  '<img class="" src="'+ require("../../img/img_app/guanggao@2x.png")+'" />' +
                  '<span userId="' + brokerId + '" class="baiduGg_home" id="ad-broke' + brokerId + '">' + '</span>' +
                  '</span>';
                needToGetAd[brokerId] = value;
              }



              result += '<div class="commission_continer">' +
                '<ul style="boder:none;margin:0;" isStick="' + listResArr[i].isStick + '" isFlagship="' + listResArr[i].isFlagship + '" userId="' + listResArr[i].userId + '"  isAuth="' + listResArr[i].isAuth + '" class="commission_wrap">' +
                '<li class="commission_inner" data-style="display:flex;">' +
                '<img class="tj" src="'+ require("../../img/img_app/tuijian@2x.png")+'"/>' +
                '<div class="tile_img">' +
                '<img class="lazy" data-original=' + listResArr[i].logo + ' src="'+ require("../../img/img_app/liebiao@2x.png")+'"/>'
                // +'<img src="img/jrwg.png" />'
                +
                '</div>' +
                '<div class="commission_middle">' +
                '<ul>' +
                '<div class="spread_wrap spread">' +
                '<li class="omyspread spread">'
                // +'<img class="tj" src="img/tuijian@2x.png"/>'
                +
                '<span class="brokerNameList">' + listResArr[i].brokerName + '</span>' +
                '<img src="'+ require("../../img/img_app/guanfang@2x.png")+'" class="qjd">' +
                '<img class="rz" src="'+ require("../../img/img_app/ranzheng@2x.png")+'"/>' +
                '</li>'


                +
                '<li class="spread spread1">' +
                '<span>' + "欧美点差：" + '</span>' +
                '<span class="euData1">' + listResArr[i].euSpread + '</span>'

                +
                '</li>' +
                '<li class="spread spread2">' +
                '<span>' + "返佣比例：" + '</span>' +
                '<span class="euData2">' + listResArr[i].returnRatio + '</span>'
                // +'<span class="bfh">'+"%"+'</span>'
                +
                '</li>' +
                '<li class="spread keyWordsList">' +
                keyWords

                +
                '</li>'

                +
                '</div>'
                // +'<li class="resultgg">'
                // +resultgg
                // +'</li>'




                +
                '</ul>'

                +
                '</div>'

                +
                '<div class="goal">' +
                '<span class="goalList">' + listResArr[i].complex + '</span>' +
                '<span class="goal-font">' + "分" + '</span>' +
                '</div>' +
                '</li>'



                +
                '</ul>' +
                '<li class="resultgg">' +
                resultgg +
                '</li>'

                +
                strAd +
                '</div>'


            }

            $('#haveResult .dataMe').append(result);





            $("img.lazy").lazyload();


            for (var i = 0; i < $('.commission_wrap').length; i++) {
              var $findIM = $('.commission_wrap').eq(i);
              var findIMG_qjd = $('.commission_wrap').eq(i).attr("isFlagship");
              var findImg_rz = $('.commission_wrap').eq(i).attr("isAuth");
              if (findIMG_qjd == 1 && findImg_rz == 1) {
                $('.brokerNameList').eq(i).css("max-width", "3rem");
              } else if (findIMG_qjd == 0 && findImg_rz == 1) {
                $('.brokerNameList').eq(i).css("max-width", "3.5rem");
              } else if (findIMG_qjd == 1 && findImg_rz == 0) {
                $('.brokerNameList').eq(i).css("max-width", "3.5rem");
              }
            }


            for (var i = 0; i < $('.resultgg').length; i++) {
              if ($('.resultgg').eq(i).html() == "") {
                $('.resultgg').eq(i).hide();
              }

              if ($('.keyWordsList').eq(i).html() == "") {
                $('.commission_middle').eq(i).css("margin-top", "0.3rem");
                $('.goal').eq(i).css("top", "0.25rem");
              }
            }


            $.each(needToGetAd, function(key, val) {
              BAIDU_CLB_fillSlot(val, "ad-broke" + key);

            });

            if (isLock) {
              // 锁定
              me.lock();
              // 无数据
              me.noData();
            }


            for (var i = 0; i < $('.keyWordsList').length; i++) {
              $('.keyWordsList').eq(i).find('span').eq(0).show();
              $('.keyWordsList').eq(i).find('span').eq(1).show();
              $('.keyWordsList').eq(i).find('span').eq(2).show();
              if ($('.euData1').eq(i).html() == "") {
                $('.euData1').eq(i).html("暂无");
              }
              if ($('.euData2').eq(i).html() == "") {
                $('.euData2').eq(i).html("暂无");
                $('.bfh').eq(i).hide();
              }
              if ($('.commission_wrap').eq(i).attr("isStick") != 1) {
                $('.tj').eq(i).hide();
              }

              // 认证
              if ($('.commission_wrap').eq(i).attr("isAuth") != 1) {
                $('.rz').eq(i).hide();
              }
              if ($('.commission_wrap').eq(i).attr("isFlagship") != 1) {
                $('.qjd').eq(i).hide();
              }
              if ($('.tile_img img').eq(i).attr("src") == null || $('.tile_img img').eq(i).attr("src") == undefined || $('.tile_img img').eq(i).attr("src") == "") {
                $('.tile_img img').eq(i).attr("src", ""+ require("../../img/img_app/liebiao@2x.png")+"");
              }
            }

            // 点击列表;
            $('.commission_wrap').unbind("click");
            $('.commission_wrap').on('click', function() {
              var imgURL = $(this).find($('.tile_img img')).attr("src");
              var title = $(this).find($('.brokerNameList')).html();
              var id = $(this).attr("userid");
              var jsonObj = {
                imgURL: imgURL, //0:不分享 1:分享
                title: title,
                id: id,
                url: baseUrl + "/app/newinner.html",

              };
              var jsonStr = JSON.stringify(jsonObj);
              getDetail(jsonStr);

            })

            me.resetload();

          }

        }

      });
    }
  })
}







var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// 接收app的参数
function getSearchData(keyWord) {
  if (mykeyWords2 == keyWord) {} else {
    mykeyWords2 = keyWord;
    traderSq();
  }
  if (droploader == null) {
    mykeyWords = keyWord;
    myDropLoad();
  } else {
    if (mykeyWords == keyWord) {} else {
      mykeyWords = keyWord;
      $("#haveResult .dataMe").html("");
      pageNo = 1;
      pageSize = 20;
      droploader.unlock();
      droploader.noData(false);
      droploader.resetload();
    }

  }
}

function getDetail(str) {
  if (isiOS) {
    window.webkit.messageHandlers.intoDetail.postMessage(str);

  } else if (isAndroid) {
		if(window.SysClientJs) {
			  window.SysClientJs.intoDetail(str);
		}
  }


}
// 键盘回车键
document.onkeydown = function(e) {
  if (!e) e = window.event;
  if ((e.keyCode || e.which) == 13) {}
}


// 交易社区
function clickTab() {
  $(".slider").css("left", $('.sel_lefts').offset().left);

  $(".search_tab li a").click(function() {
    $(".search_tab li a").removeClass('search_color');
    $(this).addClass('search_color');
    $(".slider").animate({
      left: $(this).offset().left
    }, 300)
  });
}

function clickSelects() {
  $('.sel_rights').click(function() {
    var type = $(this).attr("type");
    if (type == "true") {
      $(this).attr("type", "false")
      traderSq();
    }

    $(".searchData").addClass('selectBoxIsHide')
    $(".searchData2").removeClass('selectBoxIsHide')
  });
  $('.sel_lefts').click(function() {
    $(".searchData").removeClass('selectBoxIsHide')
    $(".searchData2").addClass('selectBoxIsHide')
  });
}

function traderSq() {
  $.ajax({
    url: baseUrl2 + "comment/getAgentList.json",
    // url:"https://app3.fx168api.com/small/news/getNewsByChannel.json?channelId=1",
    dataType: "jsonp",
    type: "GET",
    data: {
      "keyWord": mykeyWords2,
    },
    success: selectTradeList_suc
  })
}



function selectTradeList_suc(data) {
  $('.traderList_loading').hide();
  var arr = data.data.result;
  var result = "";
  if (arr.length == 0) {
    $('.searchData2_con').html("");
    $('#noResult2').show();
  } else {


    for (var i = 0; i < arr.length; i++) {
      var needToGetAd = {};
      var keyWordsArr = arr[i].keyWords;
      var evaluationObj = arr[i].evaluation;
      var keyStyle = "";
      var isVip = "";
      var agentName_titleColor = "";
      if (keyWordsArr.length == 0) {
        keyStyle = "selectBoxIsHide";
      }
      if (arr[i].isVip != 1) {
        isVip = "selectBoxIsHide";

      } else {
        agentName_titleColor = "agentName_titleColor";
      }
      var keyWords = "";
      for (var j = 0; j < keyWordsArr.length; j++) {
        keyWords += '<span>' + keyWordsArr[j] + '</span>'
      }

      // 测评
      var resultgg = "";
      if (evaluationObj != null && evaluationObj != undefined && evaluationObj != "") {
        resultgg += '<a href=' + evaluationObj.url + '>' +
          '<img class="gg_img" src="'+ require("../../img/img_app/ceping@2x.png")+'" />' +
          '<span class="gg_font">' + evaluationObj.summary + '</span>' +
          '</a>'
      }

      // 广告
      var brokerId = arr[i].userId;
      var value = adMap[brokerId];
      // console.log(brokerId)
      var strAd = "";
      if (typeof value != undefined && value != null && value != "") {
        strAd = '<span class="listBaiduAd listBaiduAd2">' +
          '<img class="traderGg_img" src="'+ require('../../img/img_app/guanggao@2x.png')+'" />' +
          '<span userId="' + brokerId + '" class="baiduGg_home" id="ad-broke' + brokerId + '">' + '</span>' +
          '</span>';
        needToGetAd[brokerId] = value;

      }
      result += '<ul class="TradeList_wrap" userid="' + arr[i].userId + '">' +
        '<li class="TradeList_left ">' +
        '<img class="lazy trader_img" data-original="' + arr[i].logo + '" src="'+ require("../../img/img_app/liebiao@2x.png")+'"/>' +
        '</li>' +
        '<li class="TradeList_right">' +
        '<div class="select_title">' +
        '<span class="agentName_title ' + agentName_titleColor + '">' + arr[i].agentName + '</span>' +
        '<span>' +
        '<img class="' + isVip + ' myisVip" src="'+ require("../../img/img_app/guanfang@2x.png")+'" />' +
        '</span>' +
        '</div>'

        +
        '<div class="spread select_keyWordsList ' + keyStyle + '">' + keyWords + '</div>' +
        '<div class="agentDesc">' + arr[i].agentDesc + '</div>' +
        '<div class="resultgg resultgg_selct_cp">' + resultgg + '</div>' +
        '<div>' + strAd + '</div>' +
        '</li>' +
        '</ul>'
    }



    $(".searchData2").html(result);
    for (var i = 0; i < $('.resultgg').length; i++) {
      if ($('.resultgg').eq(i).html() == "") {
        $('.resultgg').eq(i).hide();
      }
    }
    $("img.lazy").lazyload();
    // alert(needToGetAd)
    $.each(needToGetAd, function(key, val) {
      BAIDU_CLB_fillSlot(val, "ad-broke" + key);
    });

    // 点击跳转交易社区内页
    $('.TradeList_wrap').on('click', function() {
      var imgURL = $(this).find($('.trader_img')).attr("data-original");
      var title = $(this).find($('.agentName_title')).html();
      var id = $(this).attr("userid");
      var jsonObj = {
        imgURL: imgURL, //0:不分享 1:分享
        title: title,
        id: id,
        url: baseUrl + "/app/traderCommunity.html",
      };
      var jsonStr = JSON.stringify(jsonObj);
      getDetail(jsonStr);
      // 调取交易社区内页不同js

    });
  }
}
