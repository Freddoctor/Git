!function(e){function A(A){for(var i,o,l=A[0],r=A[1],c=A[2],d=0,p=[];d<l.length;d++)o=l[d],n[o]&&p.push(n[o][0]),n[o]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);for(h&&h(A);p.length;)p.shift()();return a.push.apply(a,c||[]),t()}function t(){for(var e,A=0;A<a.length;A++){for(var t=a[A],i=!0,l=1;l<t.length;l++){var r=t[l];0!==n[r]&&(i=!1)}i&&(a.splice(A--,1),e=o(o.s=t[0]))}return e}var i={},n={0:0},a=[];function o(A){if(i[A])return i[A].exports;var t=i[A]={i:A,l:!1,exports:{}};return e[A].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=i,o.d=function(e,A,t){o.o(e,A)||Object.defineProperty(e,A,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,A){if(1&A&&(e=o(e)),8&A)return e;if(4&A&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&A&&"string"!=typeof e)for(var i in e)o.d(t,i,function(A){return e[A]}.bind(null,i));return t},o.n=function(e){var A=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(A,"a",A),A},o.o=function(e,A){return Object.prototype.hasOwnProperty.call(e,A)},o.p="./";var l=window.webpackJsonp=window.webpackJsonp||[],r=l.push.bind(l);l.push=A,l=l.slice();for(var c=0;c<l.length;c++)A(l[c]);var h=r;a.push([4,1]),t()}([,function(e,A){var t,i=["https://app6.fx168api.com:9091","https://app7.fx168api.com:9091"],n=Math.floor(Math.random()*i.length);t=i[n],e.exports.sckUrl1="https://app6.fx168api.com:9091",e.exports.sckUrl2="https://app7.fx168api.com:9091",e.exports.socketUrlArr=i,e.exports.sudiUrlArr=["https://app9.fx168api.com:9093","https://app8.fx168api.com:9093"],e.exports.baseUrl="https://app5.fx168api.com/h5/",e.exports.baseUrlHost="",e.exports.socketUrl=t,e.exports.searchUrl="https://app4.fx168api.com/",e.exports.index_socket=n},,,function(e,A,t){e.exports=t(18)},function(e,A,t){},,,,function(e,A){
/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(e,A,t,i){var n=e(A);e.fn.lazyload=function(a){function o(){var A=0;r.each(function(){var t=e(this);if(!c.skip_invisible||t.is(":visible"))if(e.abovethetop(this,c)||e.leftofbegin(this,c));else if(e.belowthefold(this,c)||e.rightoffold(this,c)){if(++A>c.failure_limit)return!1}else t.trigger("appear"),A=0})}var l,r=this,c={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:A,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return a&&(i!==a.failurelimit&&(a.failure_limit=a.failurelimit,delete a.failurelimit),i!==a.effectspeed&&(a.effect_speed=a.effectspeed,delete a.effectspeed),e.extend(c,a)),l=c.container===i||c.container===A?n:e(c.container),0===c.event.indexOf("scroll")&&l.bind(c.event,function(){return o()}),this.each(function(){var A=this,t=e(A);A.loaded=!1,(t.attr("src")===i||!1===t.attr("src"))&&t.is("img")&&t.attr("src",c.placeholder),t.one("appear",function(){if(!this.loaded){if(c.appear){var i=r.length;c.appear.call(A,i,c)}e("<img />").bind("load",function(){var i=t.attr("data-"+c.data_attribute);t.hide(),t.is("img")?t.attr("src",i):t.css("background-image","url('"+i+"')"),t[c.effect](c.effect_speed),A.loaded=!0;var n=e.grep(r,function(e){return!e.loaded});if(r=e(n),c.load){var a=r.length;c.load.call(A,a,c)}}).attr("src",t.attr("data-"+c.data_attribute))}}),0!==c.event.indexOf("scroll")&&t.bind(c.event,function(){A.loaded||t.trigger("appear")})}),n.bind("resize",function(){o()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&n.bind("pageshow",function(A){A.originalEvent&&A.originalEvent.persisted&&r.each(function(){e(this).trigger("appear")})}),e(t).ready(function(){o()}),this},e.belowthefold=function(t,a){return(a.container===i||a.container===A?(A.innerHeight?A.innerHeight:n.height())+n.scrollTop():e(a.container).offset().top+e(a.container).height())<=e(t).offset().top-a.threshold},e.rightoffold=function(t,a){return(a.container===i||a.container===A?n.width()+n.scrollLeft():e(a.container).offset().left+e(a.container).width())<=e(t).offset().left-a.threshold},e.abovethetop=function(t,a){return(a.container===i||a.container===A?n.scrollTop():e(a.container).offset().top)>=e(t).offset().top+a.threshold+e(t).height()},e.leftofbegin=function(t,a){return(a.container===i||a.container===A?n.scrollLeft():e(a.container).offset().left)>=e(t).offset().left+a.threshold+e(t).width()},e.inviewport=function(A,t){return!(e.rightoffold(A,t)||e.leftofbegin(A,t)||e.belowthefold(A,t)||e.abovethetop(A,t))},e.extend(e.expr[":"],{"below-the-fold":function(A){return e.belowthefold(A,{threshold:0})},"above-the-top":function(A){return!e.belowthefold(A,{threshold:0})},"right-of-screen":function(A){return e.rightoffold(A,{threshold:0})},"left-of-screen":function(A){return!e.rightoffold(A,{threshold:0})},"in-viewport":function(A){return e.inviewport(A,{threshold:0})},"above-the-fold":function(A){return!e.belowthefold(A,{threshold:0})},"right-of-fold":function(A){return e.rightoffold(A,{threshold:0})},"left-of-fold":function(A){return!e.rightoffold(A,{threshold:0})}})}(jQuery,window,document)},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAASCAMAAAA0cZ07AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA/UExURUxpcf///////////////////////////////////////////////////////////////////////////////+7j7AIAAAAUdFJOUwB39RyCzqAJEoxWZpazSTPw4CnAyVbf1wAAAOtJREFUOMt90tkSwyAIBVBU3KJm9f+/tZomJCotT5kz3HYEAK6ywcJQLLLqsx8bfWSQUyfz6kZ0I7KKOWfRNyKCH5BTu5b4Znt0oHpkNeZa2DaeT/Qd9joLo/Nd2oiZMJ4vjYScTrmvqWDCaaH/W4JPBVl1ukvrMlWn29X4irxa06SPcyjWxP3V98UfGuSTNvdIg6TdRkJekdKpWe812wT/1XNxOo0mzulB8e1pPObrY38hq6+3P9ckLSjcUAG8kNO9xKRQoh4u7XXXgCei1c+yOS2XY1Tdq5f1Zi5M+kZDyKoN9w+p4OAfDvoBEbwTxDPFbvcAAAAASUVORK5CYII="},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAASCAMAAAA0cZ07AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA2UExURUxpcf///////////////////////////////////////////////////////////////////6Sl3sMAAAARdFJOUwCCzlbzjXcJnRFnHDCzSeDAec/bvgAAAOpJREFUOMuN01mShSAMBdDLJEFwYP+b7UADDqDPfFmnLpYkEShlZ4uuhjhUEw2+IQx16nTU7hOyuk5FjHHCF4QQMDe1mpOb/YCsDv6mFFMJ/Ebki5um60Qy1pI0rY/4r7ltjoqqeC/1gFCLUKF9RZjNouDkLSi5q0NkvQ7MJLV0Ce65KUNkpXA6XXQ+Bam2dIisbeLUVLTgch16h2nopePLaTcHySEeC3M6vrfkhnfEvpYHf6g+rmnfEdrCi014oGnghJ78lA60zg4RQUJkFVZW5SUhn+ZqdF6PZ+TNkVVJtd+/vsjPDm/Y6R8jFRfQ3wHSuwAAAABJRU5ErkJggg=="},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAASCAMAAAA0cZ07AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAzUExURUxpcf////////////////////////////////////////////////////////////////Hv/K4AAAAQdFJOUwDOuo9SoHcP8wdngTEb4IrGfMMMAAAAoUlEQVQ4y43SWw6EIAwF0CJvEKf7X+2AkXGEC3K/yClpQgvRFR88dYEIVfKH1hCpdezsEkKNzGxoBZHmjsyHX0CokksivWOrymjBNUIbNUSkituMEKoVDYk8VYhYvX7Qdu4E4kDDH+k6UohY493wud4OoUp0EyLU7WcHzRGqux9k54h0z2dnkimlnWYINX8HncpepWNFM4TqQ22UgqUZdvoFs4kcuuLPllIAAAAASUVORK5CYII="},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAUBAMAAAAXVIIGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMmaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NkE2NDNCRTMyMkYxMUU4QjQzMEE2OUQyOTM2MENGMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2NkE2NDNCRjMyMkYxMUU4QjQzMEE2OUQyOTM2MENGMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY2QTY0M0JDMzIyRjExRThCNDMwQTY5RDI5MzYwQ0YyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2QTY0M0JEMzIyRjExRThCNDMwQTY5RDI5MzYwQ0YyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+q9Bi2QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAnUExURUxpcXqDjzKF6lqEu3qDj3qDj3qDjzKF6jKF6jKF6nqDj3qDjzKF6qLgY00AAAALdFJOUwDEyB678oVEAulmtdOBCwAAAEpJREFUGNNjYEAD0hvRRRh27yYgxGG1GENV9FYMIRAXv1CKG4YQjItbqNkCQ0jnEIqQeTEDw5kzKEJzTmIIgbg0FAK5CYRBAQzBAO38XVbwbCx/AAAAAElFTkSuQmCC"},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAUBAMAAAAXVIIGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMmaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NTBFRTE3MjMyMkYxMUU4QUQ3RDlDMjBFRUQ4NDlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NTBFRTE3MzMyMkYxMUU4QUQ3RDlDMjBFRUQ4NDlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc1MEVFMTcwMzIyRjExRThBRDdEOUMyMEVFRDg0OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1MEVFMTcxMzIyRjExRThBRDdEOUMyMEVFRDg0OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ZBzZZAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAkUExURUxpcTKF6nqDj1KExTKF6jKF6nqDjzKF6jKF6nqDjzKF6nqDj+LJyGEAAAAKdFJOUwDCxDoV6WaF0fJTkqArAAAASUlEQVQY02NgQAPam9BFGHbvJiRklowhNHsnhhCIi1+oUBxDaNUqQkIsDhhCXStQhJxNIFwkoailGEIwLo2EpBYywDEokLU3AQCX6Vd2T3qD9QAAAABJRU5ErkJggg=="},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAUBAMAAAAXVIIGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMmaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RjMwODA4QzMyMkYxMUU4OThFNjg5QTJFNzRFNUVCQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RjMwODA4RDMyMkYxMUU4OThFNjg5QTJFNzRFNUVCQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlGMzA4MDhBMzIyRjExRTg5OEU2ODlBMkU3NEU1RUJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlGMzA4MDhCMzIyRjExRTg5OEU2ODlBMkU3NEU1RUJBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+dT9MHAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAhUExURUxpcTKF6jKF6jKF6jKF6nqDjzKF6jKF6nqDjzKF6nqDj6/FKncAAAAJdFJOUwDFOu4Vw2aFxDsg1jMAAABFSURBVBjTY2BAA1FL0UUYVq0iJKSWhCFkORlDaOZMQkKF4hhCIC5+IRYHDCHJiShCTioILlQI5Dw0IWQuDYRAbkLGUSsAhpdMyPV2/AoAAAAASUVORK5CYII="},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAUBAMAAAAXVIIGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMmaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NDI5QzAwQjMyMzAxMUU4QTQxNzhCQjEyQUMxQUM2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NDI5QzAwQzMyMzAxMUU4QTQxNzhCQjEyQUMxQUM2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU0MjlDMDA5MzIzMDExRThBNDE3OEJCMTJBQzFBQzY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU0MjlDMDBBMzIzMDExRThBNDE3OEJCMTJBQzFBQzY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1rjXhAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAeUExURUxpcTKF6jKF6jKF6jKF6jKF6jKF6jKF6jKF6jKF6sIJac8AAAAJdFJOUwDC7jpm0RoRheq5DGIAAABDSURBVBjTY2BAA5IT0UUYZs4kJGTijCGkOQlDCMTFL9QogSEE4+IWYi/AEIqciiKUbIaqAohhzkPCaFxqC4ECFhUDAKhYSj9w99n5AAAAAElFTkSuQmCC"},function(e,A){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACEBAMAAAAn7Hm6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAPUExURezs7Lu7u+Hh4cbGxtLS0ngGgUEAAAGnSURBVGje7ZZLloMgEEWJugCRLEATF+BvAZq4/zU1xU9Q04fQDnrw7sATDHKlKAoZAwAAAAAAAAAAAAAAAPCfKXpumAt5mWp1c+ScNZyLgVqZ69JR82lbQ7TEDaAlXJCDfpBE3gy6dPZPzxlBzncSenLZJNVh1GVr3iMly0EizKhaIsdpQgn3qKOjJR4axh4tRWaWo06ymVHrrt/jpbvUel4qTIUJZgSyZ+mnAUWot3FYlKRXQfN7uEe7aEl3zANzq7GSMlxE1zVRctPr8VlyxUwyk1K/Subv12Rwi2rjNe8llU0N/YQYJX18dm3pWG7xOkgM4sWCjI7dJwdJdhYuf2NcISlMaTmXdHrRvtyMB4mrWKeSSr2E2pptenbpIavT7FpojsE+KdMktn6dSW5GIv4qabjIXbx2kvwqiQzVll9NWLtuV4QrW9c3TYLK7vpyElqK2hyQWjLYAzJh4e3JmNv61ezPEzmlIIXnREll6tcmKYJ94me0YGkSFZhnIPHrSnhgD2mSUQfg3fsS97Uyqh3emqaY8K0HAAAAAAAAAAAAAAAAqfwAfn9Qnz3ZxGYAAAAASUVORK5CYII="},function(e,A,t){"use strict";t.r(A);t(5),t(2);var i=t(0),n=t.n(i),a=(t(9),t(1));$(document).ready(function(){$(".close").click(function(){$(".wrap").hide(),$(".moudle").css("height","0rem")}),$(".close").click(),$(".zb_tile_cun").html(localStorage.countryName),$(".zb_tile_tile").html(localStorage.phContext),$(".define").html(localStorage.define),$(".head_inner3").html(localStorage.frequency),$(".ba_li1").append(localStorage.previous),$(".ba_li2").append(localStorage.predict),$(".ba_li3").append(localStorage.currentValuer),1==localStorage.weightiness?$(".xingxing1").attr("src",""+t(10)):2==localStorage.weightiness?$(".xingxing1").attr("src",""+t(11)):$(".xingxing1").attr("src",""+t(12));var e=[],A=[],i=[],o=[],l=[];$.ajax({url:a.baseUrl+"economic/getEconomicHistoryData.json",dataType:"JSONP",type:"GET",data:{columnCode:localStorage.columnCode},success:function(t){function a(e){for(var A=0,t=0;t<e.length;t++){null!=e.charAt(t).match(/[^\x00-\xff]/gi)?A+=2:A+=1}return A}A=t.data.result,$.each(A,function(A,t){var n=t.dataPubTime;o.push(n);for(A=0;A<o.length;A++){var r=o[A];7==a(o[A])&&(r+="-01")}var c=t.dataValue;l.push(c);var h=r.replace(/-/g,"/"),d=new Date(h).getTime();i[0]=d,i[1]=c,e.push([i[0],parseFloat(i[1])])});for(var r="",c=0;c<o.length;c++)r+='<ul class="lsList"><li><span>'+o[c]+"</span><span>"+l[c]+"</span></li></ul>";$(".highData").append(r),$("#container").highcharts("StockChart",{credits:{enabled:!1},rangeSelector:{selected:6,inputEnabled:!1},scrollbar:{enabled:!1},navigator:{height:-60,enabled:!1},xAxis:{lineWidth:1,lineColor:"#1a96ef",tickWidth:0,labels:{x:-20,y:50,style:{fontSize:"0.24rem"}},type:"datetime",dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%m-%d",week:"%m-%d",month:"%Y-%m",year:"%Y"}},yAxis:{lineWidth:1,lineColor:"#1a96ef",tickWidth:0,labels:{y:20,style:{fontSize:"0.24rem"}}},series:[{name:"AAPL Stock Price",data:e,type:"area",threshold:null,fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,n.a.getOptions().colors[0]],[1,n.a.Color(n.a.getOptions().colors[0]).setOpacity(0).get("rgba")]]}}]})}}),$.ajax({url:a.searchUrl+"news/searchAppNews.json",dataType:"JSONP",type:"GET",data:{keyWord:localStorage.currency2,pageSize:3,pageNo:1},success:function(e){for(var A=e.data.items,i="",n="",a=0;a<A.length;a++){var o=A[a].publishTime.substring(5,16),l=A[a].newsTitle.substring(0,28);A[a].publishTime=o,A[a].newsTitle=l;A[a].id;A[a].hotType&&""!=A[a].hotType&&null!=A[a].hotType&&void 0!=A[a].hotType&&(2==A[a].hotType?n=""+t(13):3==A[a].hotType?n=""+t(14):4==A[a].hotType?n=""+t(15):5==A[a].hotType&&(n=""+t(16))),i+='<a class="oli2" href="/active/article/'+A[a].id+'.html" data_newID="'+A[a].id+'"><img class="newImg lazy" data-original="'+A[a].image+'" src="'+t(17)+'" alt=""><div class="odiv"><div class="newsTitle"><p class="news_tile_p">'+A[a].newsTitle+'</p><div class="new_bt"><p class="new_bt_p1"><img class="clickimg" src="'+n+'"/></p><p class="new_bt_p2">'+A[a].publishTime+"</p></div></div></div></a>"}$(".quateAbout").append(i),$("img.lazy").lazyload()}})});var o=t(2),l=parseInt(window.screen.width)/750,r=navigator.userAgent,c=document.getElementsByTagName("head")[0];/Android (\d+\.\d+)/.test(r)?parseFloat(RegExp.$1)>2.3?o(c).append('<meta name="viewport" content="width=0, minimum-scale = '+l+", maximum-scale = "+l+', target-densitydpi=device-dpi">'):o(c).append('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">'):o(c).append('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');!function(e,A,t,i,n,a,o){e.GoogleAnalyticsObject=n,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,a=A.createElement(t),o=A.getElementsByTagName(t)[0],a.async=1,a.src="//www.google-analytics.com/analytics.js",o.parentNode.insertBefore(a,o)}(window,document,"script",0,"ga"),ga("create","UA-47403057-1","auto"),ga("require","displayfeatures"),ga("require","linkid","linkid.js"),ga("send","pageview");var h="https:"==document.location.protocol?"https://":"http://";document.write(unescape("%3Cscript src='"+h+"hm.baidu.com/h.js%3F779dfdbe4a000d1108b8a1daa23f17bd' type='text/javascript'%3E%3C/script%3E"))}]);