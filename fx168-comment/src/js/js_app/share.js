import {
  baseUrl,
  boxUrl,
  baseUrl2,
  chartUrl,
  headUrl,
  isNull,
  getQueryString
} from './common.js';

var $ = require('jquery');
var dropload = require("../dropload.min.js");
var lazyload = require("./jquery.lazyload.min.js");

var loginToken = ""; //登陆状态token
var brokerUserId = typeof getQueryString == 'function' ? getQueryString("brokerUserId") : null;

///app 交互暴露方法
window.initTabInfo = initTabInfo;
window.initDefaultTabShow = initDefaultTabShow;
window.initClickTabCommentNav = initClickTabCommentNav;
window.initDefaultComment = initDefaultComment;
window.initCommentTabContent = initCommentTabContent;
window.initDetailInfoTabContent = initDetailInfoTabContent;
window.initChildCommentGood= initChildCommentGood;
window.initChildCommentBad = initChildCommentBad;
window.ajaxGetDataList = ajaxGetDataList;
window.ajaxGetBasicData = ajaxGetBasicData;
window.getBasicData = getBasicData;
window.tabAnimate = tabAnimate;
window.scrollWindow = scrollWindow;
window.clickList = clickList;
window.clk = clk;
window.Androidtest = Androidtest;
window.test2 = test2;
window.IosbtnClick2 = IosbtnClick2;
window.loadBaiduAd = loadBaiduAd;
window.acceptToken = acceptToken;
window.getTokenUserId = getTokenUserId;

$(function() {
  // returnTokenUserId();
  // jquery tab动效
  //初始化tab导航
  initTabInfo();
  //初始化展现导航
  //initDefaultTabShow("#detailInfo");
  setTimeout(function() {
    $(".tabNav.myPL").click(); ///////////初始化点击评论
  }, 500)

  // window.brokerUserId ="1455557578655";
  // tabAnimate ();
  // 滚动定位tab
  scrollWindow();
  ajaxGetBasicData();
  loadBaiduAd();
  $('.con_wrap .dp').hide();
  $('.foot-font').hide();
  $('.zwdp_ul').hide();
  // tab

});

function initTabInfo() {
  $(".tab ul li.tabNav").each(function() {
    var self = this;
    $(self).click(function(e) {
      e.preventDefault();
      $(".dropload-down").remove();
      var selected = $(".tab ul li.selected").attr("href");
      var tabContent = $(self).attr("href");
      if (selected == tabContent) {
        return;
      }
      $('.tab ul li.tabNav').removeClass("selected");
      $(self).addClass("selected");
      //$('.silder').css("width", $(self).outerWidth());
      $('.silder').animate({
        "width": $(self).outerWidth(),
        "left": $(self).offset().left - 30
      }, 300);

      $(".tabContent .tabInfo").addClass("hidden");

      if ($(tabContent).attr("hasLoad") == "true") {} else {
        if (tabContent == "#detailInfo") {
          //初始化详细信息
          initDetailInfoTabContent();
        }
        if (tabContent == "#commentInfo") {
          //初始化评论
          initCommentTabContent();
        }
        $(tabContent).attr("hasLoad", "true");
      }


      $(tabContent).removeClass("hidden");
      /* Act on the event */
    });

  });
}




function initDefaultTabShow(tabPosition) {

  $('.tab ul li.tabNav').removeClass("selected");
  var self = $('.tab ul li.tabNav[href="' + tabPosition + '"]');
  $(self).addClass("selected");
  $('.silder').css("width", $(self).outerWidth());
  $('.silder').animate({
    "width": $(self).outerWidth(),
    "left": $(self).offset().left - 30
  }, 200);

  $(tabPosition).removeClass("hidden");
  var tabContent = tabPosition;
  if (tabContent == "#detailInfo") {
    //初始化详细信息
    initDetailInfoTabContent();

  }


  if (tabContent == "#commentInfo") {
    //初始化评论

    initCommentTabContent();

  }

  $(tabContent).attr("hasLoad", "true");


}


function initClickTabCommentNav() {

  $("#commentInfo nav ul li.commentNav").each(function() {
    var self = this;
    $(self).click(function(e) {
      e.preventDefault();
      var selected = $("#commentInfo nav ul li.selected").attr("href");
      var tabContent = $(self).attr("href");
      if (selected == tabContent) {
        return;
      }

      $('#commentInfo nav ul li.selected').removeClass("selected");
      $(self).addClass("selected");

      $(".commentChild .childContent").addClass("hidden");

      if ($(tabContent).attr("hasLoad") == "true") {

      } else {
        if (tabContent == "#good") {
          //初始化详细信息
          initChildCommentGood();
        }

        if (tabContent == "#bad") {
          //初始化最新动态
          initChildCommentBad();
        }

        $(tabContent).attr("hasLoad", "true");
      }

      $(tabContent).removeClass("hidden");
      /* Act on the event */
    });

  });

}

function initDefaultComment(tabPosition) {

  $("#commentInfo nav ul li.commentNav").removeClass("selected");
  var self = $('#commentInfo nav ul li.commentNav[href="' + tabPosition + '"]');
  $(self).addClass("selected");

  $(tabPosition).removeClass("hidden");
  var tabContent = tabPosition;
  if (tabContent == "#good") {
    //初始化详细信息
    initChildCommentGood();
  }

  if (tabContent == "#bad") {
    //初始化最新动态
    initChildCommentBad();
  }

  $(tabContent).attr("hasLoad", "true");
}

function initCommentTabContent() {

  initClickTabCommentNav();
  initDefaultComment("#good");
}



function initDetailInfoTabContent() {
  var droploadCommentDetailInfo = $('#detailInfo').dropload({
    scrollArea: window,
    loadDownFn: function(me) {

      $.ajax({
        type: 'GET',
        url: baseUrl2 + "/comment/getBrokerDetail.json",
        data: {
          "brokerUserId": brokerUserId

        },
        dataType: 'jsonp',
        success: function(data) {
          var detailInformList = '';
          var dataObj = data.data.brokerIntro;
          var hintObj = data.data.hint;
          var keyArr = [];
          var outKey = "";
          var outVal = "";
          var detailInformList = "";
          var a = 0;
          $.each(dataObj, function(key, val) {
            a++;
            outKey = key;
            outVal = val;
            detailInformList += '<div class="inform">' +
              '<span class="inKey">' + key + "：" + '</span>'

              +
              '<span class="inVal">' +
              val +
              '</span>'

              +
              '</div>'
            if (a) {
              // 锁定
              me.lock();
              // 无数据
              me.noData();
              // break;
            }

          });

          $.each(hintObj, function(key, val) {
            $('.foot-font-tile').html(key);
            $('.foot-font-con').html(val);
          })
          // 为了测试，延迟1秒加载
          // setTimeout(function(){
          $('.detailInfoChild').append(detailInformList);
          $('.dropload-down').hide();
          $('.foot-font').show();

          // 每次数据加载完，必须重置
          me.resetload();
        }


      });
    }
  })



}









//好评
function initChildCommentGood() {

  var pageNo = 0;
  var firstPubTime = "";
  var pageSize = 20;
  var isComplain = 0;

  var droploadCommentGood = $('#good').dropload({
    scrollArea: window,
    domDown: {
      domClass: 'dropload-down',
      domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
      domNoData: '<div class="dropload-noData">暂无更多评论</div>'
    },

    loadDownFn: function(me) {

      pageNo++;

      $.ajax({
        type: 'GET',
        url: baseUrl2 + "/comment/getComments.json",
        data: {
          "brokerUserId": brokerUserId,
          "firstPubTime": firstPubTime,
          "isComplain": isComplain,
          "pageSize": pageSize,
          "t": loginToken
        },
        dataType: 'jsonp',
        success: function(data) {
          var dataList = data.data;

          var lock = true;

          if (dataList == "" || dataList == null || dataList.length == 0) {

            if (pageNo == 1) {
              var noDataImg = '<div class="noImgWrap">' +
                '<img src="' + require("../../img/img_app/zwdp@2x.png") + '" />' +
                '<p>' + "暂无评论" + '<p/>'

                +
                '<div/>'
              $('#good').html(noDataImg);
              return;

            } else {



            }


          }

          if (dataList != "" && dataList != null && dataList.length == pageSize) {
            lock = false;
          }




          var result = "";

          //如果有数据
          for (var i = 0; i < dataList.length; i++) {
            var perData = dataList[i];



            var picUrlArr = perData.pics;
            var childCommentsArr = perData.childComments;
            var imgs = "";
            var childComments = "";
            for (var j = 0; j < picUrlArr.length; j++) {
              imgs += '<img class="lazy" data-original=' + picUrlArr[j] + ' src="' + require("../../img/img_app/liebiao@2x.png") + '"/>';
            }
            for (var j = 0; j < childCommentsArr.length; j++) {
              childComments += '<ul>' +
                '<li>' +
                '<span class="nick" isGov="' + childCommentsArr[j].isGov + '">' + childCommentsArr[j].nickName + '</span>' +
                '<img class="isGov" src="' + require("../../img/img_app/guanfang@2x.png") + '" />' +
                '<span class="nickM">' + "：" + '</span>' +
                '<span class="huifu">' + " 回复 " + '</span>' +
                '<span class="omyNick">' +
                childCommentsArr[j].targetNickName +
                '</span>'

                +
                '<span class="targetnickM">' + "：" + '</span>' +
                '<span class="targContent">' + childCommentsArr[j].content + '</span>' +
                '<img class="icon" src="' + require("../../img/img_app/picture@2x.png") + '" />'

                +
                '</li>'

                +
                '</ul>';
            }

            result += '<ul class="listWrap" data-id=' + perData.microblogId + ' data-src="' + perData.complainStatus + '" isGov="' + perData.isGov + '">' +
              '<img class="complain-img" src="" />' +
              '<li class="tile_img" dataIsComplain=' + perData.isComplain + ' >' +
              '<img src=' + perData.avatar + ' />' +
              '</li>' +
              '<li class="listWrap_rig">'

              +
              '<div class="listWrap_rig_inner">'



              +
              '<div class="ListTile">' +
              '<p class="nickName">' + perData.nickName + '</p>' +
              '<p class="dateTime">' + perData.dateCreated + '</p>' +
              '</div>' +
              '<div class="outgolden">' +
              '<p>' + "出金速度：" + '<span>' + perData.outspeed + '</span>' + '</p>' +
              '<p>' + "服务态度：" + '<span>' + perData.attitude + '</span>' + '</p>'

              +
              '</div>' +
              '<div class="outgolden2">' +
              '<p>' + "品牌形象：" + '<span>' + perData.brand + '</span>' + '</p>' +
              '<p>' + "平台表现：" + '<span>' + perData.platform + '</span>' + '</p>'

              +
              '</div>' +
              '<div class="plCon">' + perData.content + '</div>' +
              '<div class="plImg">' + imgs + '</div>'
              // +'<div class="plChild">'

              //      +childComments


              //  +'</div>'

              //  +'<p class="morePl">'
              //          +"更多评论"
              //  +'</p>'
              +
              '</div>'





              +
              '</li>'

              +
              '</ul>';

            if ((dataList.length - 1) == i) {
              firstPubTime = perData.dateCreated;

            }


          }



          $("#good  .childCommentcontent").append(result);
          $("img.lazy").lazyload();

          if (lock) {
            me.lock();
            me.noData();
          }


          // 官方显示评论颜色 图片
          for (var i = 0; i < $('.plChild').length; i++) {
            var $isGov = $('.nick').eq(i).attr("isGov");
            if ($('.plChild ul li .omyNick').eq(i).html() == "") {
              $('.huifu').eq(i).hide();
              $('.targetnickM').eq(i).hide();
            } else {
              $('.nickM').eq(i).hide();
            }
            if ($isGov == 1) {
              $('.nick').eq(i).css("color", "#fc780d");
              $('.isGov').eq(i).show();
            }
          }


          // 显示子评论iocn
          for (var i = 0; i < $('.plChild').length; i++) {
            $('.plChild').eq(i).find('.icon').first().show();
          }
          for (var i = 0; i < $('.listWrap').length; i++) {
            if ($('.plChild').eq(i).html() == "") {
              $('.plChild').eq(i).hide();
              $('.morePl').eq(i).hide();
            }
            var $lisWrap = $('.listWrap').eq(i).attr("data-src");
            var $tile_img = $('.tile_img').eq(i).attr("dataIsComplain");
            $lisWrap.toString();

            // 判断受理已受理  处理中
            if ($tile_img == 1) {


              if ($lisWrap == '0' || $lisWrap == "" || $lisWrap == null || $lisWrap == undefined) {
                $('.complain-img').eq(i).attr("src", "" + require("../../img/img_app/yishouli@2x.png"));
              } else if ($lisWrap == "1") {
                $('.complain-img').eq(i).attr("src", "" + require("../../img/img_app/chulizhong@2x.png"));
              } else if ($lisWrap == "2") {
                $('.complain-img').eq(i).attr("src", "" + require("../../img/img_app/yijiejue@2x.png"));
              } else {
                $('.complain-img').eq(i).hide();
              }

            }

            if ($('.redStar').eq(i).attr("data-like") == "") {
              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/dianzan@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#666");
            } else {
              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/success@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#f55256");
            }

            // 隐藏评论
            if ($('.del').eq(i).attr('haveDelAuth') != 1) {
              $('.del').eq(i).hide();
            }


          }

          // 因为没下拉一次就会绑定一次 所以下拉前线接触绑定
          //       $('.listWrap_rig_inner').unbind("click");
          //       $('.likePl').unbind("click");
          //       // 点击列表
          //        clickList ();
          //        likePlClick()
          me.resetload();


        }
      })
    }
  })


}




function initChildCommentBad() {

  var pageNo = 0;
  var firstPubTime = "";
  var pageSize = 20;
  var isComplain = 1;

  var droploadCommentGood = $('#bad').dropload({
    scrollArea: window,
    domDown: {
      domClass: 'dropload-down',
      domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
      domNoData: '<div class="dropload-noData">暂无更多评论</div>'
    },

    loadDownFn: function(me) {

      pageNo++;

      $.ajax({
        type: 'GET',
        url: baseUrl2 + "/comment/getComments.json",
        data: {
          "brokerUserId": brokerUserId,
          "firstPubTime": firstPubTime,
          "isComplain": isComplain,
          "pageSize": pageSize,
          "t": loginToken
        },
        dataType: 'jsonp',
        success: function(data) {



          var dataList = data.data;


          var lock = true;

          if (dataList == "" || dataList == null || dataList.length == 0) {

            if (pageNo == 1) {
              var noDataImg = '<div class="noImgWrap">' +
                '<img src="' + require("../../img/img_app/zwdp@2x.png") + '" />' +
                '<p>' + "暂无差评" + '<p/>'

                +
                '<div/>'
              $('#bad').html(noDataImg);
              return;

            } else {



            }


          }

          if (dataList != "" && dataList != null && dataList.length == pageSize) {
            lock = false;
          }




          var result = "";

          //如果有数据
          for (var i = 0; i < dataList.length; i++) {
            var perData = dataList[i];
            var picUrlArr = perData.pics;
            var childCommentsArr = perData.childComments;
            var imgs = "";
            var childComments = "";
            for (var j = 0; j < picUrlArr.length; j++) {
              imgs += '<img class="lazy" data-original=' + picUrlArr[j] + ' src="' + require("../../img/img_app/liebiao@2x.png") + '"/>';
            }
            for (var j = 0; j < childCommentsArr.length; j++) {
              childComments += '<ul>' +
                '<li>' +
                '<span class="nick" isGov="' + childCommentsArr[j].isGov + '">' + childCommentsArr[j].nickName + '</span>' +
                '<img class="isGov" src="' + require("../../img/img_app/guanfang@2x.png") + '" />' +
                '<span class="nickM">' + "：" + '</span>' +
                '<span class="huifu">' + " 回复 " + '</span>' +
                '<span class="omyNick">' +
                childCommentsArr[j].targetNickName +
                '</span>'

                +
                '<span class="targetnickM">' + "：" + '</span>' +
                '<span class="targContent">' + childCommentsArr[j].content + '</span>' +
                '<img class="icon" src="' + require("../../img/img_app/picture@2x.png") + '" />'

                +
                '</li>'

                +
                '</ul>';
            }


            result += '<ul class="listWrap" data-id=' + perData.microblogId + ' data-src="' + perData.complainStatus + '" isGov="' + perData.isGov + '">' +
              '<img class="complain-img" src="" />' +
              '<li class="tile_img" dataIsComplain=' + perData.isComplain + ' >' +
              '<img src=' + perData.avatar + ' />' +
              '</li>' +
              '<li class="listWrap_rig">'

              +
              '<div class="listWrap_rig_inner">'



              +
              '<div class="ListTile">' +
              '<p class="nickName">' + perData.nickName + '</p>' +
              '<p class="dateTime">' + perData.dateCreated + '</p>' +
              '</div>' +
              '<div class="outgolden">' +
              '<p>' + "出金速度：" + '<span>' + perData.outspeed + '</span>' + '</p>' +
              '<p>' + "服务态度：" + '<span>' + perData.attitude + '</span>' + '</p>'

              +
              '</div>' +
              '<div class="outgolden2">' +
              '<p>' + "品牌形象：" + '<span>' + perData.brand + '</span>' + '</p>' +
              '<p>' + "平台表现：" + '<span>' + perData.platform + '</span>' + '</p>'

              +
              '</div>' +
              '<div class="plCon">' + perData.content + '</div>' +
              '<div class="plImg">' + imgs + '</div>' +
              '<div class="plChild">'

              +
              childComments


              +
              '</div>'

              +
              '<p class="morePl">' +
              "更多评论" +
              '</p>' +
              '</div>'


              +
              '<div class="deleAndClick">' +
              '<span class="del"  haveDelAuth=' + perData.haveDelAuth + '>' +
              '<img data-id=' + perData.microblogId + ' src="' + require("../../img/img_app/shanchu@2x.png") + '" />' +
              '</span>' +
              '<span class="redStar" data-like=' + perData.isMeLike + '>' +
              '<img src="' + require("../../img/img_app/success@2x.png") + '" class="like" data-id="' + perData.microblogId + '" data-like="' + dataList[i].isMeLike + '"/>' +
              '<span class="like_num">' + perData.likeCount + '</span>'

              +
              '</span>' +
              '<span class="likePl" data-id=' + perData.microblogId + '>' +
              '<img src="' + require("../../img/img_app/pinglun@2x.png") + '" />'

              +
              '</span>'

              +
              '</div>'


              +
              '</li>'

              +
              '</ul>';

            if ((dataList.length - 1) == i) {
              firstPubTime = perData.dateCreated;

            }


          }



          $("#bad  .childCommentcontent").append(result);

          if (lock) {
            me.lock();
            me.noData();
          }


          // 官方显示评论颜色 图片
          for (var i = 0; i < $('.plChild').length; i++) {
            var $isGov = $('.nick').eq(i).attr("isGov");
            if ($('.plChild ul li .omyNick').eq(i).html() == "") {
              $('.huifu').eq(i).hide();
              $('.targetnickM').eq(i).hide();
            } else {
              $('.nickM').eq(i).hide();
            }
            if ($isGov == 1) {
              $('.nick').eq(i).css("color", "#fc780d");
              $('.isGov').eq(i).show();
            }
          }


          // 显示子评论iocn
          for (var i = 0; i < $('.plChild').length; i++) {
            $('.plChild').eq(i).find('.icon').first().show();
          }
          for (var i = 0; i < $('.listWrap').length; i++) {
            if ($('.plChild').eq(i).html() == "") {
              $('.plChild').eq(i).hide();
              $('.morePl').eq(i).hide();
            }
            var $lisWrap = $('.listWrap').eq(i).attr("data-src");
            var $tile_img = $('.tile_img').eq(i).attr("dataIsComplain");
            $lisWrap.toString();

            // 判断受理已受理  处理中
            if ($tile_img == 1) {


              if ($lisWrap == '0' || $lisWrap == "" || $lisWrap == null || $lisWrap == undefined) {

                $('.complain-img').eq(i).attr("src", "" + require("../../img/img_app/yishouli@2x.png"));
              } else if ($lisWrap == "1") {
                $('.complain-img').eq(i).attr("src", "" + require("../../img/img_app/chulizhong@2x.png"));
              } else if ($lisWrap == "2") {
                $('.complain-img').eq(i).attr("src", "" + require("../../img/img_app/yijiejue@2x.png"));
              } else {
                $('.complain-img').eq(i).hide();

              }

            }

            if ($('.redStar').eq(i).attr("data-like") == "") {
              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/dianzan@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#666");
            } else {
              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/success@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#f55256");
            }

            // 隐藏评论
            if ($('.del').eq(i).attr('haveDelAuth') != 1) {
              $('.del').eq(i).hide();
            }


          }





          me.resetload();






        }
      })
    }
  })






}









// 获取经纪商基本信息列表ajax方法
function ajaxGetDataList() {
  $.ajax({
    url: baseUrl2 + "/comment/getComments.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      "brokerUserId": brokerUserId,
      "isComplain": isComplain,
      "firstPubTime": "",
      "pageSize": 20
    },
    success: getDataList

  });
}



// 获取经纪商基本信息ajax方法
function ajaxGetBasicData() {
  $.ajax({
    url: baseUrl2 + "/comment/getBrokerInfo.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      "brokerUserId": brokerUserId
    },
    success: getBasicData

  });
}


// 获取经纪商基本信息方法
function getBasicData(data) {
  var arrList = [];
  arrList = data.data;
  var logoUrl = arrList.logo;
  var tile = arrList.brokerName;
  var keyWords = arrList.keyWords;
  var result = "";
  var haveNews = arrList.haveNews;
  if (typeof arrList != undefined || arrList != null || arrList != "") {
    $('header,.content').show();
    $('.news-logo-img').attr("src", logoUrl);
    $('.news-title').html(tile);
    $('.outspeed').html(arrList.microblogOutspeed);
    $('.attitude').html(arrList.microblogAttitude);
    $('.brand').html(arrList.microblogBrand);
    $('.platform').html(arrList.microblogPlatform);
    $('.complex').html(arrList.complex);
    $('.myPL span').html("(" + arrList.commentCount + ")");
    // $('.silder').css("width",$('.myPL').outerWidth())
    if (arrList.evaluation == "") {
      $('.content_bottom_cp_url').hide();
    } else {
      $('.content_bottom_cp_url').attr("href", arrList.evaluation.url);
    }

    $('.pmNum').html(arrList.rank);
    for (var i = 0; i < keyWords.length; i++) {
      result += '<span>' + keyWords[i] + '</span>'
    }
    $('.content_top').append(result);
    // 如果keyWords为空 去掉父级容器
    if (keyWords.length == 0) {
      $('.content_top').remove();
    }
    if (arrList.isFlagship == 1) {
      $('.head_wrap').css('background-image', 'url(' + require("../../img/img_app/Vguanfang@2x.png") + ')');
      var flag = "";
      flag = '<img src="'+ require("../../img/img_app/guanfang@2x.png")+'" />'
      $('.inner_isFlag').append(flag);
      $('.news-title').append($('.inner_isFlag'));
    } else {
      $('.head_wrap').css('background-image', 'url(' + require("../../img/img_app/zhengchang@2x.png") + ')');
    }

    if (arrList.isAuth == 1) {
      var inAuth = "";
      isAuth = '<img class="in_isAutho" src="' + require("../../img/img_app/renzheng@2x.png") + '" />'
      $('.inner_isFlag').append(isAuth);
    }
  }

  // 分享
  // var shareJson={
  //       isShare:1,//0:不分享 1:分享
  //       shareTitle:tile,
  //       shareUrl:baseUrl+"/app/share.html?brokerUserId="+brokerUserId,
  //       shareImage:logoUrl,
  //       shareContent:"给你推荐一个经纪商，去看看大家对它的评价吧"
  // };
  // initShare(shareJson);
  // 是否有新闻 官方有新闻

  if (haveNews != 1) {
    $('.tab ul li.newsestInform').hide();
  }

}


function tabAnimate() {
  $('.tab ul li').click(function() {
    var index = $(this).index();
    $('.tab ul li').removeClass("silderHssh");
    $(this).addClass("silderHssh");
    $('.silder').css("width", $('.tab ul li').eq(index).outerWidth());
    $('.silder').animate({
      "width": $('.tab ul li').eq(index).outerWidth(),
      "left": $('.tab ul li').eq(index).offset().left - 30
    }, 200);

  })


  $('.con_wrap ul .dp_li').click(function() {
    $('.con_wrap ul .dp_li').css({
      "border-color": "#999",
      "color": "#999"
    })
    $(this).css({
      "border-color": "#3285ea",
      "color": "#3285ea"
    })
  })

}
// 滚动定位tab
// 滚动定位tab
function scrollWindow() {

  var scrollTop = 0;
  $(window).scroll(function() {
    var headConHeight = $('.tab').offset().top;
    scrollTop = $(document).scrollTop();
    if (scrollTop > headConHeight) {
      $('.tab ul').css({
        "position": "fixed",
        "top": 0,

      })
    } else {
      $('.tab ul').css({
        "position": "relative",
        "top": 0,
        "z-index": 100,

      })

    }

  });
}

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

function clickList() {
  $('.listWrap').click(function() {
    var index = $(this).index();
    var id = $(this).attr("data-id");
    var commentDetailJson = {
      "id": id,
      "brokerUserId": brokerUserId
    }
    var jsonStr = JSON.stringify(commentDetailJson);
    if (isAndroid) {
      Androidtest(jsonStr);
    } else if (isiOS) {
      IosbtnClick2(jsonStr);
    }


  })
}
// js调安卓
// function Androidtest(e) {
//   window.SysClientJs.commentDetail(e);
// }
// js调用ios
// function IosbtnClick2(e) {
//   window.webkit.messageHandlers.commentDetail.postMessage(e);
// }


// 分享js

function clk() {
  if (isAndroid) {
    Androidtest();
  } else if (isIos) {
    IosbtnClick2();
  }
}



// js调安卓
function Androidtest() {
  window.SysClientJs.testJs($('.ab').attr("src"));
}
// 安卓调js
function test2() {

}
// js调用ios
function IosbtnClick2() {
  window.webkit.messageHandlers.showName.postMessage($('.ab').attr("src"));
}



// 获取安卓ios返回参数USERID
function loadBaiduAd() {
  $.ajax({
    url: baseUrl2 + "/comment/getBaiduAdInfo.json",
    // url:"https://app3.fx168api.com/small/news/getNewsByChannel.json?channelId=1",
    dataType: "jsonp",
    type: "GET",
    data: {

    },
    success: function(data) {
      var dataObj_ad = data.data;
      $('.baidu_gg').attr("id", "ad-broke" + brokerUserId);
      $.each(dataObj_ad, function(key, val) {
        if (key == brokerUserId) {
          BAIDU_CLB_fillSlot(val.adId, "ad-broke" + brokerUserId);
          $('.content_bottom_adv').show();
        }
      });
    }
  });

}
// 获取安卓ios返回参数USERID
function acceptToken(token) {
  loginToken = token;
}
// js调安卓方法拿USERID
function getTokenUserId() {
  if (isiOS) {
    window.webkit.messageHandlers.getTokenUserId.postMessage("123");
  } else if (isAndroid) {
    window.SysClientJs.getTokenUserId();
  }
}
