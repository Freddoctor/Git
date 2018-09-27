$(function(){
    // returnTokenUserId("","1746659821186");
    // returnTokenUserId();
    getTokenUserId ();
    // jquery tab动效
    // tabAnimate ();
    // 滚动定位tab
    scrollWindow ();
    $('.con_wrap .dp').hide();
    $('.foot-font').hide();
    $('.zwdp_ul').hide();
    //初始化tab导航
    initTabInfo();
    //初始化展现导航
    initDefaultTabShow("#detailInfo");

    // 举报ajax
    importAjax () ;
  
    
    var v_height=$(document).height();
    $(window).scroll(function(){
      // console.log($(this).scrollTop());
      var scr_zzc=$(this).scrollTop();
      // $(".import_zzc").height()
      // console.log($(".import_zzc").height()+scr_zzc)
      $(".import_zzc").css("top",scr_zzc+"px")
    });

  
function initTabInfo(){

    $(".tab ul li.tabNav").each(function(){

      
       var self=this;
       $(self).click(function(e) {
          e.preventDefault();
          var selected=$(".tab ul li.selected").attr("href");
          var tabContent=$(self).attr("href");
          if(selected==tabContent){
              return;
          }

        $('.tab ul li.tabNav').removeClass("selected");
        $(self).addClass("selected");
        $('.silder').css("width",$(self).outerWidth());
        $('.silder').animate({
            "width":$(self).outerWidth(),
            "left":$(self).offset().left-30
        },200);

          $(".tabContent .tabInfo").addClass("hidden");
          
          if($(tabContent).attr("hasLoad")=="true"){
           
          }else{
            if(tabContent=="#detailInfo"){
                //初始化详细信息
                initDetailInfoTabContent();

             }



             if(tabContent=="#newsInfo"){
                //初始化最新动态
                initNewsTabContent();

             }
    

            if(tabContent=="#commentInfo"){
               //初始化评论

                initCommentTabContent();

             }
    
           $(tabContent).attr("hasLoad","true");
         

          }
          

           $(tabContent).removeClass("hidden");


           /* Act on the event */
       });

    });


}


  function  initDefaultTabShow(tabPosition){
       
        $('.tab ul li.tabNav').removeClass("selected");
        var self=$('.tab ul li.tabNav[href="'+tabPosition+'"]');
        $(self).addClass("selected");
        $('.silder').css("width",$(self).outerWidth());
        $('.silder').animate({
            "width":$(self).outerWidth(),
            "left":$(self).offset().left-30
        },200);

         $(tabPosition).removeClass("hidden");
         var tabContent=tabPosition;
         if(tabContent=="#detailInfo"){
                //初始化详细信息
                initDetailInfoTabContent();

         }



        if(tabContent=="#newsInfo"){
                //初始化最新动态
                initNewsTabContent();

        }
    

         if(tabContent=="#commentInfo"){
               //初始化评论

                initCommentTabContent();

        }
    
        $(tabContent).attr("hasLoad","true");


  }

// 详细信息

    function initDetailInfoTabContent(){
        var droploadCommentDetailInfo = $('#detailInfo').dropload({
            scrollArea : window,
            loadDownFn : function(me){

                $.ajax({
                    type: 'GET',
                    url: baseUrl2+"/comment/getBrokerDetail.json",
                     data:{
                       "brokerUserId":brokerUserId
    
                   },
                    dataType: 'jsonp',
                    success:function (data){
                       var detailInformList = '';
                       var dataObj=data.data.brokerIntro;
                       var hintObj=data.data.hint;
                       var keyArr = [];
                       var outKey="";
                       var outVal="";
                       var detailInformList="";
                       var a=0;
                       $.each(dataObj,function(key,val){
                           a++;
                           outKey=key;
                           outVal=val;
                           detailInformList+='<div class="inform">'
                                               +'<span class="inKey">'+key+"："+'</span>'
                                               +'<span class="inVal">'+val+'</span>'
                                           +'</div>'
                               if(a){
    
                                   // 数据加载完
                                   // 锁定
                                   me.lock();
                                   // 无数据
                                   me.noData();
                                   // break;
                               }
    
                       });
    
                       $.each(hintObj,function(key,val){
                           $('.foot-font-tile').html(key);
                           $('.foot-font-con').html(val);
                       })

                           $('.detailInfoChild').append(detailInformList);
                           $('.dropload-down').hide();
                           $('.foot-font').show();
    
                           // 每次数据加载完，必须重置
                           me.resetload();
                    }


                });
            }
        })
        


    }

//最新新闻
    function  initNewsTabContent(){
        var pageNo=1;
        var pageSize=20;
        var result="";
        var droploadNews = $('#newsInfo').dropload({
            scrollArea : window,
            loadDownFn : function(me){              
                $.ajax({
                    type: 'GET',
                    url: baseUrl2+"/comment/getBrokerNewsList.json",
                    data:{
                       "brokerUserId":brokerUserId,
                       "pageSize":pageSize,
                       "pageNo":pageNo,    
                   },
                   dataType: 'jsonp',
                   success:function (data) {
                     pageNo++;
                    var arr=data.data;
                    var isLock=true;
                    if(arr.length==pageSize){                       
                        isLock=false;
                    }
                    for (var i = 0; i < arr.length; i++) {
                        var perArr=arr[i];
                        var substr_title = perArr.newsTitle.substring(0, 28);
                        var substr_time = perArr.publishTime.substring(5, 16);
                        
                        result += '<li class="oli2" href="###" newsId='+perArr.id+'>'
                                           +'<img class="newImg lazy" data-original="'+perArr.image+'" src="../img/img_app/liebiao@2x.png" alt="">'
    
                                           +'<a class="odiv">'
                                               +'<div class="newsTitle">'
                                                   +'<p class="news_tile_p">'+substr_title+'</p>'
                                                   +'<div class="new_bt">'
                                                       +'<p class="new_bt_p1">'
                                                           +'<img class="clickimg" src="../img/img_app/lll@2x.png"/>'
                                                           +perArr.clickNum
                                                       +'</p>'
                                                       +'<p class="new_bt_p2">'+substr_time+'</p>'
                                                   +'</div>'
                                               +'</div>'
                                           +'</a>'
                                +'</li>';
                    }
                        $('.newChild').append(result);
                        $("img.lazy").lazyload();
                        $('.oli2').unbind("click");
                        clickNewsData();
                        


                        if(isLock){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                          
                        }
                        me.resetload();

                   }
                })   
            }

            
         })

    }


    function initClickTabCommentNav(){



        $("#commentInfo nav ul li.commentNav").each(function(){

       var self=this;
       $(self).click(function(e) {
          e.preventDefault();
          var selected=$("#commentInfo nav ul li.selected").attr("href");
          var tabContent=$(self).attr("href");
          if(selected==tabContent){
              return;
          }

        $('#commentInfo nav ul li.selected').removeClass("selected");
        $(self).addClass("selected");
       

          $(".commentChild .childContent").addClass("hidden");
          
          if($(tabContent).attr("hasLoad")=="true"){
           
          }else{
            if(tabContent=="#good"){
                //初始化详细信息
                initChildCommentGood();

             }



             if(tabContent=="#bad"){
                //初始化最新动态
               initChildCommentBad();

             }
    

    
           $(tabContent).attr("hasLoad","true");
         

          }

           $(tabContent).removeClass("hidden");


           /* Act on the event */
       });

    });


       

    }

    function initDefaultComment(tabPosition){

        $("#commentInfo nav ul li.commentNav").removeClass("selected");
        var self=$('#commentInfo nav ul li.commentNav[href="'+tabPosition+'"]');
        $(self).addClass("selected");
      
         $(tabPosition).removeClass("hidden");
         var tabContent=tabPosition;
          if(tabContent=="#good"){
                //初始化详细信息
               
                initChildCommentGood();
                 
             }

             if(tabContent=="#bad"){
                //初始化最新动态
                initChildCommentBad();

             }
    
        $(tabContent).attr("hasLoad","true");





    }

    function initCommentTabContent(){

        initClickTabCommentNav();
        initDefaultComment("#good");



    }



    //好评
    function initChildCommentGood(){
      
        var pageNo=0;
        var firstPubTime="";
        var pageSize=20;
        var isComplain=0;

        var droploadCommentGood = $('#good').dropload({
            scrollArea : window,
            domDown : {
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData  : '<div class="dropload-noData">暂无更多评论</div>'
            },

            loadDownFn : function(me){
                
                pageNo++;

                 $.ajax({
                    type: 'GET',
                    url: baseUrl2+"/comment/getComments.json",
                    data:{
                        "brokerUserId":brokerUserId,
                        "firstPubTime":firstPubTime,
                        "isComplain":isComplain,
                        "pageSize":pageSize,
                        "t":loginToken
                    },
                    dataType: 'jsonp',
                    success:function(data){
                       var dataList=data.data;
                       
                       var lock=true;

                       if(dataList==""||dataList==null||dataList.length==0){

                           if(pageNo==1){
                             var  noDataImg='<div class="noImgWrap">'
                                       +'<img src="../img/img_app/innerZwpl@2x.png" />'
                                       +'<p>'+"该经纪商暂无点评"+'<p/>'
    
                                   +'<div/>'
                             $('#good').html(noDataImg);
                             return;

                           }else{
                           
                             

                           }


                       }

                       if(dataList!=""&&dataList!=null&&dataList.length==pageSize){
                         lock=false;
                       }




                       var result="";

                       //如果有数据
                       for(var i=0;i<dataList.length;i++){
                            var perData=dataList[i];
                            var   picUrlArr=perData.pics;
                            var  childCommentsArr=perData.childComments;
                               var imgs="";
                               var childComments="";
                               for (var j = 0; j < picUrlArr.length; j++) {
                                   imgs += '<img class="lazy" data-original='+picUrlArr[j]+' src="../img/img_app/liebiao@2x.png"/>';
                               }
                               for (var j = 0; j < childCommentsArr.length; j++) {

                                    var showStyle  = "";
                                    if(childCommentsArr[j].pics.length>0){
                                          
                                      showStyle = "iconShow";
                                         
                                    }else{
                                      showStyle = "iconHideen";
                                    }
                                    var huifuStyle="";
                                    if (childCommentsArr[j].targetNickName!="") {
                                         huifuStyle = "huifuShow";
                                    }else{
                                        huifuStyle = "huifuHide";
                                    }
                                   childComments += '<ul>'
                                                       +'<li>'
                                                       +'<span class="nick" isGov="'+childCommentsArr[j].isGov+'">'+childCommentsArr[j].nickName+'</span>'
                                                       +'<img class="isGov" src="../img/img_app/guanfang@2x.png" />'
                                                       +'<span class="nickM">'+"："+'</span>'
                                                       +'<span class="huifu '+huifuStyle+'">'+" 回复 "+'</span>'
                                                       +'<span class="omyNick">'
                                                           +childCommentsArr[j].targetNickName
                                                       +'</span>'
    
                                                       +'<span class="targetnickM '+huifuStyle+'">'+"："+'</span>'
                                                           +'<span class="targContent">'+childCommentsArr[j].content+'</span>'
                                                           +'<img class="icon '+showStyle+'" src="../img/img_app/picture@2x.png" />'
    
                                                       +'</li>'
    
                                                   +'</ul>';
                               }
    
    

                              
                                result+='<ul class="listWrap" data-id='+perData.microblogId+' data-src="'+perData.complainStatus+'" isGov="'+perData.isGov+'">'
                                           +'<img class="complain-img" src="" />'
                                           +'<li class="tile_img" dataIsComplain='+perData.isComplain+' >'
                                               +'<img class="lazy" data-original="'+perData.avatar+'" src="../img/img_app/touxiang@2x.png" />'
                                           +'</li>'
                                           +'<li class="listWrap_rig">'
    
                                               +'<div class="listWrap_rig_inner">'
    
    
    
                                                   +'<div class="ListTile">'
                                                       +'<p class="nickName">'+perData.nickName+'</p>'
                                                       +'<p class="dateTime">'+perData.dateCreated+'</p>'
                                                   +'</div>'
                                                   +'<div class="outgolden">'
                                                       +'<p>'+"出金速度："+'<span>'+perData.outspeed+'</span>'+'</p>'
                                                       +'<p>'+"服务态度："+'<span>'+perData.attitude+'</span>'+'</p>'
    
                                                   +'</div>'
                                                   +'<div class="outgolden2">'
                                                       +'<p>'+"品牌形象："+'<span>'+perData.brand+'</span>'+'</p>'
                                                       +'<p>'+"平台表现："+'<span>'+perData.platform+'</span>'+'</p>'
    
                                                   +'</div>'
                                                   +'<div class="plCon">'+perData.content+'</div>'
                                                  +'<div class="plImg">'+imgs+'</div>'
                                                  +'<div class="plChild">'
    
                                                       +childComments
    
    
                                                   +'</div>'
    
                                                   +'<p class="morePl">'
                                                           +"更多评论"
                                                   +'</p>'
                                                   +'</div>'
    
    
                                                   +'<div class="deleAndClick">'
                                                       +'<span class="del"  haveDelAuth='+perData.haveDelAuth+'>'
                                                           +'<img data-id='+perData.microblogId+' src="../img/img_app/shanchu@2x.png" />'
                                                       +'</span>'
                                                       +'<span class="redStar" data-like='+perData.isMeLike+'>'
                                                           +'<img src="../img/img_app/success@2x.png" class="like" data-id="'+perData.microblogId+'" data-like="'+dataList[i].isMeLike+'"/>'
                                                           +'<span class="like_num">'+perData.likeCount+'</span>'
    
                                                       +'</span>'
                                                       +'<ul class="pl_box" a="true">'
                                                          +'<li class="myJb" data-id='+perData.microblogId+'>'
                                                              +'<img src="../img/img_app/jvbao@2x.png" />'
                                                              +'<span class="pl_box_font">'+"举报"+'</span>'
                                                          +'</li>'  
                                                          +'<li class="likePl" data-id='+perData.microblogId+'>'
                                                              +'<img src="../img/img_app/pinglun2@2x.png" />'
                                                              +'<span class="pl_box_font">'+"评论"+'</span>'
                                                          +'</li>'

                                                       +'</ul>'
                                                       +'<span class="likeP2" dataId='+perData.microblogId+'>'
                                                           +'<img src="../img/img_app/gengduo@2x.png" />'
    
                                                       +'</span>'
    
                                                   +'</div>'
    
    
                                           +'</li>'
    
                                       +'</ul>';

                                       if((dataList.length-1)==i){
                                            firstPubTime=perData.dateCreated;

                                       }


                       }



                        $("#good  .childCommentcontent").append(result);
                        $("img.lazy").lazyload();
                        click_pl_box(".likeP2",".pl_box");
                        clickReport ();

                        if(lock){
                            me.lock();
                            me.noData();
                        }
                     
                        
                        // 官方显示评论颜色 图片
                        for (var i = 0; i < $('.plChild').length; i++) {
                               var $isGov=$('.nick').eq(i).attr("isGov");

                               if ($isGov==1) {
                                   // console.log(i);
                                   $('.nick').eq(i).css("color","#fc780d");
                                   $('.isGov').eq(i).show();

                               }
                        }


                        // 显示子评论iocn
                               for (var i = 0; i < $('.listWrap').length; i++) {
                                   if ($('.plChild').eq(i).html()=="") {
                                       $('.plChild').eq(i).hide();
                                       $('.morePl').eq(i).hide();
                                   }
                                   var $lisWrap=$('.listWrap').eq(i).attr("data-src");
                                   var $tile_img=$('.tile_img').eq(i).attr("dataIsComplain");
                                   $lisWrap.toString();

                                   // 判断受理已受理  处理中
                                    if($tile_img==1){
    
    
                                        if ($lisWrap=='0'||$lisWrap==""||$lisWrap==null||$lisWrap==undefined) {
                                           $('.complain-img').eq(i).attr("src","../img/img_app/yishouli@2x.png");
                                        }else if ($lisWrap=="1") {
                                           $('.complain-img').eq(i).attr("src","../img/img_app/chulizhong@2x.png");
                                        }else if ($lisWrap=="2") {
                                           $('.complain-img').eq(i).attr("src","../img/img_app/yijiejue@2x.png");
                                        }else{
                                           $('.complain-img').eq(i).hide();
                                        }
    
                                    }
    
                                   if ($('.redStar').eq(i).attr("data-like")==1) {
                                     
                                       $('.redStar img').eq(i).attr("src","../img/img_app/success@2x.png");
                                       $('.redStar .like_num').eq(i).css("color","#f55256");
                                   }else{
                                         $('.redStar img').eq(i).attr("src","../img/img_app/dianzan@2x.png");
                                       $('.redStar .like_num').eq(i).css("color","#666");
                                   }
    
                                   // 隐藏评论
                                   if ($('.del').eq(i).attr('haveDelAuth')!=1) {
                                       $('.del').eq(i).hide();
                                   }
    
    
                               }


                            // 删除
    
                               $('.del img').click(function(){   
                                  callJsConfirm();    
                                   var index=$('.del img').index(this);
                                   var uId=$(this).attr("data-id");
                                   
                                      if(loginToken==undefined && loginToken==null && loginToken==""){
    
                                           login ();
    
                                      }else {
                                          
                                          if (isbol==true) {
                                              $.ajax({
                                                   type: 'GET',
                                                   url: baseUrl2+"/comment/delComment.json",
                                                   data:{
                                                       "commentedObjectId":uId,
                                                       "t":loginToken
                                                   },
                                                   dataType: 'jsonp',
                                                   success:function (data){
                                                       var status=null;
                                                       status=data.status;
                                                      
                                                       if (status==0) {   
                                                            $('.listWrap').eq(index).hide();
                     
                                                       }else if (status==200) {
                                                           login ();
                                                       }
    
                                                   }
                                               })
                                      }
                                      }
                               })


                            // 点赞
                                   var bolNum=null;
                                   var ismeLike=null;
                                   $('.like').unbind("click");
                                   $('.like').click(function(){
                                       initCreatloading();
                                       var uId=$(this).attr("data-id");
                                       ismeLike=$(this).attr("data-like");
    
                                       if (ismeLike==1) {
                                           bolNum=true;
                                       }else{
                                           bolNum=false;
                                       }
       
                                       if (bolNum==false) {
    
                                           if (loginToken==undefined || loginToken==null|| loginToken=="") {
                                               initCloseloading();
                                               login ();
    
    
                                           }else{
                                                   var This=$(this);
                                                   $.ajax({
                                                       type: 'GET',
                                                       url: baseUrl2+"/comment/likeCommentOpt.json",
                                                       data:{
                                                           "commentedObjectId":uId,
                                                           "t":loginToken
                                                       },
                                                       dataType: 'jsonp',
                                                       success:function(data){
                                                          
                                                           $('.like').bind("click");
                                                         
                                                           var status=null;
                                                           status=data.status;
                                                          
                                                          
                                                           if (status==0) {                                                           
                                                               suc=true;
                                                               This.attr("data-like",1);
                                                               ismeLike=0;
                                                               This.attr("src","../img/img_app/success@2x.png");
                                                               var likeNum=0;
                                                               var likeNum=parseInt(This.siblings().html());
    
                                                               This.siblings().html(likeNum+1);
                                                               This.siblings().css("color","#f55256");
                                                               if(This.siblings().html()<=0){
                                                                   This.siblings().html(0);
                                                               }
    
    
                                                               initCloseloading();
                                                             }else if (status==200) {
                                                                
                                                               initCloseloading();
                                                               login ();
                                                             }else{
                                                                
                                                                    initCloseloading();
                                                                    initmessageloading("点赞失败,请稍后重试");

                                                             }
    
                                                       },
                                                       error:function(data){
                                                           initCloseloading();
                                                            initmessageloading("网络连接异常,请稍后重试");

                                                       }
                                                   })
                                           }
    
                                     }else if(bolNum==true){
                                       
    
                                          if (loginToken==undefined && loginToken==null && loginToken=="") {
    
                                           login ();
    
                                       }else{
                                               var This=$(this);
                                               $.ajax({
                                                   type: 'GET',
                                                   url: baseUrl2+"/comment/likeCommentOpt.json",
                                                   data:{
                                                       "commentedObjectId":uId,
                                                       "ip":"192.168.30.172",
                                                       "t":loginToken
                                                   },
                                                   dataType: 'jsonp',
                                                   success:function(data){
                                                       $('.like').bind("click");
                                                       var status=null;
                                                       status=data.status;
                                                       if (status==0) {
                                                          This.attr("data-like",0);

                                                         This.attr('')
                                                         This.attr("src","../img/img_app/dianzan@2x.png");
                                                         var likeNum=0;
                                                         var likeNum=parseInt(This.siblings().html());
                                                         This.siblings().html(likeNum-1);
                                                         This.siblings().css("color","#666")
                                                         if(This.siblings().html()<=0){
    
                                                           This.siblings().html()==0;
                                                         }
    
                                                           initCloseloading();
                                                       }else if (status==200) {
    
                                                           initCloseloading();
                                                           login ();
                                                       }else {
                                                                
                                                            initCloseloading();
                                                            initmessageloading("点赞失败,请稍后重试");

                                                        }
    
    
                                                   },
                                                   error:function(data){
                                                       initCloseloading();
                                                       initmessageloading("网络连接异常,请稍后重试");
                                                   }
                                               })
                                       }
                                     }
    
                                   })


                                     // 因为没下拉一次就会绑定一次 所以下拉前线接触绑定
                               $('.listWrap_rig_inner').unbind("click");
                               $('.likePl').unbind("click");
                               // 点击列表
                                clickList ();
                                likePlClick()
                       me.resetload();
                       

                    }
                 })
            }
        })


    }



    //差评

    function initChildCommentBad(){

        var pageNo=0;
        var firstPubTime="";
        var pageSize=20;
        var isComplain=1;

        var droploadCommentGood = $('#bad').dropload({
            scrollArea : window,
            domDown : {
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData  : '<div class="dropload-noData">暂无更多评论</div>'
            },

            loadDownFn : function(me){
                
                pageNo++;

                 $.ajax({
                    type: 'GET',
                    url: baseUrl2+"/comment/getComments.json",
                    data:{
                        "brokerUserId":brokerUserId,
                        "firstPubTime":firstPubTime,
                        "isComplain":isComplain,
                        "pageSize":pageSize,
                        "t":loginToken
                    },
                    dataType: 'jsonp',
                    success:function(data){



                       var dataList=data.data;

                       
                       var lock=true;

                       if(dataList==""||dataList==null||dataList.length==0){

                           if(pageNo==1){
                             var  noDataImg='<div class="noImgWrap">'
                                       +'<img src="../img/img_app/innerZwpl@2x.png" />'
                                       +'<p>'+"该经纪商暂无差评"+'<p/>'
    
                                   +'<div/>'
                             $('#bad').html(noDataImg);
                             return;

                           }else{
                           
                             

                           }


                       }

                       if(dataList!=""&&dataList!=null&&dataList.length==pageSize){
                         lock=false;
                       }




                       var result="";
                       var isPic=null;
                       //如果有数据
                       for(var i=0;i<dataList.length;i++){
                            var perData=dataList[i];



                              var  picUrlArr=perData.pics;
                              var  childCommentsArr=perData.childComments;
                               var imgs="";
                               var childComments="";
                               for (var j = 0; j < picUrlArr.length; j++) {
                                  
                                   imgs += '<img class="lazy" data-original='+picUrlArr[j]+' src="../img/img_app/liebiao@2x.png"/>';
                               }
                               for (var j = 0; j < childCommentsArr.length; j++) {
                                    var showStyle  = "";
                                    if(childCommentsArr[j].pics.length>0){                                        
                                        showStyle = "iconShow";
                                       
                                    }else{
                                        showStyle = "iconHideen";
                                    }

                                    var huifuStyle="";
                                    if (childCommentsArr[j].targetNickName!="") {
                                         huifuStyle = "huifuShow";
                                    }else{
                                        huifuStyle = "huifuHide";
                                    }
                                   childComments += '<ul>'
                                                       +'<li>'
                                                       +'<span class="nick" isGov="'+childCommentsArr[j].isGov+'">'+childCommentsArr[j].nickName+'</span>'
                                                       +'<img class="isGov" src="../img/img_app/guanfang@2x.png" />'
                                                       +'<span class="nickM">'+"："+'</span>'
                                                       +'<span class="huifu">'+" 回复 "+'</span>'
                                                       +'<span class="omyNick '+huifuStyle+'">'
                                                           +childCommentsArr[j].targetNickName
                                                       +'</span>'
    
                                                       +'<span class="targetnickM '+huifuStyle+'">'+"："+'</span>'
                                                           +'<span class="targContent">'+childCommentsArr[j].content+'</span>'
                                                           +'<img class="icon '+showStyle+'" src="../img/img_app/picture@2x.png" />'
    
                                                       +'</li>'
    
                                                   +'</ul>';
                               }
    
    
    
                                result+='<ul class="listWrap" data-id='+perData.microblogId+' data-src="'+perData.complainStatus+'" isGov="'+perData.isGov+'">'
                                           +'<img class="complain-img" src="" />'
                                           +'<li class="tile_img" dataIsComplain='+perData.isComplain+' >'
                                                +'<img class="lazy" data-original="'+perData.avatar+'" src="../img/img_app/touxiang@2x.png" />'
                                           +'</li>'
                                           +'<li class="listWrap_rig">'
    
                                               +'<div class="listWrap_rig_inner">'
    
    
    
                                                   +'<div class="ListTile">'
                                                       +'<p class="nickName">'+perData.nickName+'</p>'
                                                       +'<p class="dateTime">'+perData.dateCreated+'</p>'
                                                   +'</div>'
                                                   +'<div class="outgolden">'
                                                       +'<p>'+"出金速度："+'<span>'+perData.outspeed+'</span>'+'</p>'
                                                       +'<p>'+"服务态度："+'<span>'+perData.attitude+'</span>'+'</p>'
    
                                                   +'</div>'
                                                   +'<div class="outgolden2">'
                                                       +'<p>'+"品牌形象："+'<span>'+perData.brand+'</span>'+'</p>'
                                                       +'<p>'+"平台表现："+'<span>'+perData.platform+'</span>'+'</p>'
    
                                                   +'</div>'
                                                   +'<div class="plCon">'+perData.content+'</div>'
                                                  +'<div class="plImg">'+imgs+'</div>'
                                                  +'<div class="plChild">'
    
                                                       +childComments
    
    
                                                   +'</div>'
    
                                                   +'<p class="morePl">'
                                                           +"更多评论"
                                                   +'</p>'
                                                   +'</div>'
    
    
                                                   +'<div class="deleAndClick">'
                                                       +'<span class="del"  haveDelAuth='+perData.haveDelAuth+'>'
                                                           +'<img data-id='+perData.microblogId+' src="../img/img_app/shanchu@2x.png" />'
                                                       +'</span>'
                                                       +'<span class="redStar" data-like='+perData.isMeLike+'>'
                                                           +'<img src="../img/img_app/success@2x.png" class="like" data-id="'+perData.microblogId+'" data-like="'+dataList[i].isMeLike+'"/>'
                                                           +'<span class="like_num">'+perData.likeCount+'</span>'
    
                                                       +'</span>'
                                                      +'<ul class="pl_box2" a="true">'
                                                          +'<li class="myJb" data-id='+perData.microblogId+'>'
                                                              +'<img src="../img/img_app/jvbao@2x.png" />'
                                                              +'<span class="pl_box_font">'+"举报"+'</span>'
                                                          +'</li>'  
                                                          +'<li class="likePl" data-id='+perData.microblogId+'>'
                                                              +'<img src="../img/img_app/pinglun2@2x.png" />'
                                                              +'<span class="pl_box_font">'+"评论"+'</span>'
                                                          +'</li>'

                                                       +'</ul>'
                                                       +'<span class="likeP22" dataId='+perData.microblogId+'>'
                                                           +'<img src="../img/img_app/gengduo@2x.png" />'
    
                                                       +'</span>'
    
                                                   +'</div>'
    
    
                                           +'</li>'
    
                                       +'</ul>';

                                       if((dataList.length-1)==i){
                                            firstPubTime=perData.dateCreated;

                                       }


                       }



                        $("#bad  .childCommentcontent").append(result);

                       click_pl_box(".likeP22",".pl_box2");
                       clickReport();
                        if(lock){
                            me.lock();
                            me.noData();
                        }
                            
                     
                        // 官方显示评论颜色 图片
                        for (var i = 0; i < $('.plChild').length; i++) {
                               var $isGov=$('.nick').eq(i).attr("isGov");
                               if ($isGov==1) {
                                   // console.log(i);
                                   $('.nick').eq(i).css("color","#fc780d");
                                   $('.isGov').eq(i).show();
                               }
                        }


                        // 显示子评论iocn
                               for (var i = 0; i < $('.listWrap').length; i++) {
                                   if ($('.plChild').eq(i).html()=="") {
                                       $('.plChild').eq(i).hide();
                                       $('.morePl').eq(i).hide();
                                   }
                                   var $lisWrap=$('.listWrap').eq(i).attr("data-src");
                                   var $tile_img=$('.tile_img').eq(i).attr("dataIsComplain");
                                   $lisWrap.toString();

                                   // 判断受理已受理  处理中
                                   if($tile_img==1){
    
    
                                       if ($lisWrap=='0'||$lisWrap==""||$lisWrap==null||$lisWrap==undefined) {
                                           $('.complain-img').eq(i).attr("src","../img/img_app/yishouli@2x.png");
                                       }else if ($lisWrap=="1") {
                                           $('.complain-img').eq(i).attr("src","../img/img_app/chulizhong@2x.png");
                                       }else if ($lisWrap=="2") {
                                           $('.complain-img').eq(i).attr("src","../img/img_app/yijiejue@2x.png");
                                       }else{
                                           $('.complain-img').eq(i).hide();
                                       }
    
                                    }
    
                                  if ($('.redStar').eq(i).attr("data-like")==1) {
                                      
                                        $('.redStar img').eq(i).attr("src","../img/img_app/success@2x.png");
                                        $('.redStar .like_num').eq(i).css("color","#f55256");
                                  }else{
                                        $('.redStar img').eq(i).attr("src","../img/img_app/dianzan@2x.png");
                                        $('.redStar .like_num').eq(i).css("color","#666");
                                  }
    
                                   // 隐藏评论
                                  if ($('.del').eq(i).attr('haveDelAuth')!=1) {
                                       $('.del').eq(i).hide();
                                  }
    
    
                               }


                            // 删除
    
                               $('.del img').click(function(){
    
    
                                    callJsConfirm();
    
                                   var index=$('.del img').index(this);
                                   var uId=$(this).attr("data-id");
                                      if(loginToken==undefined && loginToken==null && loginToken==""){
    
                                           login ();
    
                                      }else {
                                          if (isbol==true) {
                                              $.ajax({
                                                   type: 'GET',
                                                   url: baseUrl2+"/comment/delComment.json",
                                                   data:{
                                                       "commentedObjectId":uId,
                                                       "t":loginToken
                                                   },
                                                   dataType: 'jsonp',
                                                   success:function (data){
                                                       var status=null;
                                                       status=data.status;
                                                       if (status==0) {
                                                          $('.listWrap').eq(index).hide();
                                                       }else if (status==200) {
                                                          login ();
                                                       }
    
                                                   }
                                               })
                                      }
                                      }
                               })


                            // 点赞
                                   var bolNum=null;
                                   var ismeLike=null;
                                   $('.like').unbind("click");
                                   $('.like').click(function(){
                                       initCreatloading();
                                       var uId=$(this).attr("data-id");
                                       ismeLike=$(this).attr("data-like");
    
                                       if (ismeLike==1) {
                                           bolNum=true;
                                       }else{
                                           bolNum=false;
                                       }
                                       if (bolNum==false) {
                                           if (loginToken==undefined || loginToken==null|| loginToken=="") {
                                               initCloseloading();
                                               login ();
    
    
                                           }else{
                                                   var This=$(this);
                                                   $.ajax({
                                                       type: 'GET',
                                                       url: baseUrl2+"/comment/likeCommentOpt.json",
                                                       data:{
                                                           "commentedObjectId":uId,
                                                           "t":loginToken
                                                       },
                                                       dataType: 'jsonp',
                                                       success:function(data){
                                                           $('.like').bind("click");
                                                           var status=null;
                                                           status=data.status;
                                                           if (status==0) {
    
                                                               suc=true;
                                                               This.attr("data-like",1);
                                                               ismeLike=0;
                                                               This.attr("src","../img/img_app/success@2x.png");
                                                               var likeNum=0;
                                                               var likeNum=parseInt(This.siblings().html());
                                                               This.siblings().html(likeNum+1);
                                                               This.siblings().css("color","#f55256");
                                                               if(This.siblings().html()<=0){
                                                                   This.siblings().html(0);
                                                               }
    
    
                                                               initCloseloading();
                                                             }else if (status==200) {
    
                                                               initCloseloading();
                                                               login ();
                                                             }else{
                                                                
                                                                    initCloseloading();
                                                                    initmessageloading("点赞失败,请稍后重试");

                                                             }
    
                                                       },
                                                       error:function(data){
                                                           initCloseloading();
                                                           initmessageloading("网络连接异常,请稍后重试");
                                                       }
                                                   })
                                           }
    
                                     }else if(bolNum==true){    
                                          if (loginToken==undefined && loginToken==null && loginToken=="") {
    
                                           login ();
    
                                       }else{
                                               var This=$(this);
                                               $.ajax({
                                                   type: 'GET',
                                                   url: baseUrl2+"/comment/likeCommentOpt.json",
                                                   data:{
                                                       "commentedObjectId":uId,
                                                       "ip":"192.168.30.172",
                                                       "t":loginToken
                                                   },
                                                   dataType: 'jsonp',
                                                   success:function(data){
                                                       $('.like').bind("click");
                                                       var status=null;
                                                       status=data.status;
                                                       if (status==0) {
                                                        This.attr("data-like",0);
                                                         This.attr('')
                                                         This.attr("src","../img/img_app/dianzan@2x.png");
                                                         var likeNum=0;
                                                         var likeNum=parseInt(This.siblings().html());
                                                         This.siblings().html(likeNum-1);
                                                         This.siblings().css("color","#666")
                                                         if(This.siblings().html()<=0){
    
                                                           This.siblings().html()==0;
                                                         }
    
                                                           initCloseloading();
                                                       }else if (status==200) {
    
                                                           initCloseloading();
                                                            login ();
                                                       }else{
                                                                
                                                            initCloseloading();
                                                            initmessageloading("点赞失败,请稍后重试");

                                                        }
    
                                                   },
                                                   error:function(data){
    
                                                       initCloseloading();
                                                       initmessageloading("网络连接异常,请稍后重试");
                                                   }
                                               })
                                       }
                                     }
    
                                   })
                                $('.listWrap_rig_inner').unbind("click");
                               $('.likePl').unbind("click");
                               // 点击列表
                                clickList ();
                                likePlClick()

                       me.resetload();



                       
                       

                    }
                 })
            }
        })
        


    }

 


function baidu_adv(){
     $.ajax({
        url: baseUrl2+"/comment/getBaiduAdInfo.json",
        // url:"https://app3.fx168api.com/small/news/getNewsByChannel.json?channelId=1",
        dataType: "jsonp",
        type: "GET",
        data:{

        },
        success: function(data){
           var baidugg_idNmae=$('.baidu_gg').attr("id");

        }

    })

};
    

});




// 获取经纪商基本信息ajax方法
function ajaxGetBasicData () {
    $.ajax({
        url: baseUrl2+"/comment/getBrokerInfo.json",
        dataType: "jsonp",
        type: "GET",
        data:{
            "brokerUserId":brokerUserId
        },
        success: getBasicData,

    });
}


// 获取经纪商基本信息方法
function getBasicData(data) {
    var arrList = [];
    arrList=data.data;
    var logoUrl=arrList.logo;
    var tile=arrList.brokerName;
    var keyWords = arrList.keyWords;
    var result = "";
    var haveNews=arrList.haveNews;
    if (typeof arrList!=undefined||arrList!=null||arrList!="") {
        $('header,.content').show();
        $('.news-logo-img').attr("src",logoUrl);
        $('.news-title').html(tile);
        $('.outspeed').html(arrList.microblogOutspeed);
        $('.attitude').html(arrList.microblogAttitude);
        $('.brand').html(arrList.microblogBrand);
        $('.platform').html(arrList.microblogPlatform);
        $('.complex').html(arrList.complex);
        $('.myPL span').html("("+arrList.commentCount+")");
        if(arrList.evaluation==""){
              $('.content_bottom_cp_url').hide();
        }else{
            $('.content_bottom_cp_url').attr("href",arrList.evaluation.url);
        }

        $('.pmNum').html(arrList.rank);
        for (var i = 0; i < keyWords.length; i++) {
            result+='<span>'+keyWords[i]+'</span>'
        }
        $('.content_top').append(result);
        // 如果keyWords为空 去掉父级容器
        if (keyWords.length==0) {
            $('.content_top').remove();
        }
        if (arrList.isFlagship==1) {
            $('.head_wrap').css('background-image','url(../img/img_app/Vguanfang@2x.png)');
            var flag="";
            flag='<img src="../img/img_app/guanfang@2x.png" />'
            $('.inner_isFlag').append(flag);
            $('.news-title').append($('.inner_isFlag'));
        }else{
             $('.head_wrap').css('background-image','url(../img/img_app/zhengchang@2x.png)');
        }

        if(arrList.isAuth==1){
            var inAuth="";
            isAuth='<img class="in_isAutho" src="../img/img_app/renzheng@2x.png" />'
            $('.inner_isFlag').append(isAuth);
        }
    }

// 分享
    var shareJson={
          isShare:1,//0:不分享 1:分享
          shareTitle:tile,
          shareUrl:baseUrl+"/app/share.html?brokerUserId="+brokerUserId,
          shareImage:logoUrl,
          shareContent:"给你推荐一个经纪商，去看看大家对它的评价吧"
    };
    initShare(shareJson);
    // 是否有新闻 官方有新闻
    
    if(haveNews!=1){
        $('.tab ul li.newsestInform').hide();
    }

}



// 滚动定位tab
function scrollWindow () {
    var headConHeight=$('header').outerHeight()+$('.content').outerHeight();
    var scrollTop=0;
    $(window).scroll(function(){
        scrollTop=$(document).scrollTop();
         if (scrollTop>headConHeight) {
            $('.tab').css({
                "position":"fixed",
                "top":0,

            })
        }else{
            $('.tab').css({
                "position":"relative",
                "top":0,
                "z-index":100,

            })
           
        }

    });
}


var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// 点击评论

function clickList (){
    $('.listWrap_rig_inner').click(function(){
        var index =$(this).index();
        var id =$(this).parent().parent().attr("data-id");
        var commentDetailJson={
            "id":id,
            "brokerUserId":brokerUserId
        }
        var jsonStr=JSON.stringify(commentDetailJson);
        if (isAndroid) {
            Androidtest(jsonStr);
        }else if (isiOS) {
            IosbtnClick2(jsonStr);
        }


    })
}
// 点击跳评论内页
function likePlClick() {
    $('.likePl').click(function(){
        var id =$(this).attr("data-id");
        // alert(id);
        var dptDetailJson={
            "id":id,
            "brokerUserId":brokerUserId
        }
        var jsonStr2=JSON.stringify(dptDetailJson);
        if (isAndroid) {
            Androidtest2(jsonStr2);
         }else if (isiOS) {
            IosbtnClick3(jsonStr2);
         }

        $(this).parent().addClass('aminte-active-hide');
        $(this).parent().css('display','none');
        $(this).parent().removeClass('aminte-active-show');
        $(this).parent().attr("a",'true')

    })

}
// 点击新闻
function clickNewsData(){
    $('.oli2').click(function(){
        $(this).find($('.news_tile_p')).css("color","#999")
        var id=$(this).attr("newsId");
        if (isAndroid) {
            Androidnews(id);
         }else if (isiOS) {
            Iosnews(id);
         }
    })
}

// js调安卓点评
function Androidtest(e){
     window.SysClientJs.commentDetail(e);
}
// js调用ios点评
function IosbtnClick2(e) {
    window.webkit.messageHandlers.commentDetail.postMessage(e);
}
// js调安卓评论
function Androidtest2(e){
     window.SysClientJs.dptDetailJson(e);
}
// js调用ios评论
function IosbtnClick3(e) {
    window.webkit.messageHandlers.dptDetailJson.postMessage(e);
}

// js调安卓新闻
function Androidnews(e){
     window.SysClientJs.newsDetail(e);
}
// js调用ios新闻
function Iosnews(e) {
    window.webkit.messageHandlers.newsDetail.postMessage(e);
}


// js调安卓方法拿USERID
function getTokenUserId () {
    if (isiOS) {
       window.webkit.messageHandlers.getTokenUserId.postMessage("123");
    }else if (isAndroid) {
       window.SysClientJs.getTokenUserId();
    }
}

// 点赞请求调用app加载
function initCreatloading(){
    if (isiOS) {
       window.webkit.messageHandlers.beforeLoading.postMessage("123");
    }else if (isAndroid) {
       window.SysClientJs.beforeLoading("");
    }
}
function initCloseloading(){
    if (isiOS) {
       window.webkit.messageHandlers.afterLoading.postMessage("123");
    }else if (isAndroid) {
       window.SysClientJs.afterLoading();
    }
}
function initmessageloading(messsage){
    if (isiOS) {
       window.webkit.messageHandlers.messageLoading.postMessage(messsage);
    }else if (isAndroid) {
       window.SysClientJs.messageLoading(messsage);
    }
}
// 调app登陆方法
function login () {
    if (isiOS) {
        window.webkit.messageHandlers.needToLogin.postMessage("");
    }else if (isAndroid) {
        window.SysClientJs.needToLogin();
    }


}
var loginToken="";//登陆状态token
var brokerUserId="";//经纪商id
// 获取安卓ios返回参数USERID
function returnTokenUserId (token,userId){
    // brokerUserId=userId;
    loginToken=token;
    brokerUserId=userId
    // loginToken="";
    ajaxGetBasicData();
    var baiduAd_key=[];
    var baiduAd_val=[];
    $.ajax({
        url: baseUrl2+"/comment/getBaiduAdInfo.json",
        dataType: "jsonp",
        type: "GET",
        data:{

        },
        success: function(data){
        var dataObj_ad=data.data;
             $('.baidu_gg').attr("id","ad-broke"+brokerUserId);
                $.each(dataObj_ad,function(key,val){
                    if (key==brokerUserId) {
                        BAIDU_CLB_fillSlot(val.adId, "ad-broke"+brokerUserId);
                        $('.content_bottom_adv').show();
                    }
                })
        }

    })

}
// 获取安卓ios返回参数USERID
function acceptToken (token){
    loginToken=token;
}

function transforNewsData () {
    if (isiOS) {
        window.webkit.messageHandlers.getNewsData.postMessage("123");
    }else if (isAndroid) {
        window.SysClientJs.getNewsData();
    }
}


function initShare(shareJson){
    var m= $.extend({},shareJson);
    var s=JSON.stringify(m);
    if (isAndroid) {
        androidShare(s);
    }else if (isiOS) {
        iosShare(s);
    }
}
//分享测试
function androidShare(shareJson){
    window.SysClientJs.shareJs(shareJson);
}


function iosShare(shareJson){
   window.webkit.messageHandlers.shareJs.postMessage(shareJson);
}
// 删除评论 弹出框
var isbol=null;
function callJsConfirm() {
    if (confirm('是否删除', 'Objective-C call js to show confirm')) {
        isbol=true;
    } else {
        isbol=false;
    }
}

// 伸缩评论盒子
function click_pl_box(select,box){

    

    var id=null;

    $(select).click(function(){
    
      var flag =$(this).prev().attr("a");  
              
      if(id!=null){
          if(id==$(this).attr("dataId")){   
         
              if(flag=='true'){
               

                
                $(this).prev().addClass('aminte-active-show');
                
                $(this).prev().css('display','-webkit-box');
                $(this).prev().css('display','-webkit-flex');
                $(this).prev().css('display','-ms-flexbox');
                $(this).prev().css('display','flex');
                 
                
                $(this).prev().removeClass('aminte-active-hide');
                
                $(this).prev().attr("a",'false');
             

              }else if(flag=='false'){
               
                $(this).prev().addClass('aminte-active-hide');
                $(this).prev().css('display','none');
                $(this).prev().removeClass('aminte-active-show');
                $(this).prev().attr("a",'true')
              }

          }else{
             
                id=$(this).attr("dataId");
              for (var i = 0; i < $(box).length; i++) {
                if ($(box).eq(i).hasClass('aminte-active-show')) {
                    $(box).eq(i).removeClass('aminte-active-show');
                    $(box).eq(i).addClass('aminte-active-hide');
                    $(box).eq(i).css('display','none');
                    $(box).eq(i).attr("a",'true');
                  // oswitch=$(this).prev().attr("a");
                  
                  
                }

              }
                $(this).prev().addClass('aminte-active-show');
                $(this).prev().css('display','-webkit-box');
                $(this).prev().css('display','-webkit-flex');
                $(this).prev().css('display','-ms-flexbox');
                $(this).prev().css('display','flex');


                  
                $(this).prev().removeClass('aminte-active-hide');
                $(this).prev().attr("a",'false')
          }


      }else{

          id=$(this).attr("dataId");
          $(this).prev().addClass('aminte-active-show');
         
          $(this).prev().css('display','-webkit-box');
          $(this).prev().css('display','-webkit-flex');
          $(this).prev().css('display','-ms-flexbox');
          $(this).prev().css('display','flex');
          $(this).prev().removeClass('aminte-active-hide');
          $(this).prev().attr("a",'false')

      }
          
    });
  }

// 举报
// function Report (ReportData) {
//     if (isAndroid) {
//         androidReport(ReportData);
//     }else if (isiOS) {
//         iosReport(ReportData);
//     }
// }

function androidReport(ReportData){
    window.SysClientJs.report(ReportData);
}


function iosReport(ReportData){
    window.webkit.messageHandlers.report.postMessage(ReportData);
}
var targetId="";
var targetContent="";
function clickReport () {
    $('.myJb').click(function(){
        $(".import_inner").show();
        // $("body").addClass('import_body');
        $(document).on('touchmove', function(event) {
          event.preventDefault();
          
        });
        $('.import_zzc').show();
        var Data=$(this).attr("data-id");
        targetId=Data;
        var content=$(this).parent().parent().prev().find($('.plCon')).html();
        targetContent=content;
        var reportJson={
            Data:Data,
            content:content
        }
        var rep= $.extend({},reportJson);
        var reps=JSON.stringify(rep);
        // Report (reps);
        $(this).parent().addClass('aminte-active-hide');
        $(this).parent().css('display','none');
        $(this).parent().removeClass('aminte-active-show');
        $(this).parent().attr("a",'true')
    })
}

function importAjax () {
    $.ajax({
        type: 'GET',
        url: baseUrl2+"/userCenter/getTipTypeMap.json",
        dataType: 'jsonp',
        success:function(data){
           
            var import_lable="";
            var arr=data.data;
            var input_val="";
            var input_tipType=5;
            for (var i = 0; i < arr.length; i++) {
              
              import_lable+='<span class="import_lable_select" value="'+arr[i].value+'">'+arr[i].dispName+'</span>'
            }
            $(".import_box").append(import_lable);
            $(".import_lable_select").click(function(){
                $(".import_lable_select").removeClass('select_import');
                $(this).addClass('select_import');
                input_tipType=$(this).attr("value")
               
            });
            $('.import_cancle').click(function(){
                targetId=5;
                $('.import_text input').val("");
                $(".import_lable_select").removeClass('select_import');
                $('.import_inner').hide();
                $('.import_zzc').hide();
                // $("body").removeClass('import_body');
                $(document).unbind("touchmove");
     
            });
            $('.import_text input').blur(function(){
               
                input_val=$(this).val();
               
            });
            $('.import_sub').click(function(){
                $(document).unbind("touchmove");
                $('.import_text input').val("");
                $(".import_lable_select").removeClass('select_import');
               
                $('.import_zzc').hide();
                 // $("body").removeClass('import_body');
                  $.ajax({
                    type: 'GET',
                    url: baseUrl2+"/userCenter/commitTipInfo.json",
                    dataType: 'jsonp',
                    data:{
                      sourceFrom:1,
                      content:input_val,
                      tipType:input_tipType,
                      targetId:targetId,
                      targetContent:targetContent,
                    },
                    success:function(data){
                        initCreatloading();
                        initmessageloading("提交成功");
                        initCloseloading();
                     
                        $('.import_inner').hide();
                    },
                    error:function(data){
                        $('.import_inner').hide();
                        initCreatloading();
                        initmessageloading("提交失败,请稍后再试");
                        initCloseloading();

                    }
                  });
            })

        }
    })

}