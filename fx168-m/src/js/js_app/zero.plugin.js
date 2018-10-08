//屏幕rem设算
if (!window.publicJs) {
  ! function(n) {
    var e = n.document,
      t = e.documentElement,
      i = 750,
      d = i / 100,
      o = "orientationchange" in n ? "orientationchange" : "resize",
      a = function() {
        var n = t.clientWidth || 320;
        n > 750 && (n = 750);
        t.style.fontSize = n / d + "px"
      };
    e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
  }(window);
}

// 广告type
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

if (isAndroid && window.SysClientJs ) {
  var appType = 1;
} else if (isiOS && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.showTitle) {
  var appType = 0;
}

// 配置url
var baseUrl2 = "https://app5.fx168api.com";
var baseUrl="http://m.fx168.com/";
//var baseUrl="http://192.168.30.175:8080";
//baseUrl2 = baseUrl2 = "http://123.206.224.250:8080"; ///////////////测试配置统一更改
//bind扩展
if (! function() {}.bind) {
  Function.prototype.bind = function(context) {
    var self = this; //保存this，即调用bind方法的目标函数
    return function() {
      return self.apply(context, arguments);
    };
  };
}


// 获取sortIndex 值
var sortIndex = localStorage.getItem("sortIndex");
/**
 *
 *获取经纪商基本信息ajax方法
 *
 **/
window.brokerUserId = typeof window.getQueryString == 'function' ? getQueryString("brokerUserId") : null;

function zeroAjaxGetBasicData() {
  $.ajax({
    url: baseUrl2 + "/comment/getBrokerInfo.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      "brokerUserId": brokerUserId
    },
    success: getZeroBasicDate
  });
}

// 获取经纪商基本信息方法
function getZeroBasicDate(data) {
  var arrList = data.data;
  if (typeof arrList == 'object') {
    $("[data-info]").fadeIn(100);
    $("[data-complex]").html(arrList.complex); //综合评分
    $("[data-rank]").html(arrList.rank); //排名
    $("[data-logo]").attr("src", arrList.logo); //logo
    $("[data-brokername]").html(arrList.brokerName); //品牌名称
    $("[data-platform]").html(arrList.microblogPlatform); //平台
    $("[data-outspeed]").html(arrList.microblogOutspeed); //出金
    $("[data-attitude]").html(arrList.microblogAttitude); //服务态度
    $("[data-brand]").html(arrList.microblogBrand); //品牌映像
    $("#contrast-name").html(arrList.brokerName); // 实盘测试名字
    if (arrList.isFlagship == 1) {
      $('.head_wrap').css('background-image', 'url(../img/img_app/Vguanfang@2x.png)');
    } else {
      $("[data-isflag]").hide();
      $('.head_wrap').css('background-image', 'url(../img/img_app/zhengchang@2x.png)');
    }
  }
}

if ($("[data-info]").children().length) {
  zeroAjaxGetBasicData();
}

// 背景添加
$("body[data-bg='bg3ea']").addClass("bg_3ea");

/**
 *
 *点评首页推荐
 *
 **/
function ajaxInfoGet(url, callback, data, basic) {
  $.ajax({
    url: basic ? (basic + url) : (baseUrl2 + url),
    dataType: "jsonp",
    type: "GET",
    data: data,
    success: function(data) {
      if (typeof callback == 'function') {
        callback(data);
      }
    }
  })
}

if ($("#homeRecommend").data("homerecommend")) {
  $("#homeRecommend").hide();
  ajaxInfoGet('/comment/getHomePageRecommend.json', function(res) {
    var str = homePage.call(this, res);
    $("#homeRecommend").html(str).parent().attr("data-underline", res.data.list.length);
    $("img.lazy").lazyload();
    $("#homeRecommend").fadeIn(300);
    recommendTo();
  })
}

function homePage(res) {
  var list = null;
  var str = "";
  if (res.data && res.data.list) {
    list = res.data.list;
    for (var i = 0; i < list.length; i++) {
      str += '<li><a href="javascript:;" data-userid="' + list[i].userId + '">\
          <aside class="area_cms">\
            <h3>' + list[i].brokerName + '</h3>\
            <p class="clamp_2">监管机构:' + list[i].regulator + '</p>\
          </aside>\
          <img class="lazy" data-original="' + list[i].logo + '"  src="../img/img_app/liebiao@2x.png"></a></li>'
    }
  }
  return str;
}

function recommendTo() {
  $("#homeRecommend a").click(function() {
    var thisObj = {
      imgURL: $(this).find("img").attr("src"),
      title: $(this).find("h3").html(),
      id: $(this).data("userid"),
      type: 1,
      // url: "http://192.168.30.175:8080/h5_v2.0/app/newinner.html"
      url: baseUrl + "/app/newinner.html"
    };
    getDetail(JSON.stringify(thisObj));
  })
}

////常见问题及盗版跳转:
function souceLink(obj) {
  this.elem = obj;
  this.tapClick();
}

souceLink.prototype.tapClick = function() {
  tapClick.call(this);
  return this;
}

function shareInto() {
  var title = this.elem.data("name");
  var url = this.elem.data("url");
  url = baseUrl + '/app/' + url + ".html";
  var imgURL = this.elem.find("img").attr("src");
  var thisObj = {
    title: title,
    url: url,
    imgURL: "https://m.fx168.com/img/img_download/jy_fx168_mobile_load_logo.png",
    type: 1,
    id: $("[data-userid]").eq(0).data("userid")
  }
  getDetail(JSON.stringify(thisObj));
}

function tapClick() {
  this.elem.click(shareInto.bind(this));
}

new souceLink($("#shitsu-qs"));
new souceLink($("#shitsu-pw"));
/**
 *
 *隔夜利息
 *
 **/
if ($("#rolloversList").data("rolloverslist")) {
  $("#homeRecommend").hide();
  ajaxInfoGet('/comment/getBrokerRolloversList.json', function(res) {
    var str = '',
      list = null;
    if (res.data && res.data.list) {
      list = res.data.list;
      for (var i = 0; i < list.length; i++) {
        str += '<li class="t_body">\
              <span>' + list[i].brokerName + '</span>\
              <span><em class="">' + list[i].eusEmptyRollovers + '</em></span>\
              <span><em class="">' + list[i].eusMoreRollovers + '</em></span>\
              <span><em>' + list[i].goldEmptyRollovers + '</em></span>\
              <span><em>' + list[i].goldMoreRollovers + '</em></span>\
            </li>'
      }
    }
    $("#rolloversList").append(str);
    $("#homeRecommend").fadeIn(300);
  }, {
    "sortIndex": sortIndex,
    "brokerUserId": brokerUserId
  })
}


/**
 *
 *公司介绍
 *
 **/
if ($("#companyProfile").data("companyprofile")) {
  ajaxInfoGet('/comment/getBrokerCompanyProfile.json', function(res) {
    if (res.data) $("#companyProfile").html(res.data.companyProfile);
  }, {
    "brokerUserId": brokerUserId
  })
}

/**
 *
 *经济商交易信息
 *
 **/
if ($("#tradeInfo").data("tradeinfo")) {
  ajaxInfoGet('/comment/getBrokerTradeInfo.json', function(res) {
    if (res.data) {
      $("p[data-mintradecount]").html(res.data.minTradeCount);
      $("p[data-tradelever]").html(res.data.lever);
      $("p[data-minentry]").html(res.data.minEntry);
      $("p[data-trademode]").html(res.data.tradeMode);
      $("p[data-variety]").html(res.data.variety);
    }
  }, {
    "brokerUserId": brokerUserId
  })
}

/**
 *
 *经济商平台说明
 *
 **/
if ($("#platformType").data("platformtype")) {
  ajaxInfoGet("/comment/getPlatform.json", function(res) {
    var str = "";
    for (var i = 0; i < res.data.list.length; i++) {
      str += '<li><h3 class="clamp_1">平台模式 ：' + res.data.list[i].tradingName + '</h3>\
      <p class="">' + res.data.list[i].tradingDesc + '</p></li>'
    }
    $("ul[data-platformtype]").html(str)
  }, {
    "brokerUserId": brokerUserId
  })
}

/**
 *
 *点查表
 *
 **/

function PointList(elem, container, params) {
  this.elem = elem;
  if (typeof Swiper == 'function') {
    Swiper.call(this, container, params); //继承Swiper
  }
}

function pointHtml(res) {
  this.list = res.data.list;
  dataPoint.call(this, ".left-compony", "brokerName");
  dataPoint.call(this, "li[data-euspread]", "euSpread");
  dataPoint.call(this, "li[data-enuspread]", "enuSpread");
  dataPoint.call(this, "li[data-ujspread]", "ujSpread");
  dataPoint.call(this, "li[data-auspread]", "auSpread");
  dataPoint.call(this, "li[data-ucspread]", "ucSpread");
  dataPoint.call(this, "li[data-goldspread]", "goldSpread");
  dataPoint.call(this, "li[data-oilspread]", "oilSpread");
}

function dataPoint(obj, spreadName) {
  var str = "";
  for (var i = 0; i < this.list.length; i++) {
    str += '<span>' + this.list[i][spreadName] + '</span>';
  }
  this.elem.find(obj).append(str);
}

PointList.prototype.ajaxInfoGet = function(url, data) {
  ajaxInfoGet.call(this, url, pointHtml.bind(this), data);
}

if ($("#point-table").data("point")) {
  var pointList = new PointList($('#point-table'), '.right-spread', {
    pagination: '.swiper-pagination',
    slidesPerView: 4,
    paginationClickable: true,
    spaceBetween: 0
  });
  pointList.ajaxInfoGet("/comment/getBrokerSpreadList.json", {
    sortIndex: sortIndex,
    brokerUserId: brokerUserId
  })
}

/**
 *
 *常见问题
 *
 **/

function ComQuestion(res) {
  var list = res.data.list;
  var str = "";
  for (var i = 0; i < list.length; i++) {
    str += '<section class="compro-list" data-qslist="true">\
        <aside class="com_qs">\
          <img src="../img/img_app/icon_cp.png" alt="">\
          <span>' + list[i].question + '</span>\
        </aside>\
        <aside class="com_as">\
          <ins class="com_as_side">解答</ins>\
          <div class="com_as_cell">\
            <p>' + list[i].answer + '</p>\
            ' + (list[i].logo ? "<img src='" + list[i].logo + "'>" : "") + '\
          </div>\
        </aside>\
      </section>'
  }
  $("[data-qusans]").append(str);
}

function ComQuesInfo(url) {
  ajaxInfoGet.call(this, url, ComQuestion.bind(this));
}

function Tip(target, method, getqs, postqs) { //弹框对象  依赖jquery
  this.elem = null;
  this.target = target;
  this.method = method;
  this.postqs = postqs; //提交答案url
  this.eventShow();
  ComQuesInfo.call(this, getqs); //获取所有问题列表
}

Tip.prototype.constructor = Tip;

function transformInt(object) { //transform 模糊处理
  var target = {
    height: parseInt(object.height()),
    width: parseInt(object.width())
  };
  object.height(target.height % 2 == 0 ? target.height : (target.height + 1));
  object.width(target.width % 2 == 0 ? target.width : (target.width + 1));
  return this;
}

function closeTip(e) { //弹框关闭
  var target = e.target.tagName.toLowerCase();
  if (target == 'img') {
    this.hideTip();
  } else if (target == 'a') {
    this.postMessage(e);
  }
  return this;
}

Tip.prototype.upHtml = function() {
  var str = '<section class="com_tip_updata" style="display:block"><div class="wrap_tp">\
      <ins class="close_tip"><img src="../img/img_h5_v.2.0/guanbi@2x.png"></ins>\
      <article class="show_tip">\
        <h4>我要提问</h4>\
        <div class="border"><div class="edit_content" style="-webkit-user-select:text;user-select: text;" contenteditable="true"></div></div><a href="javascript:;">提交问题</a>\
      </article></div></section>';
  this.elem = $(str);
  return this;
}

Tip.prototype.showTip = function() {
  $("body").append(this.elem);
  return this;
};

Tip.prototype.transformInt = function() {
  transformInt.call(this, this.elem.children())
  return this;
};

Tip.prototype.hideTip = function() {
  this.elem.off('click', closeTip.bind(this)); //解除绑定
  this.elem.remove();
  return this;
}

Tip.prototype.close = function() {
  this.elem.on('click', closeTip.bind(this));
  return this;
}

Tip.prototype.init = function() {
  this.upHtml().showTip().transformInt().close();
  return this;
};

Tip.prototype.comCallQs = function(data) {
  this.hideTip();
  // setTimeout(window.location.reload(),300)
  return this;
}

Tip.prototype.comQuesPost = function(url, data) {
  ajaxInfoGet.call(this, url, this.comCallQs.bind(this), data);
  return this;
}

Tip.prototype.postMessage = function(e) {
  var content = this.elem.find(".edit_content[contenteditable='true']");
  var question = content.get(0).innerHTML;
  if (question) {
    this.comQuesPost(this.postqs, {
      question: question
    });
    this.hideTip(); //消失
  }
  return this;
}

Tip.prototype.eventShow = function() {
  this.target.on(this.method, this.init.bind(this));
  return this;
};

if ($(".common-problem").data("qusans")) {
  var commonTip = new Tip($(".tip_target"), 'click',
    "/comment/getQuestionAnswer.json", "/comment/commitQuestion.json");
  masuShare();
}

function masuShare() {
  var shareObj = {
    isShare: 1, //0:不分享 1:分享
    shareTitle: document.title,
    shareUrl: window.location.href,
    shareImage: "//m.fx168.com/img/img_download/jy_fx168_mobile_load_logo.png",
    shareContent: document.title
  }
  console.log(shareObj)
  shareJs.call(this, JSON.stringify(shareObj));
}
//$(".com_tip_updata .close_tip").click(function() { var _this = $(this); _this.parent().parent().hide();})
// var tipPlugin;
// $(".tip_target").click(function() {
//   return false;$(".com_tip_updata").show();transformInt($('.wrap_tp'));
//   tipPlugin = new Tip().init();
//   tipPlugin = null;
// })

/**
 *
 *盗版警示
 *
 **/
if ($("#piracy-warn").data("warn")) {
  ajaxInfoGet.call(this, "/comment/getPiratedPlatform.json", getPiratedPlatform.bind(this));
  masuShare();
}

function getPiratedPlatform(res) {
  var list = res.data.list;
  var str = "";
  for (var i = 0; i < list.length; i++) {
    str += '<li class="over_h">\
          <img class="warn_icon left" src="' + list[i].logo + '" alt="">\
          <aside class="left marl_20">\
            <h4>' + list[i].name + '</h4>\
            <h5>网址: <ins>' + list[i].website + '</ins></h5>\
          </aside>\
          <p class="clear">' + list[i].warning + '</p>\
          <img class="warn_mark" src="../img/img_app/warning2x.png" alt="">\
        </li>'
  }
  $("#piracy-warn").append(str)
}

/**
 *
 *牌照信息
 *
 **/
function Licenmore(elem, url, data) {
  this.elem = typeof elem == 'object' ? elem : null;
  this.ajaxInfoGet(url, data);
}

function toggleElement() {
  this.find(".icon").toggleClass("rotate_180");
  this.find(".img_layout").toggle();
  this.parent().find(".content-license").toggleClass("hide");
  this.parent().find(".p").toggleClass("active");
  return this;
}

function clickTag(i) {
  this.on('click', toggleElement.bind(this));
  return this;
}

Licenmore.prototype.init = function() {
  this.elem.find(".title-license").each(function(i) {
    clickTag.call($(this), i);
  })
  return this;
}

Licenmore.prototype.ajaxInfoGet = function(url, data) {
  ajaxInfoGet.call(this, url, regulaHTML.bind(this), data);
}

function regulaHTML(res) {
  var list = res.data.list;
  var str = "";
  for (var i = 0; i < list.length; i++) {
    str += '<li>\
      <div class="title-license clearfix">\
        <aside class="left">\
          <img class="img_80X48 img_layout" src="' + list[i].logo + '">\
          <p class="p">' + list[i].regulatorName + '</p>\
        </aside>\
        <aside class="right icon"><img src="../img/img_app/paixu@2x.png" alt=""></aside>\
      </div>\
      <div class="content-license hide clearfix">\
        <img class="img_145x88 left" src="' + list[i].logo + '">\
        <div class="aside_tit over_h">\
          <aside class="left">\
            <span class="col_666">简称：</span>\
            <span class="col_black">' + list[i].shortName + '</span>\
          </aside>\
          <aside class="right score">\
            <span class="left col_666">监管级别：</span>\
            <span class="left icon_score" data-star="' + list[i].level + '"></span>\
          </aside>\
          <aside class="left mart_10">\
            <span class="col_666">官方网站：</span>\
            <span class="col_black" href="javascript:;">' + list[i].website + '</span>\
          </aside>\
        </div>\
        <aside class="intro_p  clear">\
          <span>监管机构简介 : </span>' + list[i].description + '\
        </aside>\
      </div>\
    </li>'
  }
  this.elem.fadeIn(500);
  this.elem.html(str);
  this.init();
  return this;
}

if ($("#licenList").data("licenlist")) {
  var licenmore = new Licenmore($("#licenList"), "/comment/getRegulatorInfos.json", {
    "brokerUserId": brokerUserId
  });
}

// $("#licenList li .title-license").each(function(i){
//     $(this).click(function(){
//         var _this = $(this);
//         _this.find(".icon").toggleClass("rotate_180");
//         _this.find(".img_layout").toggle();
//         _this.parent().find(".content-license").toggleClass("hide");
//         _this.parent().find(".p").toggleClass("active");
//     })
// })
/**
 *
 *实盘测试PK
 *
 **/

function Contrasole() { //对象
  emitEvent.call(this, arguments[0]);
}

function emitEvent(data) {
  var params = data;
  this.leftArr = []; //动态原始参照数组
  this.rightArr = []; //选择对比数组
  this.elem = params.el; //渲染对象
  this.key = params.key; //事件
  this.method = params.method; //事件回调方法
  this.refList = params.props; //数组扩充
  this.target = params.target; //事件源
  this.mounted = params.mounted //构建完成执行方法
  this.target.on(this.key, this.method.bind(this));
  return this;
}

function computedAttr() {
  var classArr = [];
  var len = this.leftArr.length;
  for (var i = 0; i < 5; i++) {
    if (this.rightArr[i] > this.leftArr[i]) {
      classArr.push({
        right: (i == 0 ? "down" : 'up'),
        left: (i == 0 ? "up" : 'down'),
      })
    } else if (this.rightArr[i] < this.leftArr[i]) {
      classArr.push({
        right: (i == 0 ? "up" : 'down'),
        left: (i == 0 ? "down" : 'up')
      })
    } else {
      if (this.leftArr[i] == 0) {
        classArr.push({
          right: 'down',
          left: 'down'
        })
      } else {
        classArr.push({
          right: 'up',
          left: 'up'
        })
      }
    }
  }
  this.classArr = classArr;
  return this;
}

function directionArr(arr, direction, arrWidth) {
  var str = '';
  if (arr.length && this.classArr.length) {
    for (var i = 0; i < 5; i++) {
      str += '<li style="width:' + (arr[i + 5] <= 20 ? 20 : arr[i + 5]) + '%;' + (arr[i] == "" ? "visibility: hidden;" : "") + '"><ins class="' + this.classArr[i][direction] + '">' + (arr[i] ? arr[i] : "0.00") + '</ins></li>';
    }
  } else {
    str = '<span>选择经纪商进行对比</span>';
  }
  return str;
}

function updataContent() { //页面展示对比数据实现
  var options = this.directionArr();
  this.elem.find(".contrast_left").html(options.left);
  this.elem.find(".contrast_right").html(options.right);
  return this;
}

function ajaxContrast(url, callback, data) {
  $.ajax({
    url: baseUrl2 + url,
    dataType: "jsonp",
    type: "GET",
    data: data,
    success: function(data) {
      if (typeof callback == 'function') callback(data);
    }
  });
  return this;
}

function defindOnly() {
  defineSetGet.call(this, "leftArr", this.leftWidth);
  defineSetGet.call(this, "rightArr", this.rightWidth);
  return this;
}

function defineSetGet(attr) {
  var that = this;
  var arrmap = [];
  Object.defineProperty(that, attr, {
    set: function(val) {
      arrmap = val;
      that.selectUpdata();
    },
    get: function() {
      return arrmap;
    }
  })
  return this;
}

function optionsHTML() {
  var str = "";
  for (var i = 0; i < this.refList.length; i++) {
    str += '<li>' + this.refList[i] + '</li>';
  }
  return str;
}

function contrastHTML() {
  var str = '<ul class="real_percent contrast_left"></ul><ul class="real_name">\
    ' + optionsHTML.call(this) + '\
  </ul><ul class="real_percent contrast_right"></ul>'
  this.elem.html(str);
  return this;
}

Contrasole.prototype.constructor = Contrasole;

Contrasole.prototype.directionArr = function() {
  var left = directionArr.call(this, this.leftArr, 'left');
  var right = directionArr.call(this, this.rightArr, 'right');
  return {
    left: left,
    right: right
  }
}

Contrasole.prototype.computedAttr = function() {
  computedAttr.call(this);
  return this;
}

Contrasole.prototype.updataContent = function() {
  updataContent.call(this);
  return this;
}

Contrasole.prototype.ajaxContrast = function(url, callback, data) {
  ajaxContrast.call(this, url, callback, data);
  return this;
}

Contrasole.prototype.defindOnly = function() {
  defindOnly.call(this);
  return this;
}

Contrasole.prototype.contrastHTML = function() {
  contrastHTML.call(this);
  return this;
}

Contrasole.prototype.selectUpdata = function() {
  this.computedAttr().updataContent();
  return this;
}

Contrasole.prototype.init = function() { //初始化执行入口
  this.mounted.call(this);
  this.defindOnly().contrastHTML();
  return this;
}

//select 选择对比
var select = $("#select-contrast select");
if ($("#contrast-list").data("totalpk")) {
  var complex = new Contrasole({
    el: $("#contrast-list"),
    target: $(".select"),
    key: "change",
    method: function() {
      var code = select.val();
      if (code != 0) {
        this.ajaxContrast('/comment/getCompareInfoByBrokerUserId.json', function(res) {
          var comList = res.data;
          var rightArr = [comList.euSpread, comList.outspread, comList.hardware, comList.comment, comList.complex];
          complex.rightWidth = [comList.euSpreadPercent, comList.outspreadPercent, comList.hardwarePercent, comList.commentPercent, comList.complexPercent];
          complex.rightArr = rightArr.concat(complex.rightWidth);
          //['欧美点差', '出金速度', '监管得分', '用户评分', '平台得分'] 数值 + 百分比;
        }, {
          brokerUserId: code
        })
      } else {
        this.rightArr = [];
      }
    },
    props: ['欧美点差', '出金速度', '监管得分', '用户评分', '平台得分'],
    mounted: function() { //初始化方法
      $("#compare-info").hide();
      var that = this;
      that.ajaxContrast("/comment/getAllBrokerList.json", function(res) {
        var str = "";
        var list = res.data.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].userId == brokerUserId) continue;
          str += '<option value="' + list[i].userId + '">' + list[i].brokerName + '</option>'
        }
        select.append(str);
        $("#compare-info").fadeIn(200);
      })
      $(".compare-info").hide();
      that.ajaxContrast('/comment/getActurlQuotationTest.json', function(res) {
        var comList = res.data.brokerCompareInfo;
        var avg = res.data.avgimplementExpress;
        var pos = res.data.positiveSlidingPoint;
        var neg = res.data.negativeSlidingPoint;
        if (avg != "" || pos != "" || neg != "") {
          $(".compare-info").fadeIn(200);
        }
        $("#compare-info").find("[data-avg]").html(res.data.avgimplementExpress);
        $("#compare-info").find("[data-positive]").html(res.data.positiveSlidingPoint);
        $("#compare-info").find("[data-negative]").html(res.data.negativeSlidingPoint);
        $("#compare-info").find("[data-euscount]").html(parseInt(res.data.eusPercent) + "<i>%</i>");
        $("#compare-info").find("[data-euspread]").html(parseInt(res.data.euSpreadPercent) + "<i>%</i>");
        $("#compare-info").find("[data-outsread]").html(parseInt(res.data.outSpreadPercent) + "<i>%</i>");
        var leftArr = [comList.euSpread, comList.outspread, comList.hardware, comList.comment, comList.complex];
        complex.leftWidth = [comList.euSpreadPercent, comList.outspreadPercent, comList.hardwarePercent, comList.commentPercent, comList.complexPercent];
        complex.leftArr = leftArr.concat(complex.leftWidth);
        //['欧美点差', '出金速度', '监管得分', '用户评分', '平台得分'] 数值 + 百分比;

      }, {
        brokerUserId: brokerUserId
      });
    }
  });
  complex.init();
}

// complex.ajaxContrast('../js/js_app/moni.json', function(data) {complex.leftArr = [42, 61, 77, 81, 32, 29];complex.selectUpdata();})
// $("#select-contrast a").click(function() {
//   var code = select.val();
//   if (code != 0) {
//     complex.ajaxContrast('../js/js_app/moni.json?' + code, function(data) {
//       complex.rightArr = [44, 63, 45, 58, 80, 80]; //complex.selectUpdata();
//     })
//   } else {
//     complex.rightArr = []; //complex.selectUpdata();
//   }
// })

/**
 *
 *出入金
 *
 **/

function goldListHTML(res) {
  var inList = res.data.inList;
  var outList = res.data.outList;
  var instr = "",
    outstr = "";
  for (var i = 0; i < inList.length; i++) {
    instr += '<li class="table t_body">\
      <span>' + inList[i].mode + '</span>\
      <span>' + inList[i].cycle + '</span>\
      <span>' + inList[i].serviceCharge + '</span>\
    </li>'
  }
  $("[data-inlist]").append(instr);
  for (var j = 0; j < outList.length; j++) {
    outstr += '<li class="table t_body">\
      <span>' + outList[j].mode + '</span>\
      <span>' + outList[j].cycle + '</span>\
      <span>' + outList[j].serviceCharge + '</span>\
    </li>'
  }
  $("[data-outlist]").append(outstr);
}

if ($("#entry").data("entry")) {
  ajaxInfoGet("/comment/getOutInGoldList.json", function(res) {
    goldListHTML.call(this, res);
  }, {
    brokerUserId: brokerUserId
  })
}

/**
 *
 *分享页面
 *
 **/

function ShareZero(elem, container, params) {
  this.elem = elem;
  this.container = container;
  this.params = params;
}

function ajaxShareAd(url, data, basic) {
  var that = this;
  ajaxInfoGet(url, function(res) {
    var list = res.data.result || [];
    var adstr = "";
    var jsonAd = [];
    var pagination = "";
    for (var i = 0; i < list.length; i++) {
      if (!list[i].isExist) continue;
      adstr += '<div class="swiper-slide">\
          <a href="javascript:;" data-href="' + list[i].ad.triggerContent + '">\
            <img src="' + list[i].ad.adShowUrl + '" alt="" />\
            <i>' + list[i].ad.tag + '</i>\
          </a>\
      </div>'
      jsonAd.push(JSON.stringify(list[i].ad));
    }
    if (list.length && adstr != "") {
      if (list.length > 1) {
        pagination = '<div class="swiper-pagination"></div>';
      }
      adstr = '<div class="swiper-main swiper-container"><div class="swiper-wrapper">' + adstr + '\
      </div>' + pagination + '</div>';
    }
    that.elem.html(adstr);
    if (list.length <= 1) that.params.loop = false
    if (typeof Swiper == 'function') {
      Swiper.call(that, that.container, that.params); //ajax之后执行Swiper
    }
    targetURL.call(that, jsonAd); //点击进入详情
  }, data, basic);
}

function targetURL(jsonAd) {
  $(this.container).find('.swiper-slide').each(function(i) {
    $(this).click(function() {
      intoAdvDetail(jsonAd[i]);
    })
  })
}

function innerContent(url, data, basic) {
  ajaxShareAd.call(this, url, data, basic);
  return this;
}

ShareZero.prototype.constructor = ShareZero;

ShareZero.prototype.innerContent = function(url, data, basic) {
  innerContent.call(this, url, data, basic);
  return this;
}

ShareZero.prototype.init = function(url, data, basic) {
  this.innerContent(url, data, basic);
  return this;
}

if ($(".innerSwiper").data("share")) {
  var shareSwiper = new ShareZero($(".innerSwiper"), '.swiper-main', {
    pagination: '.swiper-pagination',
    observer: true,
    observeParents: true,
    paginationClickable: true,
    autoplay: 3000,
    loop: true
  });
  shareSwiper.init("/ad/getAdForNewVersion.json", {
    configName: "commentBanner2",
    appType: appType
  }, baseUrl2);
}

///三方服务内页
if ($("[data-threeinner]").data("threeinner")) {
  ajaxInfoGet("/comment/getThreeServiceDesc.json", function(res) {
    var str = "";
    for (var i = 0; i < res.data.keyWords.length; i++) {
      str += "<em>" + res.data.keyWords[i] + "</em>"
    }
    $("[data-logo]").attr("src", res.data.logo);
    $("[data-star]").attr("data-star", res.data.interbankrating);
    $("[data-keywords]").html(str).attr("data-keywords", res.data.keyWords.length);
    $("[data-name]").html(res.data.name);
    $("[data-category]").html(res.data.category);
    $("[data-companyprofile]").html(res.data.companyprofile ? res.data.companyprofile : "");
    shareThree(res);
  }, {
    userId: brokerUserId
  })
}

function shareThree(res) {
  var shareObj = {
    isShare: 1, //0:不分享 1:分享
    shareTitle: res.data.name,
    shareUrl: window.location.href,
    shareImage: "//m.fx168.com/img/img_download/jy_fx168_mobile_load_logo.png",
    shareContent: ""
  }
  console.log(shareObj)
  shareJs.call(this, JSON.stringify(shareObj));
}

///海外投资
if ($("[data-overseainner]").data("overseainner")) {
  ajaxInfoGet("/comment/getOverseasServiceDesc.json", function(res) {
    var str = "";
    for (var i = 0; i < res.data.keyWords.length; i++) {
      str += "<em>" + res.data.keyWords[i] + "</em>"
    }
    $("[data-logo]").attr("src", res.data.logo);
    $("[data-keywords]").html(str).attr("data-keywords", res.data.keyWords.length);
    $("[data-invest]").html(res.data.investmentstandard)
    $("[data-name]").html(res.data.name);
    $("[data-companyprofile]").html(res.data.companyprofile ? res.data.companyprofile : "");
    shareThree(res);
  }, {
    userId: brokerUserId
  })
}

if (window.history && window.history.pushState) {
  $(window).on('popstate', function() {
    showTitle(document.title);
  });
}

showTitle(document.title);

var hidden = $("meta[name='DianPing']").attr("content");
if (hidden) {
  isShowDianPingButton();
} else {
  isShowDianPingButton("hidden");
}

//点击广告新闻传参
function intoAdvDetail(str) {
  if (isiOS && window.webkit) {
    window.webkit.messageHandlers.intoAdvDetail.postMessage(str);
  } else if (isAndroid && window.SysClientJs) {
    window.SysClientJs.intoAdvDetail(str);
  }
}

function showTitle(str) {
  if (isiOS && window.webkit) {
    window.webkit.messageHandlers.showTitle.postMessage(str);
  } else if (isAndroid && window.SysClientJs) {
    window.SysClientJs.showTitle(str);
  }
}

//分享设置及入口
function intoDetail(str) {
  if (isiOS && window.webkit) {
    window.webkit.messageHandlers.intoDetail.postMessage(str);
  } else if (isAndroid && window.SysClientJs) {
    window.SysClientJs.intoDetail(str);
  }
}

//点评按钮隐藏否
function isShowDianPingButton(str) {
  if (isiOS && window.webkit) {
    window.webkit.messageHandlers.isShowDianPingButton.postMessage(str);
  } else if (isAndroid && window.SysClientJs) {
    window.SysClientJs.isShowDianPingButton(str);
  }
}

//分享允许否
function shareJs(shareJson) {
  if (isAndroid && window.SysClientJs) {
    window.SysClientJs.shareJs(shareJson);
  } else if (isiOS && window.webkit) {
    window.webkit.messageHandlers.shareJs.postMessage(shareJson);
  }
}
