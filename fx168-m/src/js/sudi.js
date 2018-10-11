import {
  sckUrl1,
  sckUrl2,
  socketUrlArr,
  sudiUrlArr,
  baseUrl,
  baseUrlHost,
  socketUrl,
  searchUrl,
  index_socket
} from "./common.js";

import "jquery";
import "./jquery.lazyload.min.js";
// import io from 'socket.io-client';
import io from "./socket.io.js";
import "./dropload.min.js";
import PhotoSwipe from "./photoswipe.js";
import PhotoSwipeUI_Default from "./photoswipe-ui-default.min.js";

// import io from "./socket.io.js"
var socket = null;
$(document).ready(function() {
  /*
   * first to init su di url
   */

  // while(!initSudiSocket(getSudiUrl())){
  //     // alert("123");

  // }

  initSudiSocket(getSudiUrl());


  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    if ($('.wrap').css("display") == "none") {

      if (scrollTop >= 100) {
        $('.moudle').show();
        $('.moudle').css("height", "0.98rem");
      } else {
        $('.moudle').show();
        $('.moudle').css("height", "0");
      }
    }

  });
  // 点击顶部关闭按钮关闭app下载banner
  closeTopBanner();
  $('.close').click();

  function closeTopBanner() {
    $('.close').click(function() {
      $('.wrap').hide();
      $('.moudle').hide();
    })
  }

  $('.lia').click(function() {
    localStorage.tabUrlIndex = 1;
    sessionStorage.left = 0;
    sessionStorage.pagecount = "要闻";

  })
  $('.mycjrl').click(function() {
    sessionStorage.left_cjrl = -1471.56;
  })

  //上拉加载
  var pageSize = 20;
  var audioSurce = "";
  var firstPubTime = "";
  var audio = '<audio class="mp3Btn" src="">' +
    '<source  preload="none" src="" />' +
    '</audio>'
  $('.audioWrap').html(audio);




  var dropload = $('#con').dropload({

    scrollArea: window,
    domDown: {
      domClass: 'dropload-down',
      domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
      domNoData: '<div class="dropload-noData">暂无更多新闻</div>'
    },
    loadDownFn: function(me) {
      // 加载菜单一的数据
      //if(itemIndex == '0'){
      // http://192.168.30.190:9093
      $.ajax({
        type: 'GET',
        url: baseUrl + "newsExpress/getData_V2.json",
        data: {
          pageSize: pageSize,
          firstPubTime: firstPubTime
        },
        dataType: 'jsonp',
        success: function(data) {
          // console.log(data);
          var dataArr = data.data.result;
          var result = '';
          var newsIdArrOli2 = [];
          var dataResult = "";
          var pTime = [];
          var pTime2 = [];
          var resulttp = "";
          var val0Arr = [];
          var valtArr = [];
          var val1Arr = [];
          var fig = "";
          var figLength = [];
          var pic_res = "";
          for (var i = 0; i < dataArr.length; i++) {
            // console.log(dataArr[i].morelinkurl);
            // console.log(dataArr[i].pics)
            for (var j = 0; j < dataArr[i].pics.length; j++) {
              pic_res += '<figure class="fig1">' +
                '<div>' +
                '<a href=' + dataArr[i].pics[j] + ' data-size="750x500"><img class="sfImg"  src=' + dataArr[i].pics[0] + '>' + '</a>' +
                '<figcaption style="display:none;">' + "sdsdsdsdsds" + '</figcaption>' +
                '</div>' +
                '</figure>'
            }
            var title = dataArr[i].title; //标题
            var substr = dataArr[i].publishTime.substring(0, 16); //时间
            var substr2 = dataArr[i].publishTime.substring(0, 10);
            pTime2.push(substr2);
            pTime.push(substr);
            // 利多利空
            var liDuo = dataArr[i].moreOrLess;
            if (liDuo == undefined) {
              liDuo = " ";

            }

            if (liDuo.length != 0) {
              var val0 = liDuo[0].value;
              var val0T = liDuo[0].type; //第一个前值
              if (liDuo.length == 2) {
                var val1 = liDuo[1].value;
              }
              if (val0 == undefined) {
                val0 = "";
              }
              valtArr.push(val0T);
              val0Arr.push(val0);
            } else {
              valtArr.push("");
              val0Arr.push("");
            }
          }


          var mytbArr = [];
          for (var i = 0; i < dataArr.length; i++) {
            var dp = dataArr[i].pics;
            mytbArr.push(dp);
            //判断类型；
            var isHideMedia = "";
            var isHideMedia2 = "";
            var isHideMedia3 = "";
            var isHideMedia4 = "";
            var isHideMedia5 = "";
            var style_zd = "";
            if (dataArr[i].hxsdType == 1) {
              isHideMedia = "isHideMedia";

            } else if (dataArr[i].hxsdType == 2) {
              isHideMedia2 = "isHideMedia";

            } else if (dataArr[i].hxsdType == 3) {

              isHideMedia3 = "isHideMedia";
            } else if (dataArr[i].hxsdType == 4) {

              isHideMedia4 = "isHideMedia";
            } else if (dataArr[i].hxsdType == 5) {

              isHideMedia5 = "isHideMedia";
            }


            //判断置顶
            if (dataArr[i].zhiding == false) {

              style_zd = "isHideMedia";

            }
            // 利空利多
            var isLdLk = "";
            if (valtArr[i] == 2) {
              isLdLk = "isLk";
            } else if (valtArr[i] == 1) {
              isLdLk = "isLd";
            } else {
              isLdLk = "isYxjx";
            }

            var style_bgStar = "";
            if (dataArr[i].star == 0) {
              $('.datatitle img').eq(i).css("display", "none");
              style_bgStar = "none_bg"
            } else if (dataArr[i].star == 1) {
              style_bgStar = "oneStar";
              $('.datatitle img').eq(i).attr("src", "" + require("../img/sudi/1star@2x.png"));
            } else if (dataArr[i].star == 2) {
              style_bgStar = "twoStar";
              $('.datatitle img').eq(i).attr("src", "" + require("../img/sudi/2star@2x.png"));
            } else if (dataArr[i].star == 3) {
              style_bgStar = "threeStar";
              $('.datatitle img').eq(i).attr("src", "" + require("../img/sudi/3star@2x.png"));
            }

            // 标红
            var style_red = "";
            if (dataArr[i].isRed == true) {
              style_red = "isRed"
              // $('.datatitle').eq(i).css("color",'red');
            }

            // 查看更多
            var style_linkMore = "";
            if (dataArr[i].morelinkurl != "") {
              // console.log(dataArr[i].morelinkurl);
              var addLinkUrl = "";
              style_linkMore = "isshowLinkMore";
              //var my_morelinkurl = dataArr[i].morelinkurl;
              if (dataArr[i].morelinkurl.indexOf("fx168") >= 0) {

                var linkMore_arr = dataArr[i].morelinkurl.split('/');
                // console.log(linkMore_arr[linkMore_arr.length-1]);
                var secLinkMoreId_arr = linkMore_arr[linkMore_arr.length - 1].split('.');
                // console.log(secLinkMoreId_arr[0]);
                if (secLinkMoreId_arr[0] > 0) {
                  addLinkUrl = "/active/article/" + secLinkMoreId_arr[0] + ".html";
                } else {
                  addLinkUrl = dataArr[i].morelinkurl;
                }


              } else {
                addLinkUrl = dataArr[i].morelinkurl;

              }
            }
            result += '<div data-zd=' + dataArr[i].zhiding + ' hxsdType=' + dataArr[i].hxsdType + ' isRed=' + dataArr[i].isRed + ' class="listWrap">' +
              '<div class="sd_tile">' +
              '<img class="cock" src="'+ "" + require("../img/sudi/@_2x.png")+'"/>' +
              '<span class="substr2">' + pTime[i] + '</span>' +
              '<img class="zd ' + style_zd + '" src="'+ "" + require("../img/zhiding1@2x.png")  +'"/>' +
              '</div>'

              +
              '<ul class="ulWrap">' +
              '<li class="listTime">'

              // +'<span class="zd" onclick="">'+"置顶"+'</span>'
              +
              '</li>' +
              '<div class="boder">'

              +
              '<li class="datatitle ' + style_red + '">' +
              '<div class="bg_star ' + style_bgStar + '">'

              +
              '</div>'
              // +'<img src="img/sudi/star@2x.png">'+'</img>'
              +
              dataArr[i].title +
              '</li>' +
              '<li class="qhz ' + isHideMedia + ' ' + isHideMedia3 + ' ' + isHideMedia4 + ' ' + isHideMedia5 + '">' +
              '<div class="qhwrap">' +
              '<p class="omqh">' +
              '<span class="qqzz">' + "前值：" + '</span>' + '<span class="qz">' + dataArr[i].pre + '</span>' +
              '<span data-ml=' + valtArr[i] + ' class="moreOrless1 ' + isLdLk + '">' + val0Arr[i] + '</span>'


              +
              '</p>' +
              '<p class="omqh">' +
              '<span class="qqzz">' + "预测值：" + '</span>' + '<span class="qz">' + dataArr[i].pred + '</span>' +
              '<span  class="moreOrless2">' + '</span>'

              +
              '</p>' +
              '<div class="sjz_wrap">' +
              '<p class="sjz_p1">' + "实际值" + '</p>' +
              '<p class="sjz_p2">' + dataArr[i].cur + '</p>' +
              '</div>' +
              '</div>'


              +
              '</li>' +
              '</div>' +
              '<div class="continer_video ' + isHideMedia + ' ' + isHideMedia2 + ' ' + isHideMedia3 + ' ' + isHideMedia4 + '">' +
              '<video  class="video" preload="none" src=' + dataArr[i].vidio + ' poster="'+ "" + require("../img/default@2x.png")+'" controls="controls">' + '</video>'
              // +'<img data-id='+dataArr[i].id+' class="morenPic" onclick="initClickVideo(this)" src="img/shipintz@2x.png" />'
              +
              '</div>'

              +
              '<div class="myWrap ' + isHideMedia + ' ' + isHideMedia2 + ' ' + isHideMedia3 + ' ' + isHideMedia5 + '" hxsdType=' + dataArr[i].hxsdType + '>' +
              '<div class="logoPeople">' +
              '<img class="lazy" data-original="' + dataArr[i].imgPath + '" src="'+ "" + require("../img/sudi/toux@2x.png")+'" />' +
              '</div>' +
              '<div class="myWrap1">' +
              '<div class="yinliang">' + '</div>' +
              '<div class="btn-audio omyBtn" data-audio="' + dataArr[i].audio + '" data-id=' + dataArr[i].id + '  >'


              +
              '</div>' +
              '<div class="dianping">' + "点击收听分析师点评" + '</div>' +
              '</div>' +
              '<div class="my_by">' + "by：" + dataArr[i].nickname + '</div>' +
              '</div>'


              // 图片
              +
              '<div class="my-gallery ' + isHideMedia + ' ' + isHideMedia2 + ' ' + isHideMedia4 + ' ' + isHideMedia5 + '" data-pswp-uid="1">' +
              pic_res +
              '</div>'
              // +'<div>'
              +
              '<a class="moreLink ' + style_linkMore + '" href="' + addLinkUrl + '">' +
              '<span>' + "查看更多" + '</span>' +
              '<img src="'+ "" + require("../img/sudi/tiaozhuan@2x.png")+'" />'

              +
              '</a>'

              // +'</div>'
              +
              '</ul>' +
              '</div>'

            if (i == dataArr.length - 1) {
              firstPubTime = dataArr[i].publishTime;
            }
            if (dataArr.length < 20) {

              // 锁定
              me.lock();
              // 无数据
              me.noData();
              break;
            }

          }


          for (var j = 0; j < mytbArr.length; j++) {


            for (var i = 0; i < mytbArr[j].length; i++) {
              resulttp += '<figure>' +
                '<div>' +
                '<a href=' + mytbArr[j][i] + ' data-size="750x500"><img class="sfImg"  src=' + mytbArr[j][i] + '>' + '</a>' +
                '<figcaption style="display:none;">' + "sdsdsdsdsds" + '</figcaption>' +
                '</div>' +
                '</figure>'



            }

          }

          // 为了测试，延迟1秒加载


          $('#content').append(result);
          // for (var i = 0; i < $(".moreLink").length; i++) {
          //     console.log($(".moreLink").eq(i).attr("href"))
          // }
          $("img.lazy").lazyload();
          for (var i = 0; i < $('.listWrap').length; i++) {
            var index = $(this).index();
            if ($('.listWrap').eq(i).attr("data-zd") == "false") {
              $('.listWrap').eq(i).addClass("noZd");
            } else {
              $('.listWrap').eq(i).addClass("trueZd");
            }
          }

          //隐藏不需要的媒体
          omyRemove();
          // 图片点击放大
          initPicture();
          //音频
          //omyMp3();




          //隐藏不需要的媒体
          function omyRemove() {
            for (var i = 0; i < $('figure').length; i++) {
              var myHREF = $('figure div a').eq(i).attr('href');
              if (myHREF == 'undefined') {
                // $('figure').eq(i).remove();
                $('figure').eq(i).addClass("rem")
              }

            }
            for (var i = 0; i < $(".rem").length; i++) {
              $(".rem").remove();
            }
            var kkk = [];
            var tttp = [];
            var blueDateArr = [];
            var MandL = [];
            for (var i = 0; i < dataArr.length; i++) {
              // 利多利空
              var liDuo = dataArr[i].moreOrLess;
              if (dataArr[i].moreOrLess == undefined) {
                liDuo = " ";
              }
              if (liDuo.length != 0) {
                if (liDuo.length == 2) {
                  var val1 = liDuo[1].value;
                  var val1t = liDuo[1].type;
                  kkk.push(val1);
                  tttp.push(val1t);
                  for (var j = 0; j < kkk.length; j++) {
                    $('.moreOrless2').eq(i).html(kkk[j]);
                    $('.moreOrless2').eq(i).attr("data-mt", tttp[j]);
                  }

                }

              }
              if ($('.moreOrless2').eq(i).attr("data-mt") == 2) {
                $('.moreOrless2').eq(i).css({
                  "color": "#399C31",
                  "background-image": "url("+ ""+ require("../img/likong@2x.png")+")"

                })
              } else if ($('.moreOrless2').eq(i).attr("data-mt") == 1) {
                $('.moreOrless2').eq(i).css({
                  "color": "#E45555",
                  // "border":"0.01rem solid #E45555"
                  "background-image": "url(" + "" + require("../img/liduo@2x.png")+")"

                })
              }
              if ($('.listWrap').eq(i).attr("hxsdType") == 2) {
                var sd_moreLess = dataArr[i].moreOrLess;
                MandL.push(sd_moreLess);
              }


            }

          }

          me.resetload();
        },

      });

      //}

    }

  });





  // socket.on('disconnect', function() {
  //     //var sudiUrlArr=["https://app8.fx168api.com:9093","https://app9.fx168api.com:9093"];//速递socket
  //     var index_sudi2=Math.floor((Math.random()*sudiUrlArr.length));
  //     sudiUrl=sudiUrlArr[index_sudi2];
  //     initSudiSocket();
  // });






})

var newsId = null;
var obj = null;

$("#content").on("click", ".omyBtn", function() {
  omyMp3($(this));
})

function omyMp3(cc) {
  $('.mp3Btn').on('ended', function() {
    $('.yinliang').css("-webkit-animation", "none")
    $('.btn-audio').css({
      'background': 'url('+ "" + require("../img/tingzhi@2x.png")+') no-repeat center bottom',
      'background-size': 'cover'
    });
  })
  var myaudio = document.getElementsByTagName('audio')[0];
  var tab = $('.btn-audio').index(this) + 1;
  // $('.dianRed').eq(tab).css("display","none");
  if (newsId == $(cc).attr("data-id") && newsId != null) {
    if (myaudio.paused) {
      $('.dianping').html("点击停止分析师点评");
      obj.prev().css("-webkit-animation", "myfirst 1s infinite");
      obj.css({
        'background': 'url('+ "" + require("../img/bofangz@2x.png")+') no-repeat center bottom',
        'background-size': 'cover'
      });
      myaudio.play();
      return;
    } else {
      $('.dianping').html("点击收听分析师点评");
      obj.prev().css("-webkit-animation", "none");
      obj.css({
        'background': 'url('+ "" + require("../img/tingzhi@2x.png")+') no-repeat center bottom',
        'background-size': 'cover'
      });
      myaudio.pause(); //暂停
    }
  } else {
    newsId = $(cc).attr("data-id");
    if (obj != $(this) && obj != null) {
      if (!myaudio.paused) {
        myaudio.pause(); //暂停
      }
      obj.prev().css("-webkit-animation", "none");
      obj.css({
        'background': 'url('+ "" + require("../img/tingzhi@2x.png")+') no-repeat center bottom',
        'background-size': 'cover'
      });
    }
    obj = $(cc);
    var audioSurce = $(cc).attr("data-audio");
    $('.mp3Btn').attr("src", audioSurce);
    myaudio.load(); //暂停 l
    obj.prev().css("-webkit-animation", "myload 2s infinite");
    obj.css({
      'background': 'url('+ "" + require("../img/bofangz@2x.png")+') no-repeat center bottom',
      'background-size': 'cover'
    });
    myaudio.addEventListener("canplaythrough", function() {
      $('.dianping').html("点击停止分析师点评");
      myaudio.play();
      obj.prev().css("-webkit-animation", "myfirst 1s infinite");
      obj.css({
        'background': 'url('+ "" + require("../img/bofangz@2x.png")+') no-repeat center bottom',
        'background-size': 'cover'
      });
    }, false);
    return;
  }
}




// 图片点击放大
function initPicture() {
  var initPhotoSwipeFromDOM = function(gallerySelector) {
    // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item,
        divEl;
      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element
        // 仅包括元素节点
        if (figureEl.nodeType !== 1) {
          continue;
        }
        divEl = figureEl.children[0];
        linkEl = divEl.children[0]; // <a> element
        size = linkEl.getAttribute('data-size').split('x');
        // 创建幻灯片对象
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };
        if (figureEl.children.length > 1) {
          // <figcaption> content
          item.title = figureEl.children[1].innerHTML;
        }
        if (linkEl.children.length > 0) {
          // <img> 缩略图节点, 检索缩略图网址
          item.msrc = linkEl.children[0].getAttribute('src');
        }
        item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    // 查找最近的父节点
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // 当用户点击缩略图触发
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if (!clickedListItem) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }



      if (index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
        params = {};

      if (hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;
      items = parseThumbnailElements(galleryElement);
      // 这里可以定义参数
      options = {
        barsSize: {
          top: 100,
          bottom: 100
        },
        fullscreenEl: false,
        shareButtons: [{
            id: 'wechat',
            label: '分享微信',
            url: '#'
          },
          {
            id: 'weibo',
            label: '新浪微博',
            url: '#'
          },
          {
            id: 'download',
            label: '保存图片',
            url: '{{raw_image_url}}',
            download: true
          }
        ],
        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        getThumbBoundsFn: function(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }

      };
      // PhotoSwipe opened from URL
      if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // exit if index not found
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  };

  // execute above function
  initPhotoSwipeFromDOM('.my-gallery');
  $(".my-gallery>figure>div").each(function() {
    $(this).height($(this).width());
  });

  function more(obj, id) {
    if ($('#txt' + id).is(":hidden")) {
      $('#p' + id).hide();
      $('#txt' + id).show();
      obj.innerHTML = '收起';
    } else {
      $('#p' + id).show();
      $('#txt' + id).hide();
      obj.innerHTML = '全文';
    }
  }

}

function getSudiUrl() {
  var index_sudi = Math.floor((Math.random() * sudiUrlArr.length));
  var sudiUrl = sudiUrlArr[index_sudi];
  return sudiUrl;
}

function error() {

  if (socket != null) {
    socket.off();
    socket = null;
    // alert("errorfun");
  }
  // socket.disconnect();
  initSudiSocket(getSudiUrl());

}

function initSudiSocket(sudiUrl) {
  // alert("initSudiSocket"+"   "+sudiUrl);
  // alert("1=="+sudiUrl);
  // var socket=null;
  // sudiUrl  "http://192.168.30.190:9093"

  socket = io.connect(sudiUrl, {
    'reconnect': true
  });

  // socket.connect()
  socket.on('connect', function(data) {
    // alert("connect")
    socket.emit('msgH5', {
      "secret": "h5Socket",
      "appType": "h5"
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////socket.disconnect();

  });
  socket.on('newsMsgH5', function(data) {
    // alert("Data");
    sudiSocList(data);

  });
  socket.on('disconnect', function() {
    // alert("disconnect")
    error()
    // error();
  });
  socket.on('connect_failed', function() {
    // alert("connect_failed")
    error()
    // error();
  });
  // socket.on('error',function(){
  //     alert("error")
  //    error()
  //    // error();
  // });
  socket.on('connect_error', function() {
    // alert("connect_error")
    error()
    // error();
  });
  // socket.on('reconnect', function (data) {
  //     alert("reconnect");

  // });

}


function sudiSocList(data) {
  var resultts ;
  if (data === undefined) return false;
  var omydataArr = JSON.parse(data);
  var dataArr = [];
  dataArr.push(omydataArr.result[0]);
  console.info(dataArr)
  var pic_res = "";
  for (var i = 0; i < dataArr.length; i++) {
    var isHideMedia = "";
    var isHideMedia2 = "";
    var isHideMedia3 = "";
    var isHideMedia4 = "";
    var isHideMedia5 = "";
    var style_zd = "";
    if (dataArr[i].hxsdType == 1) {
      isHideMedia = "isHideMedia";

    } else if (dataArr[i].hxsdType == 2) {
      isHideMedia2 = "isHideMedia";

    } else if (dataArr[i].hxsdType == 3) {

      isHideMedia3 = "isHideMedia";
    } else if (dataArr[i].hxsdType == 4) {

      isHideMedia4 = "isHideMedia";
    } else if (dataArr[i].hxsdType == 5) {

      isHideMedia5 = "isHideMedia";
    }
    for (var j = 0; j < dataArr[i].pics.length; j++) {
      pic_res += '<figure class="fig1">' +
        '<div>' +
        '<a href=' + dataArr[i].pics[j] + ' data-size="750x500"><img class="sfImg"  src=' + dataArr[i].pics[0] + '>' + '</a>' +
        '<figcaption style="">' + '</figcaption>' +
        '</div>' +
        '</figure>'
    }

    var operate = dataArr[i].operate;
    var myId = dataArr[i].id;
    var myZd = dataArr[i].zhiding;
    var myLinkMore = null;
    var result = "";
    var creatZd;
    var val0Arr = [];
    var valtArr = [];
    var pTime = [];
    var pTime2 = [];

    var title = dataArr[i].title; //标题
    var substr = dataArr[i].publishTime.substring(0, 16); //时间
    var substr2 = dataArr[i].publishTime.substring(0, 10);
    pTime2.push(substr2);
    pTime.push(substr);



    // 利多利空
    var liDuo = dataArr[i].moreOrLess;
    if (liDuo == undefined) {
      liDuo = " ";

    }

    if (liDuo.length != 0) {
      var val0 = liDuo[0].value;
      var val0T = liDuo[0].type; //第一个前值
      if (liDuo.length == 2) {
        var val1 = liDuo[1].value;

      }
      if (val0 == undefined) {
        val0 = "";
      }
      valtArr.push(val0T);
      val0Arr.push(val0);


    } else {
      valtArr.push("");
      val0Arr.push("");
    }

    var style_zdIsShow = "";
    var style_list = "";
    if (dataArr[i].zhiding == false) {
      style_zdIsShow = "zdHide";
      style_list = "noZd"
      // $('.listWrap2').addClass("noZd");
    } else if (dataArr[i].zhiding == true) {
      style_zdIsShow = "zdShow";
      style_list = "trueZd"
      // $('.listWrap2').addClass("trueZd");
    }

    // 利空利多
    var isLdLk = "";
    if (valtArr[i] == 2) {
      isLdLk = "isLk";
    } else if (valtArr[i] == 1) {
      isLdLk = "isLd";
    } else {
      isLdLk = "isYxjx";
    }

    // 查看更多
    var style_linkMore = "";
    if (dataArr[i].morelinkurl != "") {
      var addLinkUrl = "";
      style_linkMore = "isshowLinkMore";
      //var my_morelinkurl = dataArr[i].morelinkurl;
      if (dataArr[i].morelinkurl.indexOf("fx168") >= 0) {
        var linkMore_arr = dataArr[i].morelinkurl.split('/');
        // console.log(linkMore_arr[linkMore_arr.length-1]);
        var secLinkMoreId_arr = linkMore_arr[linkMore_arr.length - 1].split('.');
        // console.log(secLinkMoreId_arr[0]);
        if (secLinkMoreId_arr[0] > 0) {
          addLinkUrl = "/active/article/" + secLinkMoreId_arr[0] + ".html";
          myLinkMore = addLinkUrl;
        } else {
          addLinkUrl = dataArr[i].morelinkurl;
          myLinkMore = dataArr[i].morelinkurl;
        }

      } else {
        addLinkUrl = dataArr[i].morelinkurl;
        myLinkMore = dataArr[i].morelinkurl;
        // console.log(addLinkUrl);
      }
    }
    resultts = '<div data-star=' + dataArr[i].star + ' data-zd=' + dataArr[i].zhiding + ' data-id=' + dataArr[i].id + ' operate=' + dataArr[i].operate + ' hxsdType=' + dataArr[i].hxsdType + ' class="listWrap listWrap2 ' + style_list + '">' +
      '<div class="sd_tile">' +
      '<img class="cock" src="'+ "" + require("../img/sudi/@_2x.png")+'"/>' +
      '<span class="substr2">' + pTime[i] + '</span>' +
      '<img class="zd ' + style_zdIsShow + '" src="'+ "" + require("../img/zhiding1@2x.png")+'"/>' +
      '</div>' +
      '<ul class="ulWrap">' +
      '<li class="listTime">'
      // +'<span>'+dataArr[i].publishTime+'</span>'
      // +'<img class="zd" src="img/zhiding1@2x.png"/>'
      // +'<span class="zd" onclick="">'+"置顶"+'</span>'
      +
      '</li>' +
      '<div class="boder">' +
      '<li class="datatitle">' +
      '<img class="myStar" src="'+ ""+ require("../img/sudi/1star@2x.png")+ '">' + '</img>' +
      '<span class="myTs">' + dataArr[i].title + '</span>' +
      '</li>' +
      '<li class="qhz">' +
      '<div class="qhwrap">' +
      '<p class="omqh">' +
      '<span class="qqzz">' + "前值：" + '</span>' + '<span class="qz">' + dataArr[i].pre + '</span>' +
      '<span data-ml=' + valtArr[i] + ' class="moreOrless1 ' + isLdLk + '">' + val0Arr[i] + '</span>' +
      '</p>' +
      '<p class="omqh">' +
      '<span class="qqzz">' + "预测值：" + '</span>' + '<span class="qz">' + dataArr[i].pred + '</span>' +
      '<span  class="moreOrless2">' + '</span>' +
      '</p>' +
      '<div class="sjz_wrap">' +
      '<p class="sjz_p1">' + "实际值" + '</p>' +
      '<p class="sjz_p2">' + dataArr[i].cur + '</p>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</div>' +
      '<div class="continer_video ' + isHideMedia + ' ' + isHideMedia2 + ' ' + isHideMedia3 + ' ' + isHideMedia4 + '">' +
      '<video  class="video" preload="none" src=' + dataArr[i].vidio + ' poster="'+ "" + require("../img/default@2x.png")+'" controls="controls">' + '</video>'
      // +'<img data-id='+dataArr[i].id+' class="morenPic" onclick="initClickVideo(this)" src="img/shipintz@2x.png" />'
      +
      '</div>'
      // +'<video class="video videosoc" poster="img/default@2x.png" src='+dataArr[i].vidio+' type="video/mp4" controls="controls">'+'</video>'
      +
      '<div class="myWrap" hxsdType=' + dataArr[i].hxsdType + '>' +
      '<div class="logoPeople">' +
      '<img src=' + dataArr[i].imgPath + ' />' +
      '</div>' +
      '<div class="myWrap1">' +
      '<div class="yinliang">' + '</div>' +
      '<div class="btn-audio omyBtn" data-audio="' + dataArr[i].audio + '" data-id=' + dataArr[i].id + '>'


      +
      '</div>' +
      '<div class="dianping">' + "点击收听分析师点评" + '</div>' +
      '</div>' +
      '<div class="my_by">' + "by：" + dataArr[i].nickname + '</div>' +
      '</div>'


      // 图片

      +
      '<div class="my-gallery ' + isHideMedia + ' ' + isHideMedia2 + ' ' + isHideMedia4 + ' ' + isHideMedia5 + '" data-pswp-uid="1">' +
      pic_res


      +
      '</div>'

      +
      '<a class="moreLink ' + style_linkMore + '" href="' + addLinkUrl + '">' +
      '<span>' + "查看更多" + '</span>' +
      '<img src="'+ ""+ require("../img/sudi/tiaozhuan@2x.png") + '" />'

      +
      '</a>'

      +
      '</ul>' +
      '</div>'


    if (operate == "add") {
      // alert("add")
      if (myZd == true) {
        // alert("111")
        // $('.noZd').eq(0).before(resultts);
        $('#content').prepend(resultts);
      } else {
        // alert("sdsdasd")
        $('.noZd').eq(0).before(resultts);
        for (var i = 0; i < $('.listWrap').length; i++) {
          if ($('.listWrap').eq(i).attr("data-id") == myId) {
            $('.listWrap .zd').eq(i).remove();
          }

        }
      }

    } else if (operate == "delete") {
      for (var i = 0; i < $('.listWrap').length; i++) {
        if ($('.listWrap').eq(i).attr("data-id") == myId) {
          $('.listWrap').eq(i).remove();
        }

      }
    }

    // 置顶修改为非置顶
    if (operate == "edit") {
      for (var i = 0; i < $('.listWrap2').length; i++) {

        if ($('.listWrap2').eq(i).attr("data-id") == myId) {

          $('.listWrap2 .myTs').eq(i).html(dataArr[0].title);

        }

      }
      if (myLinkMore != "" && myLinkMore != undefined && myLinkMore != null) {
        // alert(myLinkMore)
        for (var i = 0; i < $('.listWrap2').length; i++) {
          if ($('.listWrap2').eq(i).attr("data-id") == myId) {

            $('.listWrap2 .moreLink').eq(i).attr("href", myLinkMore);
            $('.listWrap2 .moreLink').eq(i).removeClass('ishideLinkMore');
            $('.listWrap2 .moreLink').eq(i).addClass('isshowLinkMore');
            break;
          }

        }
      } else {
        // alert("2")
        for (var i = 0; i < $('.listWrap2').length; i++) {
          if ($('.listWrap2').eq(i).attr("data-id") == myId) {

            $('.listWrap2 .moreLink').eq(i).attr("href", myLinkMore);
            $('.listWrap2 .moreLink').eq(i).removeClass('isshowLinkMore');
            $('.listWrap2 .moreLink').eq(i).addClass('ishideLinkMore');
            break;
          }

        }
      }
      if (myZd == false) {

        for (var i = 0; i < $('.listWrap2').length; i++) {
          if ($('.listWrap2').eq(i).attr("data-id") == myId) {

            $('.listWrap2').eq(i).attr("data-zd", false)
            // $('.listWrap .zd').eq(i).remove();
            $('.listWrap2 .zd').eq(i).remove();

            $('.listWrap2').eq(i).removeClass('trueZd');
            $('.listWrap2').eq(i).addClass('noZd');
            //$('.listWrap2').eq(i).insertAfter($('.trueZd').last());
            break;
          }

        }
      } else if (myZd == true) {
        creatZd = '<img class="zd ' + style_zdIsShow + '" src="'+ "" + require("../img/zhiding1@2x.png")+'"/>'
        for (var i = 0; i < $('.listWrap2').length; i++) {

          if ($('.listWrap2').eq(i).attr("data-id") == myId) {
            $('.listWrap2 .zd').eq(i).remove();
            $('.listWrap2').eq(i).attr("data-zd", true);
            $('.sd_tile').eq(i).append(creatZd);
            $('.listWrap2 .zd').eq(i).css("display", "inline");
            // $('.listWrap2').eq(i).insertBefore($('.trueZd').first());

            $('.listWrap2').eq(i).removeClass('noZd');
            $('.listWrap2').eq(i).addClass('trueZd');
            $('#content').prepend($('.listWrap2').eq(i));
            break;

          }

        }
      }
    }



    if ($('.moreOrless1').eq(i).attr("data-ml") == 2) {
      $('.moreOrless1').eq(i).css({
        "color": "#399C31",
        // "border":"0.01rem solid #399C31",
        "background-image": "url("+ "" + require("../img/likong@2x.png")+")"
      })
    } else if ($('.moreOrless1').eq(i).attr("data-ml") == 1) {
      $('.moreOrless1').eq(i).css({
        "color": "#E45555",
        // "border":"0.01rem solid #E45555"
        "background-image": "url("+"" + require("../img/liduo@2x.png")+")"

      })
    } else {
      $('.moreOrless1').eq(i).css({
        "color": "#999",
        // "border":"0.01rem solid #999"
        "background-image": "url("+ "" + require("../img/yxjx@2x.png")+")"

      })
    }
    if ($('.moreOrless2').eq(i).attr("data-mt") == 2) {
      $('.moreOrless2').eq(i).css({
        "color": "#399C31",
        "background-image": "url(" + ""+ require("../img/likong@2x.png")+")"

      })
    } else if ($('.moreOrless2').eq(i).attr("data-mt") == 1) {
      $('.moreOrless2').eq(i).css({
        "color": "#E45555",
        // "border":"0.01rem solid #E45555"
        "background-image": "url("+""+require("../img/liduo@2x.png")+")"

      })
    }

  }

  for (var i = 0; i < $('figure').length; i++) {
    var myHREF = $('figure div a').eq(i).attr('href');
    if (myHREF == 'undefined') {
      $('figure').eq(i).remove();
    }

  }



  for (var i = 0; i < $('.listWrap2').length; i++) {
    // console.log($('.listWrap2').length);
    // 判断类型
    if ($('.listWrap2').eq(i).attr("hxsdType") == 1) { //纯文字
      $('.listWrap2 .my-gallery').eq(i).css("display", "none");
      $('.listWrap2 .qhz').eq(i).css("display", "none");
      $('.listWrap2 .video').eq(i).css("display", "none");
      $('.listWrap2 .myWrap').eq(i).css("display", "none");
    } else if ($('.listWrap2').eq(i).attr("hxsdType") == 2) { //经济指标新闻
      $('.listWrap2 .my-gallery').eq(i).css("display", "none");
      $('.listWrap2 .video').eq(i).css("display", "none");
      $('.listWrap2 .myWrap').eq(i).css("display", "none");
    } else if ($('.listWrap2').eq(i).attr("hxsdType") == 3) { //带图片的短标新闻
      $('.listWrap2 .video').eq(i).css("display", "none");
      $('.listWrap2 .qhz').eq(i).css("display", "none");
      $('.listWrap2 .myWrap').eq(i).css("display", "none");
    } else if ($('.listWrap2').eq(i).attr("hxsdType") == 4) { //带音频的短标新闻
      $('.listWrap2 .video').eq(i).css("display", "none");
      //$('.listWrap2 .datatitle').eq(i).css("display","none");
      $('.listWrap2 .qhz').eq(i).css("display", "none");
      $('.listWrap2 .my-gallery').eq(i).css("display", "none");
    //  $('.listWrap2 .boder').eq(i).css("display", "none");
    } else if ($('.listWrap2').eq(i).attr("hxsdType") == 5) { //带视频的短标新闻
      $('.listWrap2 .qhz').eq(i).css("display", "none");
      $('.listWrap2 .my-gallery').eq(i).css("display", "none");
      $('.listWrap2 .myWrap').eq(i).css("display", "none");
    }



    // 判断星级
    if ($('.listWrap2').eq(i).attr("data-star") == 0) {
      $('.listWrap2 .myStar').css("display", "none");

    } else if ($('.listWrap2').eq(i).attr("data-star") == 1) {
      $('.listWrap2 .myStar').eq(i).attr("src", "" + require("../img/sudi/1star@2x.png"));
    } else if ($('.listWrap2').eq(i).attr("data-star") == 2) {
      $('.listWrap2 .myStar').eq(i).attr("src", "" + require("../img/sudi/2star@2x.png"));
    } else if ($('.listWrap2').eq(i).attr("data-star") == 3) {
      $('.listWrap2 .myStar').eq(i).attr("src", "" + require("../img/sudi/3star@2x.png"));
    }


  }
  //音频
  // omyMp3()
  // 图片点击放大
  initPicture();
}

// 在各个浏览器打开app方法
function openApp() {
  var ua = window.navigator.userAgent.toLowerCase();
  //微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168';
  } else { //非微信浏览器
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      var loadDateTime = new Date();
      window.setTimeout(function() {
        var timeOutDateTime = new Date();
        if (timeOutDateTime - loadDateTime < 5000) {
          window.location = "https://itunes.apple.com/cn/app/id535352246"; //ios下载地址
        } else {
          window.close();
        }
      }, 2000);
      window.location = "fx168://m.fx168.com/index";
    } else if (navigator.userAgent.match(/android/i)) {
      var state = null;
      try {

        window.location = "fx168://m.fx168.com/index";
        //return false;
        // alert(myUrl);
        setTimeout(function() {
          window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168"; //android下载地址

        }, 500);
      } catch (e) {}
    }
  }
}
