!function(e){function t(t){for(var o,r,s=t[0],c=t[1],l=t[2],p=0,f=[];p<s.length;p++)r=s[p],i[r]&&f.push(i[r][0]),i[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(d&&d(t);f.length;)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(o=!1)}o&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},i={31:0},a=[];function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;a.push([164,0]),n()}({0:function(e,t){var n,o=["https://app6.fx168api.com:9091","https://app7.fx168api.com:9091"],i=Math.floor(Math.random()*o.length);n=o[i],e.exports.sckUrl1="https://app6.fx168api.com:9091",e.exports.sckUrl2="https://app7.fx168api.com:9091",e.exports.socketUrlArr=o,e.exports.sudiUrlArr=["https://app9.fx168api.com:9093","https://app8.fx168api.com:9093"],e.exports.baseUrl="https://app5.fx168api.com/h5/",e.exports.baseUrlHost="",e.exports.socketUrl=n,e.exports.searchUrl="https://app4.fx168api.com/",e.exports.index_socket=i},1:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACEBAMAAAAn7Hm6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAPUExURezs7Lu7u+Hh4cbGxtLS0ngGgUEAAAGnSURBVGje7ZZLloMgEEWJugCRLEATF+BvAZq4/zU1xU9Q04fQDnrw7sATDHKlKAoZAwAAAAAAAAAAAAAAAPCfKXpumAt5mWp1c+ScNZyLgVqZ69JR82lbQ7TEDaAlXJCDfpBE3gy6dPZPzxlBzncSenLZJNVh1GVr3iMly0EizKhaIsdpQgn3qKOjJR4axh4tRWaWo06ymVHrrt/jpbvUel4qTIUJZgSyZ+mnAUWot3FYlKRXQfN7uEe7aEl3zANzq7GSMlxE1zVRctPr8VlyxUwyk1K/Subv12Rwi2rjNe8llU0N/YQYJX18dm3pWG7xOkgM4sWCjI7dJwdJdhYuf2NcISlMaTmXdHrRvtyMB4mrWKeSSr2E2pptenbpIavT7FpojsE+KdMktn6dSW5GIv4qabjIXbx2kvwqiQzVll9NWLtuV4QrW9c3TYLK7vpyElqK2hyQWjLYAzJh4e3JmNv61ezPEzmlIIXnREll6tcmKYJ94me0YGkSFZhnIPHrSnhgD2mSUQfg3fsS97Uyqh3emqaY8K0HAAAAAAAAAAAAAAAAqfwAfn9Qnz3ZxGYAAAAASUVORK5CYII="},12:function(e,t,n){},164:function(e,t,n){e.exports=n(192)},165:function(e,t,n){},192:function(e,t,n){"use strict";n.r(t);n(165),n(12),n(2);var o=n(0);n(3);$(function(){$(".tabNav").click(function(e){$(this).index(),e.preventDefault(),$(".tabNav a").removeClass("selected"),$(this).find($("a")).addClass("selected")}),$.ajax({type:"GET",url:o.baseUrl+"zhuanti/getZhuantiContent.json",data:{zhuantiId:sessionStorage.zhuanTiId},dataType:"jsonp",success:s}),$(window).scroll(function(){var e=$(document).scrollTop();0==e?$(".blue").addClass("selected2"):$(".blue").removeClass("selected2")}),$(".close").click(function(){$(".wrap").hide(),$(".nav-container").css("top",0),$(".moudle").css("height","0"),$(".second_tab_top").css("top","0.81rem")}),$(".close").click()});var i=null,a=null,r=null;function s(e){$(".upWrap").css("display","none");var t=e.data;$(".top_img").attr("src",t.zhuanti.image),$(".font_zy").html(t.zhuanti.content);for(var n=0;n<$(".tabNav a").length;n++)$(".tabNav a").eq(n).html(t.zhuantiContent[n].desc),$(".second_tab_continar span").eq(n).html(t.zhuantiContent[n].desc);c(e,0,".second_con_first"),c(e,1,".second_con_second"),c(e,2,".second_con_third")}function c(e,t,o){for(var i=e.data.zhuantiContent[t].newList,a="",r=0;r<i.length;r++){var s=i[r].publishTime.substring(5,16),c=i[r].newsTitle.substring(0,28);i[r].publishTime=s,i[r].newsTitle=c,a+='<a class="oli2" href="/active/article/'+i[r].id+'.html" data_newID="'+i[r].id+'"><img class="newImg lazy" data-original="'+i[r].image+'" src="'+n(1)+'" alt=""><div class="odiv"><div class="newsTitle"><p class="news_tile_p">'+i[r].newsTitle+'</p><div class="new_bt"><p class="new_bt_p1"><img class="clickimg" src="'+n(4)+'"/>'+i[r].clickNum+'</p><p class="new_bt_p2">'+i[r].publishTime+"</p></div></div></div></a>"}$(o).append(a),$("img.lazy").lazyload()}window.onload=function(){i=$(".second_tab_first").offset().top-179,a=$(".second_tab_second").offset().top-179,r=$(".second_tab_third").offset().top-179,$(window).scroll(function(){var e=$(document).scrollTop();e>=i||e>=a||e>=r?$(".second_tab_top").show():$(".second_tab_top").hide(),e>=i&&e<=a?$(".top_ft").html($(".second_tab_first span").html()):e>=a&&e<=r?$(".top_ft").html($(".second_tab_second span").html()):e>=r&&$(".top_ft").html($(".second_tab_third span").html())})};n(26),n(167);$(function(){var e=$(".nav-container"),t=$("nav");e.waypoint({handler:function(n,o){"down"==o?(e.css({height:t.outerHeight()}),t.stop().addClass("sticky").css("top",-t.outerHeight()).animate({top:15})):(e.css({height:"auto"}),t.stop().removeClass("sticky").css("top",t.outerHeight()+50).animate({top:""}))},offset:function(){return-t.outerHeight()-50}});var n=$("section"),o=$("nav a");n.waypoint({handler:function(e,t){var n;n=$(this),"up"===t&&(n=n.prev());var i=$('nav a[href="#'+n.attr("id")+'"]');o.removeClass("selected"),i.addClass("selected")},offset:"25%"}),o.click(function(e){$.scrollTo($(this).attr("href"),{duration:200,offset:{left:0,top:-.06*$(window).height()}})})});var l=parseInt(window.screen.width)/750,d=navigator.userAgent,p=document.getElementsByTagName("head")[0];/Android (\d+\.\d+)/.test(d)?parseFloat(RegExp.$1)>2.3?$(p).append('<meta name="viewport" content="width=0, minimum-scale = '+l+", maximum-scale = "+l+', target-densitydpi=device-dpi">'):$(p).append('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">'):$(p).append('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');!function(e,t,n,o,i,a,r){e.GoogleAnalyticsObject=i,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,a=t.createElement(n),r=t.getElementsByTagName(n)[0],a.async=1,a.src="//www.google-analytics.com/analytics.js",r.parentNode.insertBefore(a,r)}(window,document,"script",0,"ga"),ga("create","UA-47403057-1","auto"),ga("require","displayfeatures"),ga("require","linkid","linkid.js"),ga("send","pageview");var f="https:"==document.location.protocol?"https://":"http://";document.write(unescape("%3Cscript src='"+f+"hm.baidu.com/h.js%3F779dfdbe4a000d1108b8a1daa23f17bd' type='text/javascript'%3E%3C/script%3E"))},26:function(e,t,n){"use strict";n(2),sessionStorage.news_id;var o="fx168://m.fx168.com/main?type=quotation&key="+sessionStorage.hq_inner_key+"&keyWords="+sessionStorage.hq_inner_title+"&date="+sessionStorage.hq_inner_date+"&tradePrice="+sessionStorage.hq_inner_tradePrice+"&range="+sessionStorage.hq_inner_range+"&rangePercent="+sessionStorage.hq_inner_rangePercent+"&openPrice="+sessionStorage.hq_inner_openPrice+"&highPrice="+sessionStorage.hq_inner_highPrice+"&preClosePrice="+sessionStorage.hq_inner_preClosePrice+"&lowPrice="+sessionStorage.hq_inner_lowPrice+"&decimalDigits="+sessionStorage.decimalDigits,i="fx168://m.fx168.com/special?zhuanTiId="+sessionStorage.zhuanTiId;function a(e){if("micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i))window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168";else if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){var t=new Date;window.setTimeout(function(){new Date-t<5e3?window.location="https://itunes.apple.com/cn/app/id535352246":window.close()},2e3),window.location=e}else if(navigator.userAgent.match(/android/i)){try{window.location=e,setTimeout(function(){window.location="http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168"},2e3)}catch(e){}}}$("#downApp").click(function(){a(o)}),$("#zhuanTiInner").click(function(){a(i)})},3:function(e,t){
/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(e,t,n,o){var i=e(t);e.fn.lazyload=function(a){function r(){var t=0;c.each(function(){var n=e(this);if(!l.skip_invisible||n.is(":visible"))if(e.abovethetop(this,l)||e.leftofbegin(this,l));else if(e.belowthefold(this,l)||e.rightoffold(this,l)){if(++t>l.failure_limit)return!1}else n.trigger("appear"),t=0})}var s,c=this,l={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:t,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return a&&(o!==a.failurelimit&&(a.failure_limit=a.failurelimit,delete a.failurelimit),o!==a.effectspeed&&(a.effect_speed=a.effectspeed,delete a.effectspeed),e.extend(l,a)),s=l.container===o||l.container===t?i:e(l.container),0===l.event.indexOf("scroll")&&s.bind(l.event,function(){return r()}),this.each(function(){var t=this,n=e(t);t.loaded=!1,(n.attr("src")===o||!1===n.attr("src"))&&n.is("img")&&n.attr("src",l.placeholder),n.one("appear",function(){if(!this.loaded){if(l.appear){var o=c.length;l.appear.call(t,o,l)}e("<img />").bind("load",function(){var o=n.attr("data-"+l.data_attribute);n.hide(),n.is("img")?n.attr("src",o):n.css("background-image","url('"+o+"')"),n[l.effect](l.effect_speed),t.loaded=!0;var i=e.grep(c,function(e){return!e.loaded});if(c=e(i),l.load){var a=c.length;l.load.call(t,a,l)}}).attr("src",n.attr("data-"+l.data_attribute))}}),0!==l.event.indexOf("scroll")&&n.bind(l.event,function(){t.loaded||n.trigger("appear")})}),i.bind("resize",function(){r()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&i.bind("pageshow",function(t){t.originalEvent&&t.originalEvent.persisted&&c.each(function(){e(this).trigger("appear")})}),e(n).ready(function(){r()}),this},e.belowthefold=function(n,a){return(a.container===o||a.container===t?(t.innerHeight?t.innerHeight:i.height())+i.scrollTop():e(a.container).offset().top+e(a.container).height())<=e(n).offset().top-a.threshold},e.rightoffold=function(n,a){return(a.container===o||a.container===t?i.width()+i.scrollLeft():e(a.container).offset().left+e(a.container).width())<=e(n).offset().left-a.threshold},e.abovethetop=function(n,a){return(a.container===o||a.container===t?i.scrollTop():e(a.container).offset().top)>=e(n).offset().top+a.threshold+e(n).height()},e.leftofbegin=function(n,a){return(a.container===o||a.container===t?i.scrollLeft():e(a.container).offset().left)>=e(n).offset().left+a.threshold+e(n).width()},e.inviewport=function(t,n){return!(e.rightoffold(t,n)||e.leftofbegin(t,n)||e.belowthefold(t,n)||e.abovethetop(t,n))},e.extend(e.expr[":"],{"below-the-fold":function(t){return e.belowthefold(t,{threshold:0})},"above-the-top":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-screen":function(t){return e.rightoffold(t,{threshold:0})},"left-of-screen":function(t){return!e.rightoffold(t,{threshold:0})},"in-viewport":function(t){return e.inviewport(t,{threshold:0})},"above-the-fold":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-fold":function(t){return e.rightoffold(t,{threshold:0})},"left-of-fold":function(t){return!e.rightoffold(t,{threshold:0})}})}(jQuery,window,document)},4:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAQMAAABsABwUAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAGUExURUxpcYiIiGVD8nQAAAABdFJOUwBA5thmAAAAF0lEQVQI12NgY2BggGPGBgQ2ROBjhDEAoXUQ/LmvDogAAAAASUVORK5CYII="}});