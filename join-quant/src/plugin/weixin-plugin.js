import wx from "./jweixin-1.4.0.js";
wx.config({
  debug: true,
  appId: 'wx901ab71440d3e1f7',
  timestamp: new Date().getTime(),
  nonceStr: 'iRxIYzUK1rv6xNJ9',
  signature: 'fc5b5b788a1b3a4827d461406dd97a43f7d8d608',
  jsApiList: [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'onVoicePlayEnd',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
  ]
});

wx.wxShare = wxShare;

function wxShare(title, desc, link, imgUrl, sucback, failback) {
  var options = {
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl
  }
  wx.ready(function() {
    wx.updateAppMessageShareData(options, sucback);
    wx.updateTimelineShareData(options, sucback);
    ShareWeibo(title, desc, link, imgUrl, sucback, failback);
  })
}

function ShareWeibo(title, desc, link, imgUrl, sucback, failback) {
  wx.onMenuShareWeibo({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl,
    success: sucback,
    fail: failback
  });
}

console.log(wx);

export default wx
