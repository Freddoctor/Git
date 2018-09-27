/*
tabl选项卡start
@gcy

*/ 
$(function(){
    closeTopBanner();
    $('.lia').click(function(){
      localStorage.tabUrlIndex=1;
      sessionStorage.left=0;
      sessionStorage.pagecount="要闻";
    })
    $('.mycjrl').click(function(){
      sessionStorage.left_cjrl=-1471.56;
    })
    $('.titleBar1').html(sessionStorage.fgTile);//改变标题

    $(".find_nav_list").css("left",sessionStorage.left2+"px");

    $(".find_nav_list li").each(function(){
        if($(this).find("a").text()==sessionStorage.pagecount2){
            $(".sideline").css({left:$(this).position().left});
            $(".sideline").css({width:$(this).outerWidth()});
            $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
            navName(sessionStorage.pagecount2);
            return false
        }
        else{
            $(".sideline").css({left:0});
            $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        }
    });
    var nav_w=$(".find_nav_list li").first().width();
    $(".sideline").width(nav_w);
    $(".find_nav_list li").on('click', function(){
        nav_w=$(this).width();
        $(".sideline").stop(true);
        $(".sideline").animate({left:$(this).position().left},300);
        $(".sideline").animate({width:nav_w});
        $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        var fn_w = ($(".find_nav").width() - nav_w) / 2;
        var fnl_l;
        var fnl_x = parseInt($(this).position().left);
        if (fnl_x <= fn_w) {
            fnl_l = 0;
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
            fnl_l = flb_w - fl_w;
        } else {
            fnl_l = fn_w - fnl_x;
        }
        $(".find_nav_list").animate({
            "left" : fnl_l
        }, 300);
        sessionStorage.left2=fnl_l;
        var c_nav=$(this).find("a").text();
        navName(c_nav);
    });
    var fl_w=$(".find_nav_list").width();
    var flb_w=$(".find_nav_left").width();
    $(".find_nav_list").on('touchstart', function (e) {
        var touch1 = e.originalEvent.targetTouches[0];
        x1 = touch1.pageX;
        y1 = touch1.pageY;
        ty_left = parseInt($(this).css("left"));
    });
    $(".find_nav_list").on('touchmove', function (e) {
        var touch2 = e.originalEvent.targetTouches[0];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        if(ty_left + x2 - x1>=0){
            $(this).css("left", 0);
        }else if(ty_left + x2 - x1<=flb_w-fl_w){
            $(this).css("left", flb_w-fl_w);
        }else{
            $(this).css("left", ty_left + x2 - x1);
        }
        if(Math.abs(y2-y1)>0){
            e.preventDefault();
        }
    });
  

});
function navName(c_nav) {
    switch (c_nav) {      
        case "外汇":
            sessionStorage.pagecount2 = "外汇";
            break;
        case "国际黄金":
            sessionStorage.pagecount2 = "国际黄金";
            break;
        case "股指":
            sessionStorage.pagecount2 = "股指";
            break;
        case "原油":
            sessionStorage.pagecount2 = "原油";
            break;
        case "交易所":
            sessionStorage.pagecount2 = "交易所";
            break;
        case "期货":
            sessionStorage.pagecount2 = "期货";
            break;      
    }
}
// table end


function closeTopBanner () {
    $('.close').click(function(){
        $('.wrap').hide();
        $('.find_nav').css("top","0");
        $('.tab_son_wrap').css("top","0.8rem");
        $('.moudle').css("height","1.41rem");
              
    })
}


// 在各个浏览器打开app方法
function openApp(){  
    var ua = window.navigator.userAgent.toLowerCase();  
    //微信  
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){  
        window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168';  
    }else{//非微信浏览器  
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {  
            var loadDateTime = new Date();  
            window.setTimeout(function() {  
                var timeOutDateTime = new Date();  
                if (timeOutDateTime - loadDateTime < 5000) {  
                    window.location = "https://itunes.apple.com/cn/app/id535352246";//ios下载地址  
                } else {  
                window.close();  
                }  
            },2000);  
            window.location = "fx168://m.fx168.com/index";  
          }else if (navigator.userAgent.match(/android/i)) {  
            var state = null;  
            try {  

                window.location = "fx168://m.fx168.com/index"; 
                //return false; 
                alert(myUrl);
                setTimeout(function(){  
                    window.location= "http://a.app.qq.com/o/simple.jsp?pkgname=com.economics168"; //android下载地址  
  
                },500);  
            } catch(e) {}  
        }  
    }  
}  
