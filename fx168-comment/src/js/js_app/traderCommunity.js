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

///与app交互暴露window
window.initTabInfo = initTabInfo;
window.initDefaultTabShow = initDefaultTabShow;
window.initNewsTabContent = initNewsTabContent;
window.initClickTabCommentNav =initClickTabCommentNav;
window.initDefaultComment = initDefaultComment;
window.initCommentTabContent = initCommentTabContent;
window.initChildCommentGood = initChildCommentGood;
window.initChildCommentBad = initChildCommentBad;
window.ajaxGetBasicData = ajaxGetBasicData;
window.getBasicData = getBasicData;
window.scrollWindow = scrollWindow;
window.clickList = clickList;
window.likePlClick = likePlClick;
window.clickNewsData = clickNewsData;
window.Androidtest = Androidtest;
window.IosbtnClick2 = IosbtnClick2;
window.Androidtest2 = Androidtest2;
window.IosbtnClick3 = IosbtnClick3;
window.Androidnews = Androidnews;
window.Iosnews = Iosnews;
window.getTokenUserId = getTokenUserId;
window.initCreatloading = initCreatloading;
window.initCloseloading = initCloseloading;
window.initmessageloading = initmessageloading;
window.login = login;
window.returnTokenUserId = returnTokenUserId;
window.acceptToken = acceptToken;
window.transforNewsData = transforNewsData;
window.initShare  = initShare;
window.androidShare = androidShare;
window.iosShare = iosShare;
window.callJsConfirm=  callJsConfirm;
window.click_pl_box = click_pl_box;
window.androidReport =  androidReport;
window.iosReport = iosReport;
window.clickReport = clickReport;
window.importAjax = importAjax;
window.loadTraderScript = loadTraderScript;
window.getDetail = getDetail;

$(function() {
  returnTokenUserId("",brokerUserId);
  // returnTokenUserId();
  getTokenUserId();
  // jquery tab动效
  // tabAnimate ();
  // 滚动定位tab
  scrollWindow();
  $('.con_wrap .dp').hide();
  $('.foot-font').hide();
  $('.zwdp_ul').hide();
  //初始化tab导航

  initTabInfo();
  //初始化展现导航
  // loadTraderScript();
  initDefaultTabShow("#detailInfo");
  // 举报ajax
  importAjax();
  var v_height = $(document).height();
  $(window).scroll(function() {
    var scr_zzc = $(this).scrollTop();
    $(".import_zzc").css("top", scr_zzc + "px");
  });

});

function initTabInfo() {
  $(".tab ul li.tabNav").each(function() {
    var self = this;
    $(self).click(function(e) {
      e.preventDefault();
      var selected = $(".tab ul li.selected").attr("href");
      var tabContent = $(self).attr("href");
      if (selected == tabContent) {
        return;
      }

      $('.tab ul li.tabNav').removeClass("selected");
      $(self).addClass("selected");
      $('.silder').css("width", $(self).outerWidth());
      $('.silder').animate({
        "width": $(self).outerWidth(),
        "left": $(self).offset().left - 30
      }, 200);

      $(".tabContent .tabInfo").addClass("hidden");
      if ($(tabContent).attr("hasLoad") == "true") {} else {
        if (tabContent == "#detailInfo") {
          //初始化详细信息
          initDetailInfoTabContent();
        }
        if (tabContent == "#newsInfo") {
          //初始化最新动态
          initNewsTabContent();
        }
        if (tabContent == "#commentInfo") {
          //初始化评论
          initCommentTabContent();
        }
        $(tabContent).attr("hasLoad", "true");
      }
      $(tabContent).removeClass("hidden");

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
    // initDetailInfoTabContent();
  }
  if (tabContent == "#newsInfo") {
    //初始化最新动态
    initNewsTabContent();
  }
  if (tabContent == "#commentInfo") {
    //初始化评论
    initCommentTabContent();
  }
  $(tabContent).attr("hasLoad", "true");


}


//简介
function initNewsTabContent() {
  var pageNo = 1;
  var pageSize = 20;
  var result = "";
  $.ajax({
    type: 'GET',
    url: baseUrl2 + "comment/getAgentDetail.json",
    data: {
      agentUserId: brokerUserId
    },
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      var obj = data.data;
      if (obj == "") return false;
      var detailInformList = "";
      var arr = obj.brokerList;
      var siteImg = "";
      $.each(obj.agentIntro, function(key, val) {
        detailInformList += '<div class="inform">' +
          '<span class="inKey">' + key + "：" + '</span>' +
          '<span class="inVal">' + val + '</span>' +
          '</div>'

      });
      for (var i = 0; i < arr.length; i++) {
        siteImg += '<span class="a_site" userid=' + arr[i].userId + '>'
          // +'<div class="img_zzc">'+'</div>'
          +
          '<img class="logo_site lazy" data-original="' + arr[i].logo + '" src="' + require("../../img/img_app/benqi@2x.png") + '" />' + '<br/>' +
          '<span class="brokerName_site">' + arr[i].brokerName + '</span>' +
          '</span>'
      }
      var result = '<div class="jj_agentDesc">' + obj.agentDesc + '</div>' + detailInformList + '<div>' +
        '<p class="report_jjs">' +
        '<span class="report_border">' + '</span>' +
        '<span>' + "支持经纪商" + '</span>'

        +
        '</p>' +
        '<div class="siteImg_wrap">' +
        siteImg +
        '</div>'

        +
        '</div>';
      $('.newChild').html(result);

      var dragging = false;
      $('.a_site').on('touchstart', function(e) {
        dragging = false;
        $(this).find('.logo_site').addClass('img_zzc');
        // getDetail(jsonStr);
      });
      $('.a_site').on('touchmove', function(e) {
        dragging = true;
        $(this).find('.logo_site').removeClass('img_zzc');
        // getDetail(jsonStr);
      });
      $('.a_site').on('touchend', function(e) {
        if (dragging)
          return;
        else {　　　　　　 //在这里写入你touchend的触发事件
          var imgURL = $(this).find($('.logo_site')).attr("src");
          var title = $(this).find($('.brokerName_site')).html();
          var id = $(this).attr("userid");
          var jsonObj = {
            imgURL: imgURL, //0:不分享 1:分享
            title: title,
            id: id,
            type: 1,
            url: baseUrl + "/app/newinner.html",
          };

          var jsonStr = JSON.stringify(jsonObj);
          getDetail(jsonStr);
          $(this).find('.logo_site').removeClass('img_zzc');
        }

      });
      // $(".a_site").touchstart(function(){
      //   // $(this).find('.logo_site').addClass('img_zzc');

      // })
      if ($('.siteImg_wrap').html() == "") {
        $(".report_jjs").hide()
      } else {
        $(".report_jjs").show()
      }
      $("img.lazy").lazyload();
    }
  })
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
                '<p>' + "该交易社区暂无点评" + '<p/>'

                +
                '<div/>'
              $('#good').html(noDataImg);
              return;
            } else {}
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
              var showStyle = "";
              if (childCommentsArr[j].pics.length > 0) {
                showStyle = "iconShow";
              } else {
                showStyle = "iconHideen";
              }
              var huifuStyle = "";
              if (childCommentsArr[j].targetNickName != "") {
                huifuStyle = "huifuShow";
              } else {
                huifuStyle = "huifuHide";
              }
              childComments += '<ul>' +
                '<li>' +
                '<span class="nick" isGov="' + childCommentsArr[j].isGov + '">' + childCommentsArr[j].nickName + '</span>' +
                '<img class="isGov" src="' + require("../../img/img_app/guanfang@2x.png") + '" />' +
                '<span class="nickM">' + "：" + '</span>' +
                '<span class="huifu ' + huifuStyle + '">' + " 回复 " + '</span>' +
                '<span class="omyNick">' +
                childCommentsArr[j].targetNickName +
                '</span>'

                +
                '<span class="targetnickM ' + huifuStyle + '">' + "：" + '</span>' +
                '<span class="targContent">' + childCommentsArr[j].content + '</span>' +
                '<img class="icon ' + showStyle + '" src="' + require("../../img/img_app/picture@2x.png") + '" />'

                +
                '</li>'

                +
                '</ul>';
            }

            result += '<ul class="listWrap" data-id=' + perData.microblogId + ' data-src="' + perData.complainStatus + '" isGov="' + perData.isGov + '">' +
              '<img class="complain-img" src="" />' +
              '<li class="tile_img" dataIsComplain=' + perData.isComplain + ' >' +
              '<img class="lazy" data-original="' + perData.avatar + '" src="' + require("../../img/img_app/touxiang@2x.png") + '" />' +
              '</li>' +
              '<li class="listWrap_rig">' +
              '<div class="listWrap_rig_inner">' +
              '<div class="ListTile">' +
              '<p class="nickName">' + perData.nickName + '</p>' +
              '<p class="dateTime">' + perData.dateCreated + '</p>' +
              '</div>'

              +
              '<div class="outgolden_wrap">'

              // +'<div class="outgolden">'
              //     +'<p>'+"出金速度："+'<span>'+perData.outspeed+'</span>'+'</p>'
              //     +'<p>'+"服务态度："+'<span>'+perData.attitude+'</span>'+'</p>'

              // +'</div>'
              // +'<div class="outgolden2">'
              //     +'<p>'+"品牌形象："+'<span>'+perData.brand+'</span>'+'</p>'
              //     +'<p>'+"平台表现："+'<span>'+perData.platform+'</span>'+'</p>'

              // +'</div>'

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
              '<ul class="pl_box" a="true">' +
              '<li class="myJb" data-id=' + perData.microblogId + '>' +
              '<img src="' + require("../../img/img_app/jvbao@2x.png") + '" />' +
              '<span class="pl_box_font">' + "举报" + '</span>' +
              '</li>' +
              '<li class="likePl" data-id=' + perData.microblogId + '>' +
              '<img src="' + require("../../img/img_app/pinglun2@2x.png") + '" />' +
              '<span class="pl_box_font">' + "评论" + '</span>' +
              '</li>'

              +
              '</ul>' +
              '<span class="likeP2" dataId=' + perData.microblogId + '>' +
              '<img src="' + require("../../img/img_app/gengduo@2x.png") + '" />' +
              '</span>' +
              '</div>'

              +
              '</li>' +
              '</ul>';
            if ((dataList.length - 1) == i) {
              firstPubTime = perData.dateCreated;
            }
          }

          $("#good  .childCommentcontent").append(result);
          $("img.lazy").lazyload();
          click_pl_box(".likeP2", ".pl_box");
          clickReport();
          if (lock) {
            me.lock();
            me.noData();

          }

          // 官方显示评论颜色 图片
          for (var i = 0; i < $('.plChild').length; i++) {
            var $isGov = $('.nick').eq(i).attr("isGov");
            if ($isGov == 1) {
              // console.log(i);
              $('.nick').eq(i).css("color", "#fc780d");
              $('.isGov').eq(i).show();
            }
          }

          // 显示子评论iocn
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
                $(".outgolden_wrap").eq(i).hide();
                $('.complain-img').eq(i).hide();
              }

            } else {
              $(".outgolden_wrap").eq(i).hide();
            }

            if ($('.redStar').eq(i).attr("data-like") == 1) {

              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/success@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#f55256");
            } else {
              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/dianzan@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#666");
            }

            // 隐藏评论
            if ($('.del').eq(i).attr('haveDelAuth') != 1) {
              $('.del').eq(i).hide();
            }


          }


          // 删除

          $('.del img').click(function() {
            callJsConfirm();
            var index = $('.del img').index(this);
            var uId = $(this).attr("data-id");

            if (loginToken == undefined && loginToken == null && loginToken == "") {

              login();

            } else {

              if (isbol == true) {
                $.ajax({
                  type: 'GET',
                  url: baseUrl2 + "/comment/delComment.json",
                  data: {
                    "commentedObjectId": uId,
                    "t": loginToken
                  },
                  dataType: 'jsonp',
                  success: function(data) {
                    var status = null;
                    status = data.status;

                    if (status == 0) {
                      $('.listWrap').eq(index).hide();

                    } else if (status == 200) {
                      login();
                    }

                  }
                })
              }
            }
          })


          // 点赞
          var bolNum = null;
          var ismeLike = null;
          $('.like').unbind("click");
          $('.like').click(function() {
            initCreatloading();
            var uId = $(this).attr("data-id");
            ismeLike = $(this).attr("data-like");

            if (ismeLike == 1) {
              bolNum = true;
            } else {
              bolNum = false;
            }

            if (bolNum == false) {

              if (loginToken == undefined || loginToken == null || loginToken == "") {
                initCloseloading();
                login();


              } else {
                var This = $(this);
                $.ajax({
                  type: 'GET',
                  url: baseUrl2 + "/comment/likeCommentOpt.json",
                  data: {
                    "commentedObjectId": uId,
                    "t": loginToken
                  },
                  dataType: 'jsonp',
                  success: function(data) {

                    $('.like').bind("click");

                    var status = null;
                    status = data.status;


                    if (status == 0) {
                      suc = true;
                      This.attr("data-like", 1);
                      ismeLike = 0;
                      This.attr("src", "" + require("../../img/img_app/success@2x.png"));
                      var likeNum = 0;
                      var likeNum = parseInt(This.siblings().html());

                      This.siblings().html(likeNum + 1);
                      This.siblings().css("color", "#f55256");
                      if (This.siblings().html() <= 0) {
                        This.siblings().html(0);
                      }


                      initCloseloading();
                    } else if (status == 200) {

                      initCloseloading();
                      login();
                    } else {

                      initCloseloading();
                      initmessageloading("点赞失败,请稍后重试");

                    }

                  },
                  error: function(data) {
                    initCloseloading();
                    initmessageloading("网络连接异常,请稍后重试");

                  }
                })
              }

            } else if (bolNum == true) {


              if (loginToken == undefined && loginToken == null && loginToken == "") {

                login();

              } else {
                var This = $(this);
                $.ajax({
                  type: 'GET',
                  url: baseUrl2 + "/comment/likeCommentOpt.json",
                  data: {
                    "commentedObjectId": uId,
                    // "ip":"192.168.30.172",
                    "t": loginToken
                  },
                  dataType: 'jsonp',
                  success: function(data) {
                    $('.like').bind("click");
                    var status = null;
                    status = data.status;
                    if (status == 0) {
                      This.attr("data-like", 0);

                      This.attr('')
                      This.attr("src", "" + require("../../img/img_app/dianzan@2x.png"));
                      var likeNum = 0;
                      var likeNum = parseInt(This.siblings().html());
                      This.siblings().html(likeNum - 1);
                      This.siblings().css("color", "#666")
                      if (This.siblings().html() <= 0) {
                        This.siblings().html() == 0;
                      }

                      initCloseloading();
                    } else if (status == 200) {

                      initCloseloading();
                      login();
                    } else {

                      initCloseloading();
                      initmessageloading("点赞失败,请稍后重试");

                    }


                  },
                  error: function(data) {
                    initCloseloading();
                    initmessageloading("网络连接异常,请稍后重试");
                  }
                })
              }
            }

          })


          // 因为没下拉一次就会绑定一次 所以下拉前线接触绑定
          $('.listWrap_rig_inner').unbind("click");
          $('.likePl').unbind("click");
          // 点击列表
          clickList();
          likePlClick()
          me.resetload();


        }
      })
    }
  })


}



//差评

function initChildCommentBad() {

  var pageNo = 0;
  var firstPubTime = "";
  var pageSize = 20;
  var isComplain = 1;

  var droploadCommentBad = $('#bad').dropload({
    scrollArea: window,
    domDown: {
      domClass: 'dropload-down2',
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
                '<p>' + "该交易社区暂无差评" + '<p/>'

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
          var isPic = null;
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
              var showStyle = "";
              if (childCommentsArr[j].pics.length > 0) {
                showStyle = "iconShow";

              } else {
                showStyle = "iconHideen";
              }

              var huifuStyle = "";
              if (childCommentsArr[j].targetNickName != "") {
                huifuStyle = "huifuShow";
              } else {
                huifuStyle = "huifuHide";
              }
              childComments += '<ul>' +
                '<li>' +
                '<span class="nick" isGov="' + childCommentsArr[j].isGov + '">' + childCommentsArr[j].nickName + '</span>' +
                '<img class="isGov" src="' + require("../../img/img_app/guanfang@2x.png") + '" />' +
                '<span class="nickM">' + "：" + '</span>' +
                '<span class="huifu">' + " 回复 " + '</span>' +
                '<span class="omyNick ' + huifuStyle + '">' +
                childCommentsArr[j].targetNickName +
                '</span>'

                +
                '<span class="targetnickM ' + huifuStyle + '">' + "：" + '</span>' +
                '<span class="targContent">' + childCommentsArr[j].content + '</span>' +
                '<img class="icon ' + showStyle + '" src="' + require("../../img/img_app/picture@2x.png") + '" />'

                +
                '</li>'

                +
                '</ul>';
            }



            result += '<ul class="listWrap" data-id=' + perData.microblogId + ' data-src="' + perData.complainStatus + '" isGov="' + perData.isGov + '">' +
              '<img class="complain-img" src="" />' +
              '<li class="tile_img" dataIsComplain=' + perData.isComplain + ' >' +
              '<img class="lazy" data-original="' + perData.avatar + '" src="' + require("../../img/img_app/touxiang@2x.png") + '" />' +
              '</li>' +
              '<li class="listWrap_rig">'

              +
              '<div class="listWrap_rig_inner">'



              +
              '<div class="ListTile">' +
              '<p class="nickName">' + perData.nickName + '</p>' +
              '<p class="dateTime">' + perData.dateCreated + '</p>' +
              '</div>' +
              '<div class="outgolden_wrap">'

              +
              '</div>' +
              '<div class="plCon">' + perData.content + '</div>' +
              '<div class="plImg">' + imgs + '</div>' +
              '<div class="plChild">' +
              childComments +
              '</div>' +
              '<p class="morePl">' +
              "更多评论" +
              '</p>' +
              '</div>' +
              '<div class="deleAndClick">' +
              '<span class="del"  haveDelAuth=' + perData.haveDelAuth + '>' +
              '<img data-id=' + perData.microblogId + ' src="' + require("../../img/img_app/shanchu@2x.png") + '" />' +
              '</span>' +
              '<span class="redStar" data-like=' + perData.isMeLike + '>' +
              '<img src="' + require("../../img/img_app/success@2x.png") + '" class="like" data-id="' + perData.microblogId + '" data-like="' + dataList[i].isMeLike + '"/>' +
              '<span class="like_num">' + perData.likeCount + '</span>' +
              '</span>' +
              '<ul class="pl_box2" a="true">' +
              '<li class="myJb" data-id=' + perData.microblogId + '>' +
              '<img src="' + require("../../img/img_app/jvbao@2x.png") + '" />' +
              '<span class="pl_box_font">' + "举报" + '</span>' +
              '</li>' +
              '<li class="likePl" data-id=' + perData.microblogId + '>' +
              '<img src="' + require("../../img/img_app/pinglun2@2x.png") + '" />' +
              '<span class="pl_box_font">' + "评论" + '</span>' +
              '</li>' +
              '</ul>' +
              '<span class="likeP22" dataId=' + perData.microblogId + '>' +
              '<img src="' + require("../../img/img_app/gengduo@2x.png") + '" />' +
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
          $("img.lazy").lazyload();
          click_pl_box(".likeP22", ".pl_box2");
          clickReport();
          if (lock) {
            me.lock();
            me.noData();
          }


          // 官方显示评论颜色 图片
          for (var i = 0; i < $('.plChild').length; i++) {
            var $isGov = $('.nick').eq(i).attr("isGov");
            if ($isGov == 1) {
              // console.log(i);
              $('.nick').eq(i).css("color", "#fc780d");
              $('.isGov').eq(i).show();
            }
          }


          // 显示子评论iocn
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
            } else {
              $(".outgolden_wrap").eq(i).hide();
            }

            if ($('.redStar').eq(i).attr("data-like") == 1) {
              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/success@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#f55256");
            } else {
              $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/dianzan@2x.png"));
              $('.redStar .like_num').eq(i).css("color", "#666");
            }

            // 隐藏评论
            if ($('.del').eq(i).attr('haveDelAuth') != 1) {
              $('.del').eq(i).hide();
            }


          }


          // 删除

          $('.del img').click(function() {


            callJsConfirm();

            var index = $('.del img').index(this);
            var uId = $(this).attr("data-id");
            if (loginToken == undefined && loginToken == null && loginToken == "") {

              login();

            } else {
              if (isbol == true) {
                $.ajax({
                  type: 'GET',
                  url: baseUrl2 + "/comment/delComment.json",
                  data: {
                    "commentedObjectId": uId,
                    "t": loginToken
                  },
                  dataType: 'jsonp',
                  success: function(data) {
                    var status = null;
                    status = data.status;
                    if (status == 0) {
                      $('.listWrap').eq(index).hide();
                    } else if (status == 200) {
                      login();
                    }

                  }
                })
              }
            }
          })


          // 点赞
          var bolNum = null;
          var ismeLike = null;
          $('.like').unbind("click");
          $('.like').click(function() {
            initCreatloading();
            var uId = $(this).attr("data-id");
            ismeLike = $(this).attr("data-like");

            if (ismeLike == 1) {
              bolNum = true;
            } else {
              bolNum = false;
            }
            if (bolNum == false) {
              if (loginToken == undefined || loginToken == null || loginToken == "") {
                initCloseloading();
                login();


              } else {
                var This = $(this);
                $.ajax({
                  type: 'GET',
                  url: baseUrl2 + "/comment/likeCommentOpt.json",
                  data: {
                    "commentedObjectId": uId,
                    "t": loginToken
                  },
                  dataType: 'jsonp',
                  success: function(data) {
                    $('.like').bind("click");
                    var status = null;
                    status = data.status;
                    if (status == 0) {
                      suc = true;
                      This.attr("data-like", 1);
                      ismeLike = 0;
                      This.attr("src", "" + require("../../img/img_app/success@2x.png"));
                      var likeNum = 0;
                      var likeNum = parseInt(This.siblings().html());
                      This.siblings().html(likeNum + 1);
                      This.siblings().css("color", "#f55256");
                      if (This.siblings().html() <= 0) {
                        This.siblings().html(0);
                      }
                      initCloseloading();
                    } else if (status == 200) {

                      initCloseloading();
                      login();
                    } else {
                      initCloseloading();
                      initmessageloading("点赞失败,请稍后重试");
                    }

                  },
                  error: function(data) {
                    initCloseloading();
                    initmessageloading("网络连接异常,请稍后重试");
                  }
                })
              }

            } else if (bolNum == true) {
              if (loginToken == undefined && loginToken == null && loginToken == "") {

                login();

              } else {
                var This = $(this);
                $.ajax({
                  type: 'GET',
                  url: baseUrl2 + "/comment/likeCommentOpt.json",
                  data: {
                    "commentedObjectId": uId,
                    // "ip":"192.168.30.172",
                    "t": loginToken
                  },
                  dataType: 'jsonp',
                  success: function(data) {
                    $('.like').bind("click");
                    var status = null;
                    status = data.status;
                    if (status == 0) {
                      This.attr("data-like", 0);
                      This.attr('')
                      This.attr("src", "" + require("../../img/img_app/dianzan@2x.png"));
                      var likeNum = 0;
                      var likeNum = parseInt(This.siblings().html());
                      This.siblings().html(likeNum - 1);
                      This.siblings().css("color", "#666")
                      if (This.siblings().html() <= 0) {

                        This.siblings().html() == 0;
                      }

                      initCloseloading();
                    } else if (status == 200) {

                      initCloseloading();
                      login();
                    } else {

                      initCloseloading();
                      initmessageloading("点赞失败,请稍后重试");

                    }

                  },
                  error: function(data) {

                    initCloseloading();
                    initmessageloading("网络连接异常,请稍后重试");
                  }
                })
              }
            }

          })
          $('.listWrap_rig_inner').unbind("click");
          $('.likePl').unbind("click");
          // 点击列表
          clickList();
          likePlClick()

          me.resetload();






        }
      })
    }
  })



}




// function baidu_adv(){
//      $.ajax({
//         url: baseUrl2+"/comment/getBaiduAdInfo.json",
//         // url:"https://app3.fx168api.com/small/news/getNewsByChannel.json?channelId=1",
//         dataType: "jsonp",
//         type: "GET",
//         data:{

//         },
//         success: function(data){
//            var baidugg_idNmae=$('.baidu_gg').attr("id");

//         }

//     })

// };







// 获取经纪商基本信息ajax方法
function ajaxGetBasicData() {
  $.ajax({
    url: baseUrl2 + "/comment/getAgentInfo.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      "agentUserId": brokerUserId
    },
    success: getBasicData,

  });
}


// 获取经纪商基本信息方法
function getBasicData(data) {
  // console.log(data);
  var arrList = [];
  arrList = data.data;
  var logoUrl = arrList.logo;
  var tile = arrList.agentName;
  var keyWords = arrList.keyWords;
  var result = "";
  var haveNews = arrList.haveNews;
  if (typeof arrList != undefined || arrList != null || arrList != "") {
    $('header,.content').show();
    $('.news-logo-img').attr("data-original", logoUrl);
    $("img.lazy").lazyload();
    $('.news-title').html(tile);
    $('.outspeed').html(arrList.microblogOutspeed);
    $('.attitude').html(arrList.microblogAttitude);
    $('.brand').html(arrList.microblogBrand);
    $('.platform').html(arrList.microblogPlatform);
    $('.complex').html(arrList.complex);
    $('.myPL span').html("(" + arrList.commentCount + ")");
    if (arrList.evaluation == "") {
      $('.content_bottom_cp_url').hide();
    } else {
      $('.content_bottom_cp_url').attr("href", arrList.evaluation.url);
    }

    $('.pmNum').html(arrList.rank);
    for (var i = 0; i < (keyWords.length > 5 ? 5 : keyWords.length); i++) {
      result += '<span>' + keyWords[i] + '</span>'
    }
    $('.content_top').append(result);
    // 如果keyWords为空 去掉父级容器
    if (keyWords.length == 0) {
      $('.content_top').remove();
    }
    if (arrList.isVip == 1) {
      $('.head_wrap').css('background-image', 'url(' + require("../../img/img_app/select-bg.png") + ')');
      var flag = "";
      flag = '<img src="' + require("../../img/img_app/guanfang@2x.png") + '" />'
      $('.inner_isFlag').append(flag);
      $('.news-title').append($('.inner_isFlag'));
      $('.title_bar_isVip').html(flag);
    } else {
      $('.head_wrap').css('background-image', 'url(' + require("../../img/img_app/@2x.png") + ')');
      $('.title_bar_isVip').html("");
    }

    if (arrList.isAuth == 1) {
      var inAuth = "";
      isAuth = '<img class="in_isAutho" src="' + require("../../img/img_app/renzheng@2x.png") + '" />'
      $('.inner_isFlag').append(isAuth);
    }
  }

  // 分享
  var shareJson = {
    isShare: 1, //0:不分享 1:分享
    shareTitle: tile,
    shareUrl: baseUrl + "/app/traderShare.html?brokerUserId=" + brokerUserId,
    shareImage: logoUrl,
    shareContent: "给你推荐一个交易社区，去看看大家对它的评价吧"
  };
  initShare(shareJson);
  //是否有新闻 官方有新闻



}



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
        "z-index": 100,

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
// 点击评论

function clickList() {
  $('.listWrap_rig_inner').click(function() {
    var index = $(this).index();
    var id = $(this).parent().parent().attr("data-id");
    var commentDetailJson = {
      "id": id,
      "brokerUserId": brokerUserId,
      "type": 2
    }
    var jsonStr = JSON.stringify(commentDetailJson);
    if (isAndroid) {
      Androidtest(jsonStr);
    } else if (isiOS) {
      IosbtnClick2(jsonStr);
    }


  })
}
// 点击跳评论内页
function likePlClick() {
  $('.likePl').click(function() {
    var id = $(this).attr("data-id");
    // alert(id);
    var dptDetailJson = {
      "id": id,
      "brokerUserId": brokerUserId,
      "type": 2
    }
    var jsonStr2 = JSON.stringify(dptDetailJson);
    if (isAndroid) {
      Androidtest2(jsonStr2);
    } else if (isiOS) {
      IosbtnClick3(jsonStr2);
    }

    $(this).parent().addClass('aminte-active-hide');
    $(this).parent().css('display', 'none');
    $(this).parent().removeClass('aminte-active-show');
    $(this).parent().attr("a", 'true')

  })

}
// 点击新闻
function clickNewsData() {
  $('.oli2').click(function() {
    $(this).find($('.news_tile_p')).css("color", "#999")
    var id = $(this).attr("newsId");
    if (isAndroid) {
      Androidnews(id);
    } else if (isiOS) {
      Iosnews(id);
    }
  })
}

// js调安卓点评
function Androidtest(e) {
  window.SysClientJs.commentDetail(e);
}
// js调用ios点评
function IosbtnClick2(e) {
  if(window.webkit&&window.webkit.messageHandlers){
    window.webkit.messageHandlers.commentDetail.postMessage(e);
  }
}
// js调安卓评论
function Androidtest2(e) {
  window.SysClientJs.dptDetailJson(e);
}
// js调用ios评论
function IosbtnClick3(e) {
  if(window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.dptDetailJson.postMessage(e);
  }
}

// js调安卓新闻
function Androidnews(e) {
  window.SysClientJs.newsDetail(e);
}
// js调用ios新闻
function Iosnews(e) {
  if(window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.newsDetail.postMessage(e);
  }
}


// js调安卓方法拿USERID
function getTokenUserId() {
  if (isiOS && window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.getTokenUserId.postMessage("123");
  } else if (isAndroid && window.SysClientJs) {
    window.SysClientJs.getTokenUserId();
  }
}

// 点赞请求调用app加载
function initCreatloading() {
  if (isiOS && window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.beforeLoading.postMessage("123");
  } else if (isAndroid) {
    window.SysClientJs.beforeLoading("");
  }
}

function initCloseloading() {
  if (isiOS && window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.afterLoading.postMessage("123");
  } else if (isAndroid) {
    window.SysClientJs.afterLoading();
  }
}

function initmessageloading(messsage) {
  if (isiOS && window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.messageLoading.postMessage(messsage);
  } else if (isAndroid) {
    window.SysClientJs.messageLoading(messsage);
  }
}
// 调app登陆方法
function login() {
  if (isiOS && window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.needToLogin.postMessage("");
  } else if (isAndroid) {
    window.SysClientJs.needToLogin();
  }


}

// 获取安卓ios返回参数USERID
function returnTokenUserId(token, userId) {
  // brokerUserId=userId;
  loginToken = token;
  brokerUserId = userId
  // loginToken="";
  ajaxGetBasicData();
  var baiduAd_key = [];
  var baiduAd_val = [];
  $.ajax({
    url: baseUrl2 + "/comment/getBaiduAdInfo.json",
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
      })
    }

  });
  loadTraderScript();

}
// 获取安卓ios返回参数USERID
function acceptToken(token) {
  loginToken = token;
}

function transforNewsData() {
  if (isiOS) {
    window.webkit.messageHandlers.getNewsData.postMessage("123");
  } else if (isAndroid) {
    window.SysClientJs.getNewsData();
  }
}


function initShare(shareJson) {
  var m = $.extend({}, shareJson);
  var s = JSON.stringify(m);
  if (isAndroid) {
    androidShare(s);
  } else if (isiOS) {
    iosShare(s);
  }
}
//分享测试
function androidShare(shareJson) {
  window.SysClientJs.shareJs(shareJson);
}


function iosShare(shareJson) {
  if(window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.shareJs.postMessage(shareJson);
  }
}
// 删除评论 弹出框
var isbol = null;

function callJsConfirm() {
  if (confirm('是否删除', 'Objective-C call js to show confirm')) {
    isbol = true;
  } else {
    isbol = false;
  }
}

// 伸缩评论盒子
function click_pl_box(select, box) {

  $('body').click(function() {

    $(box).addClass('aminte-active-hide');
    $(box).css('display', 'none');
    $(box).removeClass('aminte-active-show');
    $(box).attr("a", 'true')
  })

  var id = null;

  $(select).click(function(e) {
    e.stopPropagation();
    var flag = $(this).prev().attr("a");

    if (id != null) {
      if (id == $(this).attr("dataId")) {

        if (flag == 'true') {



          $(this).prev().addClass('aminte-active-show');

          $(this).prev().css('display', '-webkit-box');
          $(this).prev().css('display', '-webkit-flex');
          $(this).prev().css('display', '-ms-flexbox');
          $(this).prev().css('display', 'flex');


          $(this).prev().removeClass('aminte-active-hide');

          $(this).prev().attr("a", 'false');


        } else if (flag == 'false') {

          $(this).prev().addClass('aminte-active-hide');
          $(this).prev().css('display', 'none');
          $(this).prev().removeClass('aminte-active-show');
          $(this).prev().attr("a", 'true')
        }

      } else {

        id = $(this).attr("dataId");
        for (var i = 0; i < $(box).length; i++) {
          if ($(box).eq(i).hasClass('aminte-active-show')) {
            $(box).eq(i).removeClass('aminte-active-show');
            $(box).eq(i).addClass('aminte-active-hide');
            $(box).eq(i).css('display', 'none');
            $(box).eq(i).attr("a", 'true');
            // oswitch=$(this).prev().attr("a");


          }

        }
        $(this).prev().addClass('aminte-active-show');
        $(this).prev().css('display', '-webkit-box');
        $(this).prev().css('display', '-webkit-flex');
        $(this).prev().css('display', '-ms-flexbox');
        $(this).prev().css('display', 'flex');



        $(this).prev().removeClass('aminte-active-hide');
        $(this).prev().attr("a", 'false')
      }


    } else {

      id = $(this).attr("dataId");
      $(this).prev().addClass('aminte-active-show');

      $(this).prev().css('display', '-webkit-box');
      $(this).prev().css('display', '-webkit-flex');
      $(this).prev().css('display', '-ms-flexbox');
      $(this).prev().css('display', 'flex');
      $(this).prev().removeClass('aminte-active-hide');
      $(this).prev().attr("a", 'false')

    }

  });
}

// 举报
// function Report (ReportData) {
//     if (isAndroid) {
//         androidReport(ReportData);
//     }else if (isiOS) {
//         iosReport(ReportData);
//     }
// }

function androidReport(ReportData) {
  window.SysClientJs.report(ReportData);
}


function iosReport(ReportData) {
  if(window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.report.postMessage(ReportData);
  }
}
var targetId = "";
var targetContent = "";

function clickReport() {
  $('.myJb').click(function() {
    $(".import_inner").show();
    // $("body").addClass('import_body');
    $(document).on('touchmove', function(event) {
      event.preventDefault();

    });
    $('.import_zzc').show();
    var Data = $(this).attr("data-id");
    targetId = Data;
    var content = $(this).parent().parent().prev().find($('.plCon')).html();
    targetContent = content;
    var reportJson = {
      Data: Data,
      content: content
    }
    var rep = $.extend({}, reportJson);
    var reps = JSON.stringify(rep);
    // Report (reps);
    $(this).parent().addClass('aminte-active-hide');
    $(this).parent().css('display', 'none');
    $(this).parent().removeClass('aminte-active-show');
    $(this).parent().attr("a", 'true')
  })
}

function importAjax() {
  $.ajax({
    type: 'GET',
    url: baseUrl2 + "/userCenter/getTipTypeMap.json",
    dataType: 'jsonp',
    success: function(data) {

      var import_lable = "";
      var arr = data.data;
      var input_val = "";
      var input_tipType = 5;
      for (var i = 0; i < arr.length; i++) {
        import_lable += '<span class="import_lable_select" value="' + arr[i].value + '">' + arr[i].dispName + '</span>'
      }
      $(".import_box").append(import_lable);
      $(".import_lable_select").click(function() {
        $(".import_lable_select").removeClass('select_import');
        $(this).addClass('select_import');
        input_tipType = $(this).attr("value")

      });
      $('.import_cancle').click(function() {
        targetId = 5;
        $('.import_text input').val("");
        $(".import_lable_select").removeClass('select_import');
        $('.import_inner').hide();
        $('.import_zzc').hide();
        // $("body").removeClass('import_body');
        $(document).unbind("touchmove");

      });
      $('.import_text input').blur(function() {
        input_val = $(this).val();
      });
      $('.import_sub').click(function() {
        $(document).unbind("touchmove");
        $('.import_text input').val("");
        $(".import_lable_select").removeClass('select_import');
        $('.import_zzc').hide();
        // $("body").removeClass('import_body');
        $.ajax({
          type: 'GET',
          url: baseUrl2 + "/userCenter/commitTipInfo.json",
          dataType: 'jsonp',
          data: {
            sourceFrom: 1,
            content: input_val,
            tipType: input_tipType,
            targetId: targetId,
            targetContent: targetContent,
          },
          success: function(data) {
            if (data.status == 400) {
              initCreatloading();
              initmessageloading(data.msg);
              initCloseloading();
            } else if (data.status == 0) {
              initCreatloading();
              initmessageloading(data.data);
              initCloseloading();
            }
            $('.import_inner').hide();
          },
          error: function(data) {
            $('.import_inner').hide();
            initCreatloading();
            initmessageloading("提交失败,请稍后再试");
            initCloseloading();

          }
        });
      })

    }
  })

}
// beta环境
function loadTraderScript() {
  //Formax:1888488950828     老虎外汇:1890937206101
  if (brokerUserId == 1888481071581) {
    //reloadAbleJSFn("selScript","../js/js_app/trader/dbh.js");//1888481071581 测试1889923377129
    require("./trader/dbh.js");
  } else if (brokerUserId == 1888470814418) {
    // reloadAbleJSFn("selScript","../js/js_app/trader/followMe.js");//1888470814418 测试1884016342387
    require("./trader/followMe.js")
  } else if (brokerUserId == 1888447284054) {
    // reloadAbleJSFn("selScript","../js/js_app/trader/tzyx.js");//1888447284054 测试1884070301682
    require("./trader/tzyx.js")
  } else if (brokerUserId == 1908071400227) {
    // reloadAbleJSFn("selScript","../js/js_app/trader/jyj.js");//1908071400227 测试1889968627570
    require("./trader/jyj.js");
  } else {
    // reloadAbleJSFn("selScript","../js/js_app/trader/elseTrader.js");
    require("./trader/elseTrader.js")
  }

}

// 测试 190环境
//function loadTraderScript(){
////Formax:1888488950828     老虎外汇:1890937206101
//  if (brokerUserId==1889923377129) {
//      reloadAbleJSFn("selScript","../js/js_app/trader/dbh.js");//1888481071581 测试1889923377129
//  }else if(brokerUserId==1884016342387){
//      reloadAbleJSFn("selScript","../js/js_app/trader/followMe.js");//1888470814418 测试1884016342387
//  }else if(brokerUserId==1884070301682){
//      reloadAbleJSFn("selScript","../js/js_app/trader/tzyx.js");//1888447284054 测试1884070301682
//  }else if(brokerUserId==1889968627570){
//      reloadAbleJSFn("selScript","../js/js_app/trader/jyj.js");//1908071400227 测试1889968627570
//  }
//  else{
//      reloadAbleJSFn("selScript","../js/js_app/trader/elseTrader.js");
//  }
//
//}
// 动态加载js
function reloadAbleJSFn(id, newJS) {
  var oldjs = null;
  var t = null;
  var oldjs = document.getElementById(id);
  if (oldjs) oldjs.parentNode.removeChild(oldjs);
  var scriptObj = document.createElement("script");
  scriptObj.src = newJS;
  scriptObj.type = "text/javascript";
  scriptObj.id = id;
  // document.getElementsByTagName("head")[0].appendChild("");
  document.getElementsByTagName("head")[0].appendChild(scriptObj);
}
// 点击经纪商列表传参数
function getDetail(str) {
  if (isiOS) {
    window.webkit.messageHandlers.intoDetail.postMessage(str);
  } else if (isAndroid) {
    window.SysClientJs.intoDetail(str);
  }
}
