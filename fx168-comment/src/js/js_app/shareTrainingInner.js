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
var loginToken = "";//登陆状态token
var brokerUserId = typeof getQueryString == 'function' ? getQueryString("brokerUserId") : null;


function showMore(obj) {
    var this2 = $(obj).parent().children(".descInfos");
    if(this2.css("overflow") == 'hidden'){
        this2.addClass("addShow");
        this2.removeClass("addHidden");
        $(obj).text("收起");
    }else{
        this2.removeClass("addShow");
        this2.addClass("addHidden");
        $(obj).text("查看更多");

    }
}

//获取培训机构基本信息
function getTrainingSchoolInfo() {
    $.ajax({
        url: baseUrl2 + "/comment/getTrainingSchoolInfo.json",
        dataType: "jsonp",
        type: "GET",
        data: {
            "userId": brokerUserId
        },
        success: getBasicData,

    });
}


// 获取经纪商基本信息方法
function getBasicData(data) {
    var arrList = [];
    arrList = data.data;
    var logoUrl = arrList.logo;
    var tile = arrList.name;
    var keyWords = arrList.keyWords;
    var result = "";
    var haveNews = arrList.haveNews;
    if (typeof arrList != undefined || arrList != null || arrList != "") {
        $('header,.content').show();
        $('.news-logo-img').attr("data-original", logoUrl);
        $("img.lazy").lazyload();
        $('.news-title').html(tile);
        $('.outspeed').html(arrList.teacherScore);
        $('.attitude').html(arrList.serviceScore);
        $('.brand').html(arrList.policyScore);
        $('.platform').html(arrList.classScore);
        $('.complex').html(arrList.colligateScore);
        $('.descDetail').html(arrList.desc);
        $('.foot-font-tile').html(tile);
        $('.foot-font').show();
        $('.myPL span').html("(" + arrList.commentCount + ")");
        if (arrList.evaluation == "") {
            $('.content_bottom_cp_url').hide();
        } else {
            $('.content_bottom_cp_url').attr("href", arrList.evaluation.url);
        }

      //  $('.pmNum').html(arrList.rank);
        for (var i = 0; i < keyWords.length; i++) {
            result += '<span>' + keyWords[i] + '</span>'
        }
        $('.content_top').append(result);
        // 如果keyWords为空 去掉父级容器
        if (keyWords.length == 0) {
            $('.content_top').remove();
        }
        if (arrList.isFlagship == 1) {
            $('.head_wrap').css('background-image', 'url('+ require("../../img/img_app/Vguanfang@2x.png")+')');
            var flag = "";
            flag = '<img src="'+ require("../../img/img_app/guanfang@2x.png")+'" />'
            $('.inner_isFlag').append(flag);
            $('.news-title').append($('.inner_isFlag'));
        } else {
            $('.head_wrap').css('background-image', 'url('+ require("../../img/img_app/zhengchang@2x.png")+')');
        }

        if (arrList.isAuth == 1) {
            var inAuth = "";
            isAuth = '<img class="in_isAutho" src="'+ require("../../img/img_app/renzheng@2x.png")+'" />'
            $('.inner_isFlag').append(isAuth);
        }
    }

}


// 滚动定位tab
function scrollWindow() {

    var scrollTop = 0;
    $(window).scroll(function () {
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
// 点击评论
// 获取安卓ios返回参数USERID
function returnTokenUserId(token, userId) {
    // brokerUserId=userId;
    loginToken = token;
    brokerUserId = userId
    // loginToken="";
    getTrainingSchoolInfo();


    var baiduAd_key = [];
    var baiduAd_val = [];
    $.ajax({
        url: baseUrl2 + "/comment/getBaiduAdInfo.json",
        dataType: "jsonp",
        type: "GET",
        data: {},
        success: function (data) {
            var dataObj_ad = data.data;
            $('.baidu_gg').attr("id", "ad-broke" + brokerUserId);
            $.each(dataObj_ad, function (key, val) {
                if (key == brokerUserId) {
                    BAIDU_CLB_fillSlot(val.adId, "ad-broke" + brokerUserId);
                    $('.content_bottom_adv').show();
                }
            })
        }
    })
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
    $('body').click(function () {
        // alert("1111");
        $(box).addClass('aminte-active-hide');
        $(box).css('display', 'none');
        $(box).removeClass('aminte-active-show');
        $(box).attr("a", 'true')
    })
    var id = null;

    $(select).click(function (e) {
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
                    $(this).prev().attr("a", 'true');
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
                $(this).prev().attr("a", 'false');
            }


        } else {
            id = $(this).attr("dataId");
            $(this).prev().addClass('aminte-active-show');
            $(this).prev().css('display', '-webkit-box');
            $(this).prev().css('display', '-webkit-flex');
            $(this).prev().css('display', '-ms-flexbox');
            $(this).prev().css('display', 'flex');
            $(this).prev().removeClass('aminte-active-hide');
            $(this).prev().attr("a", 'false');

        }

    });
}



var targetId = "";
var targetContent = ""

$(function () {

    //window.brokerUserId = '1918508987381';
    //window.brokerUserId = getQueryString("brokerUserId");
    returnTokenUserId("", brokerUserId);
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
    initDefaultTabShow("#teachInfo");

    // 举报ajax
    //importAjax();

    var v_height = $(document).height();
    $(window).scroll(function () {
        // console.log($(this).scrollTop());
        var scr_zzc = $(this).scrollTop();
        // $(".import_zzc").height()
        // console.log($(".import_zzc").height()+scr_zzc)
        $(".import_zzc").css("top", scr_zzc + "px")
    });


    function initTabInfo() {

        $(".tab ul li.tabNav").each(function () {


            var self = this;
            $(self).click(function (e) {
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
                    "left": $(self).offset().left - 50
                }, 200);

                $(".tabContent .tabInfo").addClass("hidden");

                if ($(tabContent).attr("hasLoad") == "true") {

                } else {
                    if (tabContent == "#teachInfo") {
                        //初始化详细信息
                        getTeacherList();
                    }


                    if (tabContent == "#articleInfo") {
                        //初始化最新动态
                        initChangeTabContent();

                    }

                    if (tabContent == "#descInfo") {
                        //初始化最新动态
                        //initNewsTabContent();

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
            "left": $(self).offset().left-50
        }, 200);


        $(tabPosition).removeClass("hidden");
        var tabContent = tabPosition;
        if (tabContent == "#teachInfo") {
            //初始化详细信息
            //initDetailInfoTabContent();
            getTeacherList();

        }


        if (tabContent == "#articleInfo") {
            //初始化最新动态
            initChangeTabContent();

        }

        if (tabContent == "#descInfo") {
            //初始化最新动态
            //initNewsTabContent();

        }

        if (tabContent == "#commentInfo") {
            //初始化评论
            initCommentTabContent();

        }

        $(tabContent).attr("hasLoad", "true");


    }

    //学院讲师信息
    function getTeacherList() {

        // var droploadCommentDetailInfo = $('#teachInfo').dropload({
        //     scrollArea: window,
        //     loadDownFn: function (me) {
        console.log( "brokerUserId=="+brokerUserId);

        $.ajax({
                    type: 'GET',
                    url: baseUrl2 + "/comment/getTeacherList.json",
                    data: {
                        "userId": brokerUserId
                    },
                    dataType: 'jsonp',
                    success: function (data) {

                        var arr = data.data.teacherList;
                        var result = '';
                        var isLock = true;

                        if (arr == "" || arr == null || arr.length == 0) {


                        }else if (arr.length == 20) {
                            isLock = false;
                        }

                        var len = 60;  //默认显示字数

                        for (var i = 0; i < arr.length; i++) {

                            var desc = arr[i].desc;
                            var len =60;
                            var showDesc="";
                            result += ' <div class="teachInfo clearfix" >'
                                +'<div class="teachContent2">'
                                + '<img  class="teachLogo"   src="' + arr[i].avatar + '"  alt="">'
                                +'</div>'
                                + '<div class="teachContent">'
                                + '<span class="nameInfo">' + arr[i].teacherName + '</span>'
                              //  + '<div class="showHidde">'
                                + '<p class="descInfos addHidden">' + desc + '</p>'
                              + '<span class="seeMore lookupMore" >'+'查看更多'+'</span>'
                             //   +'</div>'
                                + '</div>'
                                + '</div>';
                        }

                        $('.detailInfoChild').append(result);

                        // if (isLock) {
                        //     // 锁定
                        //     me.lock();
                        //     // 无数据
                        //     me.noData();
                        // }
                        // // 数据加载完重置
                        // me.resetload();
                    }


                });
        //     }
        // })


    }




    //最新新闻
    function getTrainingSchoolNewsList() {


        var pageNo = 0;
        var pageSize = 20;
        var result = "";
        var droploadNews = $('#article').dropload({
            scrollArea: window,
            loadDownFn: function (me) {

                pageNo++;


                $.ajax({
                    type: 'GET',
                    url: baseUrl2 + "/comment/getTrainingSchoolNewsList.json",
                    data: {
                        "userId": brokerUserId,
                        "pageSize": pageSize,
                        "pageNo": pageNo,
                    },
                    dataType: 'jsonp',
                    success: function (data) {

                        var arr = data.data.newsList;
                        var isLock = true;
                        if (arr.length == pageSize) {
                            isLock = false;
                        }

                        if (arr == "" || arr == null || arr.length == 0) {

                            if (pageNo == 1) {
                                var noDataImg = '<div class="noImgWrap">'
                                    + '<img src="'+ require("../../img/img_app/innerZwpl@2x.png")+'" />'
                                    + '<p>' + "暂无相关信息" + '<p/>'
                                    + '<div/>'
                                $('#article').html(noDataImg);

                                return;
                            }
                        }


                        for (var i = 0; i < arr.length; i++) {
                            var perArr = arr[i];
                            var substr_title = perArr.newsTitle.substring(0, 28);
                            var substr_time = perArr.publishTime.substring(5, 16);


                            var clickimgRes = '';
                            if (arr[i].hotType && arr[i].hotType != "" && arr[i].hotType != null && arr[i].hotType != undefined) {
                                if (arr[i].hotType == 2) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/2d.png")
                                } else if (arr[i].hotType == 3) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/3d.png")
                                } else if (arr[i].hotType == 4) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/4d.png")
                                } else if (arr[i].hotType == 5) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/5d.png")
                                }
                            }

                            // +'<img class="clickimg" src="../img/img_app/lll@2x.png"/>'
                            result += '<li class="oli2" href="###" newsId=' + perArr.id + '>'
                                + '<img class="newImg lazy" data-original="' + perArr.image + '" src="'+ require("../../img/img_app/liebiao@2x.png")+'" alt="">'

                                + '<a class="odiv">'
                                + '<div class="newsTitle">'
                                + '<p class="news_tile_p">' + substr_title + '</p>'
                                + '<div class="new_bt">'
                                + '<p class="new_bt_p1">'
                                + '<img class="clickimg" src="' + clickimgRes + '"/>'
                                //+perArr.clickNum
                                + '</p>'
                                + '<p class="new_bt_p2">' + substr_time + '</p>'
                                + '</div>'
                                + '</div>'
                                + '</a>'
                                + '</li>';
                        }
                        $('.childArticle').append(result);
                        $("img.lazy").lazyload();
                        $('.oli2').unbind("click");
                       // clickNewsData();


                        if (isLock) {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                        }
                        me.resetload();

                    }
                })
            }


        })

    }
    //最新新闻
    function getVedioList() {
        var pageNo = 0;
        var pageSize = 20;
        var result = "";
        var droploadNews = $('#video').dropload({
            scrollArea: window,
            loadDownFn: function (me) {

                pageNo++;


                $.ajax({
                    type: 'GET',
                    url: baseUrl2 + "/comment/getVedioList.json",
                    data: {
                        "userId": brokerUserId,
                        "pageSize": pageSize,
                        "pageNo": pageNo,
                    },
                    dataType: 'jsonp',
                    success: function (data) {
                        var arr = data.data.vedioList;
                        var isLock = true;
                        if (arr.length == pageSize) {
                            isLock = false;
                        }

                        if (arr == "" || arr == null || arr.length == 0) {

                            if (pageNo == 1) {
                                var noDataImg = '<div class="noImgWrap">'
                                    + '<img src="'+ require("../../img/img_app/innerZwpl@2x.png")+'" />'
                                    + '<p>' + "暂无相关信息" + '<p/>'
                                    + '<div/>'
                                $('#video').html(noDataImg);

                                return;
                            }
                        }

                        for (var i = 0; i < arr.length; i++) {
                            var perArr = arr[i];
                            var substr_title = perArr.newsTitle.substring(0, 28);
                            var substr_time = perArr.publishTime.substring(5, 16);


                            var clickimgRes = '';
                            if (arr[i].hotType && arr[i].hotType != "" && arr[i].hotType != null && arr[i].hotType != undefined) {
                                if (arr[i].hotType == 2) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/2d.png")
                                } else if (arr[i].hotType == 3) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/3d.png")
                                } else if (arr[i].hotType == 4) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/4d.png")
                                } else if (arr[i].hotType == 5) {
                                    clickimgRes = '' + require("../../img/img_h5_v.2.0/5d.png")
                                }
                            }

                            // +'<img class="clickimg" src="../img/img_app/lll@2x.png"/>'
                            result += '<li class="oli2" href="###" newsId=' + perArr.id + '>'
                                + '<img class="newImg lazy" data-original="' + perArr.image + '" src="'+ require("../../img/img_app/liebiao@2x.png")+'" alt="">'

                                + '<a class="odiv">'
                                + '<div class="newsTitle">'
                                + '<p class="news_tile_p">' + substr_title + '</p>'
                                + '<div class="new_bt">'
                                + '<p class="new_bt_p1">'
                                + '<img class="clickimg" src="' + clickimgRes + '"/>'
                                //+perArr.clickNum
                                + '</p>'
                                + '<p class="new_bt_p2">' + substr_time + '</p>'
                                + '</div>'
                                + '</div>'
                                + '</a>'
                                + '</li>';
                        }
                        $('.childVideo').append(result);
                        $("img.lazy").lazyload();
                        $('.oli2').unbind("click");
                        //clickNewsData();


                        if (isLock) {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();

                        }
                        me.resetload();

                    }
                })
            }


        })

    }


    function initClickTabCommentNav() {


        $("#commentInfo nav ul li.commentNav").each(function () {

            var self = this;
            $(self).click(function (e) {
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

    function changeTabCommentNav() {


        $("#articleInfo nav ul li.commentNav").each(function () {

            var self = this;
            $(self).click(function (e) {
                e.preventDefault();
                var selected = $("#articleInfo nav ul li.selected").attr("href");
                var tabContent = $(self).attr("href");
                if (selected == tabContent) {
                    return;
                }

                $('#articleInfo nav ul li.selected').removeClass("selected");
                $(self).addClass("selected");


                $(".commentChild .childContent").addClass("hidden");

                if ($(tabContent).attr("hasLoad") == "true") {

                } else {
                    if (tabContent == "#article") {
                        //分析文章
                        getTrainingSchoolNewsList();
                    }


                    if (tabContent == "#video") {
                        //视频教程
                        getVedioList();
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
    function initDefaultNews(tabPosition) {

        $("#articleInfo nav ul li.commentNav").removeClass("selected");
        var self = $('#articleInfo nav ul li.commentNav[href="' + tabPosition + '"]');
        $(self).addClass("selected");

        $(tabPosition).removeClass("hidden");
        var tabContent = tabPosition;
        if (tabContent == "#article") {
            getTrainingSchoolNewsList();

        }

        if (tabContent == "#video") {
            getVedioList();
        }

        $(tabContent).attr("hasLoad", "true");


    }

    function initCommentTabContent() {

        initClickTabCommentNav();
        initDefaultComment("#good");


    }
    function initChangeTabContent() {

        changeTabCommentNav();
        initDefaultNews("#article");

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

            loadDownFn: function (me) {

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
                    success: function (data) {
                        var dataList = data.data;

                        var lock = true;

                        if (dataList == "" || dataList == null || dataList.length == 0) {

                            if (pageNo == 1) {
                                var noDataImg = '<div class="noImgWrap">'
                                    + '<img src="'+ require("../../img/img_app/innerZwpl@2x.png")+'" />'
                                    + '<p>' + "该培训机构无点评" + '<p/>'

                                    + '<div/>'
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
                                imgs += '<img class="lazy" data-original=' + picUrlArr[j] + ' src="'+ require("../../img/img_app/liebiao@2x.png")+'"/>';
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
                                childComments += '<ul>'
                                    + '<li>'
                                    + '<span class="nick" isGov="' + childCommentsArr[j].isGov + '">' + childCommentsArr[j].nickName + '</span>'
                                    + '<img class="isGov" src="'+ require("../../img/img_app/guanfang@2x.png")+'" />'
                                    + '<span class="nickM">' + "：" + '</span>'
                                    + '<span class="huifu ' + huifuStyle + '">' + " 回复 " + '</span>'
                                    + '<span class="omyNick">'
                                    + childCommentsArr[j].targetNickName
                                    + '</span>'

                                    + '<span class="targetnickM ' + huifuStyle + '">' + "：" + '</span>'
                                    + '<span class="targContent">' + childCommentsArr[j].content + '</span>'
                                    + '<img class="icon ' + showStyle + '" src="'+ require("../../img/img_app/picture@2x.png")+'" />'

                                    + '</li>'

                                    + '</ul>';
                            }


                            result += '<ul class="listWrap" data-id=' + perData.microblogId + ' data-src="' + perData.complainStatus + '" isGov="' + perData.isGov + '">'
                                + '<img class="complain-img" src="" />'
                                + '<li class="tile_img" dataIsComplain=' + perData.isComplain + ' >'
                                + '<img class="lazy" data-original="' + perData.avatar + '" src="'+ require("../../img/img_app/touxiang@2x.png")+'" />'
                                + '</li>'
                                + '<li class="listWrap_rig">'

                                + '<div class="listWrap_rig_inner">'


                                + '<div class="ListTile">'
                                + '<p class="nickName">' + perData.nickName + '</p>'
                                + '<p class="dateTime">' + perData.dateCreated + '</p>'
                                + '</div>'
                                + '<div class="outgolden">'
                                + '<p>' + "老师水平：" + '<span>' + perData.outspeed + '</span>' + '</p>'
                                + '<p>' + "策略实用性：" + '<span>' + perData.brand + '</span>' + '</p>'

                                + '</div>'
                                + '<div class="outgolden2">'
                                + '<p>' + "服务态度：" + '<span>' + perData.attitude + '</span>' + '</p>'
                                + '<p>' + "课程系统性：" + '<span>' + perData.platform + '</span>' + '</p>'

                                + '</div>'
                                + '<div class="plCon">' + perData.content + '</div>'
                                + '<div class="plImg">' + imgs + '</div>'
                                + '<div class="plChild">'

                                + childComments


                                + '</div>'

                                + '<p class="morePl">'
                                + "更多评论"
                                + '</p>'
                                + '</div>'


                                + '<div class="deleAndClick">'
                                + '<span class="del"  haveDelAuth=' + perData.haveDelAuth + '>'
                                + '<img data-id=' + perData.microblogId + ' src="'+ require("../../img/img_app/shanchu@2x.png")+'" />'
                                + '</span>'
                                + '<span class="redStar" data-like=' + perData.isMeLike + '>'
                                + '<img src="' + require("../../img/img_app/success@2x.png")+'" class="like" data-id="' + perData.microblogId + '" data-like="' + dataList[i].isMeLike + '"/>'
                                + '<span class="like_num">' + perData.likeCount + '</span>'

                                + '</span>'
                                + '<ul class="pl_box" a="true">'
                                + '<li class="myJb" data-id=' + perData.microblogId + '>'
                                + '<img src="'+ require("../../img/img_app/jvbao@2x.png")+'" />'
                                + '<span class="pl_box_font">' + "举报" + '</span>'
                                + '</li>'
                                + '<li class="likePl" data-id=' + perData.microblogId + '>'
                                + '<img src="'+ require("../../img/img_app/pinglun2@2x.png")+'" />'
                                + '<span class="pl_box_font">' + "评论" + '</span>'
                                + '</li>'

                                + '</ul>'
                                + '<span class="likeP2" dataId=' + perData.microblogId + '>'
                                + '<img src="'+ require("../../img/img_app/gengduo@2x.png")+'" />'

                                + '</span>'

                                + '</div>'


                                + '</li>'

                                + '</ul>';

                            if ((dataList.length - 1) == i) {
                                firstPubTime = perData.dateCreated;

                            }


                        }


                        $("#good  .childCommentcontent").append(result);
                        $("img.lazy").lazyload();
                        click_pl_box(".likeP2", ".pl_box");

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




                        // 因为没下拉一次就会绑定一次 所以下拉前线接触绑定
                        $('.listWrap_rig_inner').unbind("click");
                        $('.likePl').unbind("click");
                        // 点击列表
                        //clickList();
                        //likePlClick()
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

        var droploadCommentGood = $('#bad').dropload({
            scrollArea: window,
            domDown: {
                domClass: 'dropload-down2',
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="dropload-noData">暂无更多评论</div>'
            },

            loadDownFn: function (me) {

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
                    success: function (data) {


                        var dataList = data.data;


                        var lock = true;

                        if (dataList == "" || dataList == null || dataList.length == 0) {

                            if (pageNo == 1) {
                                var noDataImg = '<div class="noImgWrap">'
                                    + '<img src="'+ require("../../img/img_app/innerZwpl@2x.png")+'" />'
                                    + '<p>' + "该培训机构暂无差评" + '<p/>'

                                    + '<div/>'
                                $('#bad').html(noDataImg);
                                return;

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
                                imgs += '<img class="lazy" data-original=' + picUrlArr[j] + ' src="'+ require("../../img/img_app/liebiao@2x.png")+'"/>';
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
                                childComments += '<ul>'
                                    + '<li>'
                                    + '<span class="nick" isGov="' + childCommentsArr[j].isGov + '">' + childCommentsArr[j].nickName + '</span>'
                                    + '<img class="isGov" src="'+ require("../../img/img_app/guanfang@2x.png")+'" />'
                                    + '<span class="nickM">' + "：" + '</span>'
                                    + '<span class="huifu">' + " 回复 " + '</span>'
                                    + '<span class="omyNick ' + huifuStyle + '">'
                                    + childCommentsArr[j].targetNickName
                                    + '</span>'

                                    + '<span class="targetnickM ' + huifuStyle + '">' + "：" + '</span>'
                                    + '<span class="targContent">' + childCommentsArr[j].content + '</span>'
                                    + '<img class="icon ' + showStyle + '" src="'+ require("../../img/img_app/picture@2x.png")+'" />'

                                    + '</li>'

                                    + '</ul>';
                            }


                            result += '<ul class="listWrap" data-id=' + perData.microblogId + ' data-src="' + perData.complainStatus + '" isGov="' + perData.isGov + '">'
                                + '<img class="complain-img" src="" />'
                                + '<li class="tile_img" dataIsComplain=' + perData.isComplain + ' >'
                                + '<img class="lazy" data-original="' + perData.avatar + '" src="'+ require("../../img/img_app/touxiang@2x.png")+'" />'
                                + '</li>'
                                + '<li class="listWrap_rig">'

                                + '<div class="listWrap_rig_inner">'


                                + '<div class="ListTile">'
                                + '<p class="nickName">' + perData.nickName + '</p>'
                                + '<p class="dateTime">' + perData.dateCreated + '</p>'
                                + '</div>'
                                + '<div class="outgolden">'
                                + '<p>' + "老师水平：" + '<span>' + perData.outspeed + '</span>' + '</p>'
                                + '<p>' + "策略实用性：" + '<span>' + perData.brand + '</span>' + '</p>'

                                + '</div>'
                                + '<div class="outgolden2">'
                                + '<p>' + "服务态度：" + '<span>' + perData.attitude + '</span>' + '</p>'
                                + '<p>' + "课程系统性：" + '<span>' + perData.platform + '</span>' + '</p>'

                                + '</div>'
                                + '<div class="plCon">' + perData.content + '</div>'
                                + '<div class="plImg">' + imgs + '</div>'
                                + '<div class="plChild">'

                                + childComments


                                + '</div>'

                                + '<p class="morePl">'
                                + "更多评论"
                                + '</p>'
                                + '</div>'


                                + '<div class="deleAndClick">'
                                + '<span class="del"  haveDelAuth=' + perData.haveDelAuth + '>'
                                + '<img data-id=' + perData.microblogId + ' src="'+ require("../../img/img_app/shanchu@2x.png")+'" />'
                                + '</span>'
                                + '<span class="redStar" data-like=' + perData.isMeLike + '>'
                                + '<img src="'+ require("../../img/img_app/success@2x.png")+'" class="like" data-id="' + perData.microblogId + '" data-like="' + dataList[i].isMeLike + '"/>'
                                + '<span class="like_num">' + perData.likeCount + '</span>'

                                + '</span>'
                                + '<ul class="pl_box2" a="true">'
                                + '<li class="myJb" data-id=' + perData.microblogId + '>'
                                + '<img src="'+ require("../../img/img_app/jvbao@2x.png")+'" />'
                                + '<span class="pl_box_font">' + "举报" + '</span>'
                                + '</li>'
                                + '<li class="likePl" data-id=' + perData.microblogId + '>'
                                + '<img src="'+ require("../../img/img_app/pinglun2@2x.png")+'" />'
                                + '<span class="pl_box_font">' + "评论" + '</span>'
                                + '</li>'

                                + '</ul>'
                                + '<span class="likeP22" dataId=' + perData.microblogId + '>'
                                + '<img src="'+ require("../../img/img_app/gengduo@2x.png")+'" />'

                                + '</span>'

                                + '</div>'


                                + '</li>'

                                + '</ul>';

                            if ((dataList.length - 1) == i) {
                                firstPubTime = perData.dateCreated;

                            }


                        }


                        $("#bad  .childCommentcontent").append(result);
                        $("img.lazy").lazyload();
                        click_pl_box(".likeP22", ".pl_box2");

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

                            }

                            if ($('.redStar').eq(i).attr("data-like") == 1) {

                                $('.redStar img').eq(i).attr("src", "" + require("../../img/img_app/success@2x.png"));
                                $('.redStar .like_num').eq(i).css("color", "#f55256");
                            } else {
                                $('.redStar img').eq(i).attr("src", ""+ require("../../img/img_app/dianzan@2x.png"));
                                $('.redStar .like_num').eq(i).css("color", "#666");
                            }

                            // 隐藏评论
                            if ($('.del').eq(i).attr('haveDelAuth') != 1) {
                                $('.del').eq(i).hide();
                            }


                        }


                        $('.listWrap_rig_inner').unbind("click");
                        $('.likePl').unbind("click");
                        // 点击列表
                        //clickList();
                        //likePlClick()

                        me.resetload();


                    }
                })
            }
        })


    }


    function baidu_adv() {
        $.ajax({
            url: baseUrl2 + "/comment/getBaiduAdInfo.json",
            // url:"https://app3.fx168api.com/small/news/getNewsByChannel.json?channelId=1",
            dataType: "jsonp",
            type: "GET",
            data: {},
            success: function (data) {
                var baidugg_idNmae = $('.baidu_gg').attr("id");
            }

        })

    };

    // 查看更多
    $(".detailInfoChild").on("click",".lookupMore",function(){
        showMore(this);
    })
});
