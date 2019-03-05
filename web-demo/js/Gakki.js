var baseUrl = {
  api:"https://app5.fx168api.com/"
}

var shareData = {
  link:"",
  title: '就差你了，测试测试测试',
  desc: '测试测试测试',
}

var code = getQueryString("code");

getJsapiSignature(); //微信授权

function getJsapiSignature() {
  $.ajax({
    url: baseUrl.api + "/common/getJsapiSignature.json",
    dataType: "jsonp",
    type: "GET",
    data: {
      url: location.href.split('#')[0]
    },
    success: function(res) {
      var data = res.data;
      shareData.link = data.url;
      wx.config({
        debug: false, // 开启调试模式。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "previewImage"] // 必填，需要使用的JS接口列表
      });
      wxShare(shareData)
    }
  });
}

function wxShare(shareData) {
  wx.ready(function() { //微信分享
    wx.checkJsApi({
      jsApiList: [
        'onMenuShareAppMessage',
        'previewImage',
        'onMenuShareTimeline'
      ],
      success: function(res) {
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
      }
    });
  })
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  // if (r != null) return unescape(r[2]);
  if (r != null) return r[2];
  return null;
}
