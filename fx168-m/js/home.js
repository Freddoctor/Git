/*
tabl选项卡start
@gcy

*/ 
$(function(){

   
  
  if (localStorage.tabUrlIndex==undefined) {
    localStorage.tabUrlIndex=1;


  }
    $('.lia').click(function(){
      localStorage.tabUrlIndex=1;
      sessionStorage.left=0;
    });
    $('.mycjrl').click(function(){
      sessionStorage.left_cjrl=-1471.56;
    })
    // var loaclt="";//http://m.fx168.com/
    for (var i = 0; i < $(".find_nav_list li a").length; i++) {
      var li_href=$(".find_nav_list li a").eq(i).attr("href");
      $(".find_nav_list li a").eq(i).attr("href",baseUrlHost+li_href);

    }
     
    $(".find_nav_list li").click(function(){
        index=$(this).index();
            for (var i = 0; i < $(".find_nav_list li").length; i++) {

                 if (index==0) {
                     localStorage.tabUrlIndex=1;//要闻
                 }else if(index==1){
                      localStorage.tabUrlIndex=6;//外汇
                 }else if(index==2){
                      localStorage.tabUrlIndex=8;//贵金属
                      //$('.sideline').css("width","140px");
                 }else if(index==3){
                      localStorage.tabUrlIndex=10;//原油
                 }else if(index==4){
                      localStorage.tabUrlIndex=28;//视屏
                 }else if(index==5){
                      localStorage.tabUrlIndex=4;//央行
                 }else if(index==6){
                      localStorage.tabUrlIndex=3;//政经
                 }else if(index==7){
                      localStorage.tabUrlIndex=11;//股市
                 }else if(index==8){
                      localStorage.tabUrlIndex=7;//债市
                 }else if(index==9){
                      localStorage.tabUrlIndex=12;//期货
                 }else if(index==10){
                      localStorage.tabUrlIndex=29;//推送
                 }else if(index==11){
                      localStorage.tabUrlIndex=9;//行业
                 }else if(index==12){
                      localStorage.tabUrlIndex=5;//城市
                 }else if(index==13){
                      localStorage.tabUrlIndex=30;//评论
                 }

          }
    });


    for (var i = 0; i < $(".fg_top a").length; i++) {
        var top_a_href=$(".fg_top a").eq(i).attr("href");
        $(".fg_top a").eq(i).attr("href",baseUrlHost+top_a_href);

    }
     
    $('.fg_top a').click(function(){
         index2=$(this).index();
          for (var i = 0; i < $('.fg_top a').length; i++) {
                if (index2==0) {
                    sessionStorage.fgTile="美元";
                    localStorage.tabUrlIndex=19;
               }else if(index2==1){
                sessionStorage.fgTile="欧元";
                    localStorage.tabUrlIndex=20;
               }else if(index2==2){
                sessionStorage.fgTile="英镑";
                    localStorage.tabUrlIndex=21;
               }else if(index2==3){
                sessionStorage.fgTile="日元";
                    localStorage.tabUrlIndex=22;
               }
          }
    });


    for (var i = 0; i < $(".fg_bottom a").length; i++) {
        var fg_bottom_href=$(".fg_bottom a").eq(i).attr("href");
        $(".fg_bottom a").eq(i).attr("href",baseUrlHost+fg_bottom_href);
    }
     $('.fg_bottom a').click(function(){
         index2=$(this).index();
          for (var i = 0; i < $('.fg_bottom a').length; i++) {
                if (index2==0) {
                    sessionStorage.fgTile="澳纽";
                    localStorage.tabUrlIndex=23;
               }else if(index2==1){
                sessionStorage.fgTile="瑞郎";
                    localStorage.tabUrlIndex=24;
               }else if(index2==2){
                sessionStorage.fgTile="加元";
                    localStorage.tabUrlIndex=25;
               }else if(index2==3){
                sessionStorage.fgTile="人民币";
                    localStorage.tabUrlIndex=26;
               }
          }
    });


      for (var i = 0; i < $(".city_a a").length; i++) {
        var city_a_href=$(".city_a a").eq(i).attr("href");
        $(".city_a a").eq(i).attr("href",baseUrlHost+city_a_href);
      }
     $('.city_a a').click(function(){
         index3=$(this).index();
          for (var i = 0; i < $('.city_a a').length; i++) {
                if (index3==0) {
                    sessionStorage.fgTile="温哥华";
                    localStorage.tabUrlIndex=13;
               }else if(index3==1){
                sessionStorage.fgTile="多伦多";
                    localStorage.tabUrlIndex=14;
               }else if(index3==2){
                sessionStorage.fgTile="香港";
                    localStorage.tabUrlIndex=15;
               }else if(index3==3){
                sessionStorage.fgTile="旧金山";
                    localStorage.tabUrlIndex=16;
               }else if(index3==4){
                sessionStorage.fgTile="伦敦";
                    localStorage.tabUrlIndex=17;
               }else if(index3==5){
                sessionStorage.fgTile="纽约";
                    localStorage.tabUrlIndex=18;
               }
          }
     });
   
    $('.titleBar1').html(sessionStorage.fgTile);//改变标题

    $(".find_nav_list").css("left",sessionStorage.left+"px");

    $(".find_nav_list li").each(function(){
        if($(this).find("a").text()==sessionStorage.pagecount){
            $(".sideline").css({left:$(this).position().left});
            $(".sideline").css({width:$(this).outerWidth()});
            $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
            navName(sessionStorage.pagecount);
            return false
        }
        else{
            $(".sideline").css({left:0});
            $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        }
    });
    var nav_w2=$(".find_nav_list li").eq(2).width();
    var nav_w=$(".find_nav_list li").first().width();
    $(".sideline").width(nav_w);
    $(".find_nav_list li").on('click', function(){
      var index=$(this).index();
      if (index==2) {
        nav_w=nav_w2;
      }
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
        sessionStorage.left=fnl_l;
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
  

  // footer 点img  换图换色
    $(".footer span img").click(function(){
      
        for (var i = 0; i < $(".footer span img").length; i++) {
           $(".footer span img")[i].src=$(".footer span img")[i].getAttribute("remove-src");
           this.src=this.getAttribute("data-src");
        }
        $(".footer span").css('color','#a6aebb');
       $(this).closest("span").css('color','#3285ea');   
      
    })
   
    // footer 点span  换图换色

    $('.lia').click(function(){
      sessionStorage.pagecount="要闻";
    
    })

    if ( sessionStorage.pagecount="要闻") {
      $('.banner').css("display","block");
    }else {
      $('.banner').css("display","none");
    }

});
function navName(c_nav) {
    switch (c_nav) {
        case "要闻":
            sessionStorage.pagecount = "要闻";
            break;
        case "外汇":
            sessionStorage.pagecount = "外汇";
            break;
        case "贵金属":
            sessionStorage.pagecount = "贵金属";
            break;
        case "原油":
            sessionStorage.pagecount = "原油";
            break;
        case "视频":
            sessionStorage.pagecount = "视频";
            break;
        case "央行":
            sessionStorage.pagecount = "央行";
            break;
        case "政经":
            sessionStorage.pagecount = "政经";
            break;
        case "股市":
            sessionStorage.pagecount = "股市";
            break;
        case "债市":
            sessionStorage.pagecount = "债市";
            break;
        case "期货":
            sessionStorage.pagecount = "期货";
            break; 
        case "推送":
            sessionStorage.pagecount = "推送";
            break;
        case "行业":
            sessionStorage.pagecount = "行业";
            break;
        case "城市":
            sessionStorage.pagecount = "城市";
            break;
        case "评论":
            sessionStorage.pagecount = "评论";
            break;   
    }
}
// table end

