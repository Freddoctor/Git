 // var startPos = 0,endPos = 0,isScrolling = 0;
 //    document.addEventListener('touchstart',function(event){
 //        var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
 //        startPos = {x:touch.pageX,y:touch.pageY,time:+new Date}; //取第一个touch的坐标值
 //        isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
 //    }, false);

 //    //解绑事件 web前端开发
 //    document.addEventListener('touchend',function(event){
 //        document.removeEventListener('touchmove',this,false);
 //        document.removeEventListener('touchend',this,false);
 //    }, false);

 //    document.addEventListener('touchmove',function(event){
 //        //当屏幕有多个touch或者页面被缩放过，就不执行move操作
 //        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
 //        var touch = event.targetTouches[0];
 //        endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
 //        isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
 //        if(isScrolling === 1){
 //            alert(0);
 //            event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
 //        }
 //    }, false);

 

 //阻止滚动事件 
    $(document).ready(function(){
        $("body").on('touchmove',function(event) { 
            event.preventDefault(); 
        }, false);
    })


