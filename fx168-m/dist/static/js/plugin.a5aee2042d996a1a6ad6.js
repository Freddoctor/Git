!function(e){function t(t){for(var i,s,r=t[0],c=t[1],l=t[2],d=0,h=[];d<r.length;d++)s=r[d],a[s]&&h.push(a[s][0]),a[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(p&&p(t);h.length;)h.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},a={0:0},o=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="./";var r=window.webpackJsonp=window.webpackJsonp||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var p=c;o.push([218,1]),n()}({218:function(e,t,n){e.exports=n(552)},219:function(e,t,n){},250:function(e,t){},550:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAhBAMAAAArEJYgAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAhUExURUxpcd4WFt4WFt4WFt4WFt4WFt4WFt4WFt4WFt4WFt4WFveU9B8AAAAKdFJOUwCtLeQSZceEUgxghsXjAAAAUUlEQVQY02NgAAJGAQYYkFoIY7GvWlUAZUatWrUUwuJYBQQNYKYWiLkIxGJaBQYKQKYXhLmEgYHTCsJcPIGBeRUUGDBkwZjLwGasWgW3ePgzAa47QyQhp/SuAAAAAElFTkSuQmCC"},551:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAhBAMAAAArEJYgAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAnUExURUxpcQ3BOG9xKDagMWJ8KlCKLCesNFuCK2h2KUeRLh60NWl2KQDMOlWbJKMAAAAMdFJOUwD+D+RbrfSEM8f5KNAV6kEAAABWSURBVBjTY2AAgjNnGGBgBDDnnIGCkwzMMKYBA5MNhHVYgYFBDcJMAirmXgNindoA0tgIYkqAzWCROXPmoAPEWMczZ0SgNrCfOVMAsy3mKNxi1gAQCQCzhk33cScP/gAAAABJRU5ErkJggg=="},552:function(e,t,n){"use strict";n.r(t);n(219);var i=n(89),a=(n(124),n(217)),o=n.n(a),s=n(253);$(function(){sessionStorage.hq_inner_left=0,sessionStorage.pagecount3="分时";var e=null;$(".hqIn_title").html(sessionStorage.hq_inner_title),$(".title_date").html(sessionStorage.hq_inner_date),$(".hq_inner_trade").html(sessionStorage.hq_inner_tradePrice),$(".hq_inner_range").html(sessionStorage.hq_inner_range),$(".hq_inner_rangePercent").html(sessionStorage.hq_inner_rangePercent),$(".hq_data_open").html(sessionStorage.hq_inner_openPrice),$(".hq_data_high").html(sessionStorage.hq_inner_highPrice),$(".hq_data_preClose").html(sessionStorage.hq_inner_preClosePrice),$(".hq_data_low").html(sessionStorage.hq_inner_lowPrice),sessionStorage.clickType="Min01",$(".hq_inner_con_Left").attr("data-key",sessionStorage.hq_inner_key);(e=o.a.connect(i.socketUrl,{reconnect:!0})).on("connect",function(t){e.emit("quotationH5",{secret:"h5Socket",appType:"h5"})}),e.on("quotationPushH5",function(e){var t=JSON.parse(e),n=null;e=null;$.each(t,function(t,i){n=t,e=i}),$(".hq_inner_con_Left").attr("data-key")==n&&($(".hq_inner_trade").html(e[0]),$(".hq_inner_range").html(e[5]),$(".hq_inner_rangePercent").html(e[6]),$(".title_date").html(e[7]))}),sessionStorage.hq_inner_range>0?($(".hq_inner_trade").css("color","#EC1A1A"),$(".hq_inner_range").css("color","#EC1A1A"),$(".hq_inner_rangePercent").css("color","#EC1A1A"),$(".hq_inner_tradeWrap img").attr("src",""+n(550))):($(".hq_inner_trade").css("color","#0AA20D"),$(".hq_inner_range").css("color","#0AA20D"),$(".hq_inner_rangePercent").css("color","#0AA20D"),$(".hq_inner_tradeWrap img").attr("src",""+n(551))),$(".titleBar1").html(sessionStorage.fgTile),$(".find_nav_list").css("left",sessionStorage.hq_inner_left+"px"),$(".find_nav_list li").each(function(){if($(this).find("a").text()==sessionStorage.pagecount3)return $(".sideline").css({left:0}),$(".sideline").css({width:$(this).outerWidth()}),$(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur"),d(sessionStorage.pagecount3),!1;$(".sideline").css({left:0}),$(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur")});var t=$(".find_nav_list li").first().width();$(".sideline").width(t),$(".find_nav_list li").on("click",function(){t=$(this).width(),$(".sideline").stop(!0),$(".sideline").animate({left:$(this).position().left},300),$(".sideline").animate({width:t}),$(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");var e,n=($(".find_nav").width()-t)/2,i=parseInt($(this).position().left);e=i<=n?0:n-i<=p-l?p-l:n-i,$(".find_nav_list").animate({left:e},300),sessionStorage.hq_inner_left=e,d($(this).find("a").text())});var a,r,c,l=$(".find_nav_list").width(),p=$(".find_nav_left").width();function d(e){switch(e){case"分时":sessionStorage.pagecount3="分时";break;case"1小时":sessionStorage.pagecount3="1小时";break;case"日线":sessionStorage.pagecount3="日线";break;case"周线":sessionStorage.pagecount3="周线";break;case"月线":sessionStorage.pagecount3="月线";break;case"期货":sessionStorage.pagecount3="分钟"}}$(".find_nav_list").on("touchstart",function(e){var t=e.originalEvent.targetTouches[0];a=t.pageX,r=t.pageY,c=parseInt($(this).css("left"))}),$(".find_nav_list").on("touchmove",function(e){var t=e.originalEvent.targetTouches[0],n=t.pageX,i=t.pageY;c+n-a>=0?$(this).css("left",0):c+n-a<=p-l?$(this).css("left",p-l):$(this).css("left",c+n-a),Math.abs(i-r)>0&&e.preventDefault()}),$(".hq_inner_fz").click(function(){"none"==$(".hq_inner_fzx_wrap").css("display")?$(".hq_inner_fzx_wrap").css("display","block"):"block"==$(".hq_inner_fzx_wrap").css("display")&&$(".hq_inner_fzx_wrap").css("display","none")}),$(".hq_inner_fzx_wrap ul li").click(function(){$(".hq_inner_fzx_wrap").css("display","none");var e=$(this).index();$(".hq_inner_fzx_wrap ul li").eq(e).each(function(){$(".hq_inner_fz a").html($(this).text())})});for(var h=0;h<$(".find_nav_list li").length;h++)$(".find_nav_list li").eq(h).click(function(){$(this).index()<5&&($(".hq_inner_fzx_wrap").css("display","none"),$(".hq_inner_fz a").html("分钟")),$(this).index()>0?($("#container").css("display","none"),$("#container2").css("display","block")):0==$(this).index()&&($("#container2").css("display","none"),$("#container").css("display","block"))});function f(){$.ajax({url:i.baseUrl+"quotation/getData.json",dataType:"JSONP",type:"GET",data:{count:240,type:sessionStorage.clickType,code:sessionStorage.hq_inner_key},success:g})}function g(e){for(var t=e.data.totalList,n=[],i=[],a=[],o=0;o<t.length;o++){var r=t[o].date.split(" ")[0],c=t[o].highPrice,l=t[o].openPrice,p=t[o].lowPrice,d=t[o].closePrice,h=t[o].amount;n.unshift([parseFloat(l),parseFloat(d),parseFloat(p),parseFloat(c),parseFloat(h)]),i.unshift(r),a.unshift(h)}function f(e){for(var t=[],a=0,o=i.length;a<o;a++)if(a<e)t.push("-");else{for(var s=0,r=0;r<e;r++)s+=n[a-r][1];t.push((s/e).toFixed(2))}return t}var g=document.getElementById("container2"),u=s.init(g),A={title:{text:"",left:0},tooltip:{textStyle:{color:"white",decoration:"none",fontFamily:"Verdana, sans-serif",fontSize:30,fontStyle:"italic",fontWeight:"bold"},trigger:"axis",axisPointer:{type:"line"}},grid:[{left:"10%",right:"7%",height:"55%"},{left:"10%",right:"7%",top:"71%",height:"30%"}],xAxis:[{axisLabel:{textStyle:{fontSize:20}},type:"category",data:i,scale:!0,boundaryGap:!1,axisLine:{onZero:!1},splitLine:{show:!1},splitNumber:20,min:"dataMin",max:"dataMax"},{type:"category",gridIndex:1,data:i,axisLabel:{show:!1}}],yAxis:[{axisLabel:{textStyle:{fontSize:20}},scale:!0,splitArea:{show:!1}},{gridIndex:1,splitNumber:3,axisLine:{onZero:!1},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{show:!0,textStyle:{fontSize:14}}}],dataZoom:[{type:"inside",dataZoomIndex:100,xAxisIndex:[0,0],start:80,end:100},{show:!0,xAxisIndex:[0,1],type:"slider",top:"97%",start:80,end:100}],series:[{name:"K线周期图表(matols.com)",type:"candlestick",data:n,itemStyle:{normal:{color:"#EC1A1A",color0:"#0AA20D",borderColor:"#EC1A1A",borderColor0:"#0AA20D"}},markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]}},{name:"MA5",type:"line",data:f(5),smooth:!0,lineStyle:{normal:{opacity:.5,color:"blue"}}},{name:"MA10",type:"line",data:f(10),smooth:!0,lineStyle:{normal:{opacity:.5,color:"yellow"}}},{name:"MA30",type:"line",data:f(30),smooth:!0,lineStyle:{normal:{opacity:.5,color:"red"}}},{name:"成交量",type:"bar",xAxisIndex:1,yAxisIndex:1,data:a,itemStyle:{normal:{color:function(e){return n[e.dataIndex][1]>n[e.dataIndex][0]?"#ef232a":"#14b143"}}}}]};if(A&&"object"==typeof A){var _=+new Date;u.setOption(A,!0);new Date}}$(".min").click(function(){sessionStorage.clickType="Min01"}),$(".hq_hour").click(function(){sessionStorage.clickType="Min60",1,f()}),$(".hq_day").click(function(){sessionStorage.clickType="Day",1,f()}),$(".hq_week").click(function(){sessionStorage.clickType="Week",4,f()}),$(".hq_month").click(function(){sessionStorage.clickType="Month",5,f()}),$(".hq_min01").click(function(){sessionStorage.clickType="Min01",1,f()}),$(".hq_min03").click(function(){sessionStorage.clickType="Min03",6,f()}),$(".hq_min05").click(function(){sessionStorage.clickType="Min05",2,f()}),$(".hq_min15").click(function(){sessionStorage.clickType="Min15",2,f()}),$(".hq_min30").click(function(){sessionStorage.clickType="Min30",2,f()}),$.ajax({url:i.baseUrl+"quotation/getData.json",dataType:"JSONP",type:"GET",data:{count:240,type:sessionStorage.clickType,code:sessionStorage.hq_inner_key},success:function(e){for(var t=e.data.totalList,n=[],i="",a=[],o=[],r=[],c=0;c<t.length;c++){n.push(t[c].date);var i=t[c].date,l=i.split(" ");a.unshift(l[1]),o.unshift(t[c].closePrice),r.unshift(t[c].closePrice)}for(var p=r.sort(),d="",h="",c=0;c<p.length;c++)h=p[0],d=p[c];var f=document.getElementById("container"),g=s.init(f),u={title:{left:0,text:""},tooltip:{textStyle:{color:"white",decoration:"none",fontFamily:"Verdana, sans-serif",fontSize:30,fontStyle:"italic",fontWeight:"bold"},trigger:"axis",axisPointer:{type:"line"},position:function(e){return[e[0],"10%"]}},grid:[{left:"5%",right:"1%"}],toolbox:{feature:{dataZoom:{yAxisIndex:"none"},restore:{},saveAsImage:{}}},xAxis:{left:0,type:"category",boundaryGap:!1,data:a,axisLabel:{textStyle:{fontSize:20,color:"#3E454D"}}},yAxis:{axisLabel:{textStyle:{fontSize:20,color:"#3E454D"}},splitNumber:3,type:"value",boundaryGap:[0,"100%"],min:h,max:d},dataZoom:[{type:"inside",start:0,end:100},{start:0,end:100,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],series:[{name:"",type:"line",smooth:!0,symbol:"none",sampling:"average",itemStyle:{normal:{color:"#84b3ff"}},areaStyle:{normal:{color:new s.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#2b3c59",opacity:.2},{offset:1,color:"#2b3c59",opacity:.2}])}},data:o}]};if(u&&"object"==typeof u){new Date;g.setOption(u,!0);new Date}}})});var r=parseInt(window.screen.width)/750,c=navigator.userAgent,l=document.getElementsByTagName("head")[0];/Android (\d+\.\d+)/.test(c)?parseFloat(RegExp.$1)>2.3?$(l).append('<meta name="viewport" content="width=0, minimum-scale = '+r+", maximum-scale = "+r+', target-densitydpi=device-dpi">'):$(l).append('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">'):$(l).append('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');!function(e,t,n,i,a,o,s){e.GoogleAnalyticsObject=a,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,o=t.createElement(n),s=t.getElementsByTagName(n)[0],o.async=1,o.src="//www.google-analytics.com/analytics.js",s.parentNode.insertBefore(o,s)}(window,document,"script",0,"ga"),ga("create","UA-47403057-1","auto"),ga("require","displayfeatures"),ga("require","linkid","linkid.js"),ga("send","pageview");var p="https: "==document.location.protocol?"https://":"http://";document.write(unescape("%3Cscript src='"+p+"hm.baidu.com/h.js%3F779dfdbe4a000d1108b8a1daa23f17bd' type='text/javascript' %3E%3C/script%3E "))},89:function(e,t){var n,i=["https://app6.fx168api.com:9091","https://app7.fx168api.com:9091"],a=Math.floor(Math.random()*i.length);n=i[a],e.exports.sckUrl1="https://app6.fx168api.com:9091",e.exports.sckUrl2="https://app7.fx168api.com:9091",e.exports.socketUrlArr=i,e.exports.sudiUrlArr=["https://app9.fx168api.com:9093","https://app8.fx168api.com:9093"],e.exports.baseUrl="https://app5.fx168api.com/h5/",e.exports.baseUrlHost="",e.exports.socketUrl=n,e.exports.searchUrl="https://app4.fx168api.com/",e.exports.index_socket=a}});
