$(document).ready(function(){

  closeTopBanner ();
  $('.close').click();
  sessionStorage.left_cjrl=-1351.56;

  $('.lia').click(function(){
      localStorage.tabUrlIndex=1;
      sessionStorage.pagecount="要闻";
      sessionStorage.left=0;


  })
  $('.mycjrl').click(function(){
      sessionStorage.left_cjrl=-1351.56;
  })
function GetDateStr(AddDayCount) {   
   var dd = new Date();  
   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
   var y = dd.getFullYear();   
   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
   return y+"-"+m+"-"+d;   
}  
var getData=[];
var dataNum=0;
var ogetData="";
var getDATE=[];
var setDATEArr=[];//ajax 日期参数数组
for (var i = 0; i < 15; i++) {	
//前十五天数据	
	getData.unshift(GetDateStr(0-(i+1)));
		
}
getData.push(GetDateStr(0));
for (var i = 0; i < 15; i++) {
	//后十五天数据	
	getData.push(GetDateStr(0+(i+1)));
}

var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
var weekDays=[];
for (var i = 0; i < getData.length; i++) {
  var dateStr = getData[i];
  var setDATE=getData[i]+" 00:00:00";
  //ajax data 参数处理
  setDATEArr.push(setDATE);

  var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/"))); 
  weekDays.push(weekDay[myDate.getDay()]);
  //日起分割                
  var substr = getData[i].substring(5, 10);
  var todate=getData[15].substring(0, 4);
  getDATE.push(substr);
  $(".search_logo p").html(todate);                  
}

weekDays[15]="今天";
 for (var i = 0; i < weekDays.length; i++) {
   $(".find_nav_list .sss span").eq(i).html(weekDays[i]);
   $(".find_nav_list .sss p").eq(i).html(getDATE[i]);
 }
//标题日期
$(".title_date").html(getData[15]);



// tab选项卡start
        var windowWidth = document.body.clientWidth; //window 宽度;
        var wrap = document.getElementById('wrap');
        var tabClick = wrap.querySelectorAll('.tabClick')[0];
        var tabLi = tabClick.getElementsByTagName('li');
        
        var tabBox =  wrap.querySelectorAll('.tabBox')[0];
        var tabList = tabBox.querySelectorAll('.tabList');
        
        var lineBorder = wrap.querySelectorAll('.lineBorder')[0];
        var lineDiv = lineBorder.querySelectorAll('.lineDiv')[0];
        
        var tar = 0;
        var endX = 0;
        var dist = 0;
        
        tabBox.style.overflow='hidden';
        tabBox.style.position='relative';
        tabBox.style.width=windowWidth*tabList.length+"px";
        
        for(var i = 0 ;i<tabLi.length; i++ ){
              tabList[i].style.width=windowWidth+"px";
              tabList[i].style.float='left';
              tabList[i].style.float='left';
              tabList[i].style.padding='0';
              tabList[i].style.margin='0';
              tabList[i].style.verticalAlign='top';
              tabList[i].style.display='table-cell';
        }
        
        for(var i = 0 ;i<tabLi.length; i++ ){
            tabLi[i].start = i;
            tabLi[i].onclick = function(){
                var star = this.start;
                for(var i = 0 ;i<tabLi.length; i++ ){
                    tabLi[i].className='';
                };
                tabLi[star].className='active';
                init.lineAnme(lineDiv,windowWidth/tabLi.length*star)
                init.translate(tabBox,windowWidth,star);
                endX= -star*windowWidth;
                
            }
        }

        function OnTab(star){
            if(star<0){
                star=0;
            }else if(star>=tabLi.length){
                star=tabLi.length-1
            }
            for(var i = 0 ;i<tabLi.length; i++ ){
                tabLi[i].className='';
            };
            
             tabLi[star].className='active';
            init.translate(tabBox,windowWidth,star);
            endX= -star*windowWidth;
        };
        
        // tabBox.addEventListener('touchstart',chstart,false);
        // tabBox.addEventListener('touchmove',chmove,false);
        // tabBox.addEventListener('touchend',chend,false);
        //按下
        function chstart(ev){
            ev.preventDefault;
            var touch = ev.touches[0];
            tar=touch.pageX;
            tabBox.style.webkitTransition='all 0s ease-in-out';
            tabBox.style.transition='all 0s ease-in-out';
        };
        //滑动
        function chmove(ev){
            var stars = wrap.querySelector('.active').start;
            ev.preventDefault;
            var touch = ev.touches[0];
            var distance = touch.pageX-tar;
            dist = distance;
            init.touchs(tabBox,windowWidth,tar,distance,endX);
            init.lineAnme(lineDiv,-dist/tabLi.length-endX/4);
        };
        //离开
        function chend(ev){
            var str= tabBox.style.transform;
            var strs = JSON.stringify(str.split(",",1));  
            endX = Number(strs.substr(14,strs.length-18)); 
            
            if(endX>0){
                init.back(tabBox,windowWidth,tar,0,0,0.3);
                endX=0
            }else if(endX<-windowWidth*tabList.length+windowWidth){
                endX=-windowWidth*tabList.length+windowWidth
                init.back(tabBox,windowWidth,tar,0,endX,0.3);
            }else if(dist<-windowWidth/3){
                 OnTab(tabClick.querySelector('.active').start+1);
                 init.back(tabBox,windowWidth,tar,0,endX,0.3);
            }else if(dist>windowWidth/3){
                 OnTab(tabClick.querySelector('.active').start-1);
            }else{
                 OnTab(tabClick.querySelector('.active').start);
            }
            var stars = wrap.querySelector('.active').start;
            init.lineAnme(lineDiv,stars*windowWidth/3);
            
        };

        var hh=$('.tabCon').height();
        // tab选项卡end
        // 点击tab
        var rlDate=setDATEArr[15];
        // console.log(rlDate)
        // 财经事件
        cjbind(rlDate);
       // 假日预告
        initjryg(rlDate);

// 刷新即加载财经列表
        $.ajax({
            url: baseUrl+"economic/getCalendarIndicator.json",
               dataType: "jsonp",
               type: "GET",
               data:{
                  strDate:rlDate
               },
               success:function(data){
                function p(s) {
                    return s < 10 ? '0' + s: s;
                }

                var myDate = new Date();
                //获取当前年
                var year=myDate.getFullYear();
                //获取当前月
                var month=myDate.getMonth()+1;
                //获取当前日
                var date=myDate.getDate(); 
                var h=myDate.getHours();       //获取当前小时数(0-23)
                var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                var s=myDate.getSeconds();  

                var now=p(h)+':'+p(m);

                var now2=p(h).toString()+p(m).toString();
                // console.log(now);
                // console.log(now2);
                   var rlnyListArr=[];
                   rlnyListArr=data.data.result;
                   var resList="";
                   var zwgb="";
                   var substrldlkarr1=[];
                   var substrldlkarr2=[];
                   zwgb='<img class="zwgb" src="cjrImg/nzhong@2x.png"></img>'+'<span class="zwgb_span" style="color:#e45555">'+"暂未公布"+'</span>';
                   $(".tabList1").html("");
                   var countryArr=[];//指标内页跳转 国家名
                   var phContext=[];//指标内页跳转 标题名
                   var define=[];//指标内页跳转 内容名
                   var frequency=[];//指标内页跳转 公布次数名
                   var previous=[];//前值
                   var predict=[];//预期
                   var currentValue=[]//实际
                   var weightiness=[]//星星
                   var columnCode=[];
                   var currency=[];

                   var listIndexArr=[];
                   for (var i = 0; i < rlnyListArr.length; i++) {
                      
                        var replaceTime= rlnyListArr[i].time.replace(/:/g,'');
                        // console.log(replaceTime);
                        if (now2<replaceTime) {
                          // console.log(i);
                          listIndexArr.push(i);

                          // return i;

                        }
                        var sstr="- -";
                       // var timestr=- -  ";
                       var ssssssaaa="";
                       if (rlnyListArr[i].time=="") {
                           rlnyListArr[i].time=sstr;

                       }
                       if (rlnyListArr[i].previous=="") {
                           rlnyListArr[i].previous=sstr;

                       }
                       if (rlnyListArr[i].predict=="") {
                           rlnyListArr[i].predict=sstr;

                       }

                       // var newvalue=[];
                      var newvalue=rlnyListArr[i].currentValue;
                       if (rlnyListArr[i].currentValue=="") {
                           rlnyListArr[i].currentValue=zwgb;

                       }
          
                       var substrldlk1 =  rlnyListArr[i].greaterText.substring(0, 4);
                       var substrldlk2 =  rlnyListArr[i].lessText.substring(0, 4);
                       substrldlkarr1.push(substrldlk1);
                       substrldlkarr2.push(substrldlk2);
            
                       var sssssssss=rlnyListArr[i].textValueList;
                       var bbbb=sssssssss[0];
                       var dt2=sssssssss[1];
               
                       var golval="";
                       var goltype="";
                       $.each(bbbb, function(i, val) {
                           golval=bbbb.value;
                           goltype=bbbb.type;
                       });
                    
                       var golvalData2="";
                       var goltypeData2="";
                       $.each(dt2, function(i, val) {
                           golvalData2=dt2.value;
                           goltypeData2=dt2.type;
                       });
                       var yxjx=rlnyListArr[i].type;
                       // 国家
                       var country=rlnyListArr[i].countryEn;

                       var conname=rlnyListArr[i].countryName;
                       var omyphContext=rlnyListArr[i].phContext;
                       var omydefine=rlnyListArr[i].define;
                       var omyfrequency=rlnyListArr[i].frequency;
                       var omyprevious=rlnyListArr[i].previous;
                       var omypredict=rlnyListArr[i].predict;
                       var omycolumnCode=rlnyListArr[i].columnCode;

                       var omycurrency=rlnyListArr[i].currency;
                       

                       var omycurrentValue=newvalue;
                    
                       var omyweightiness=rlnyListArr[i].weightiness;
                       countryArr.push(conname);
                       phContext.push(omyphContext);
                       define.push(omydefine);
                       frequency.push(omyfrequency);
                       previous.push(omyprevious);
                       predict.push(omypredict);
                       currentValue.push(omycurrentValue);
                        columnCode.push(omycolumnCode);
                   
                       currency.push(omycurrency);
                       weightiness.push(omyweightiness);
                       // 星级
                       var star=rlnyListArr[i].weightiness;
                       resList+='<a href="rlzbny.html" class="rl_list">'
                           +'<span class="listspan">'
                           +'<p class="omyTime">'+rlnyListArr[i].time+'</p>'
                           +'<p data-star='+star+' class="star">'
                           +'<img class="star1" src="cjrImg/xing@2x.png">'+'</img>'
                           +'<img class="star2" src="cjrImg/xing@2x.png">'+'</img>'
                           +'<img class="star3" src="cjrImg/xing@2x.png">'+'</img>'
                           +'</p>'
                           +'<p class="flag">'
                           +'<img data-src='+country+' src="cjrImg/中国@2x.png">'+'</img>'
                           +'</p>'
                           +'<p class="boderSline">'+'</p>'
                           +'</span>'
                           +'<span class="second">'
                           +'<p class="orlTile">'
                           +'<span class="country">'+rlnyListArr[i].countryName+'</span>'
                           +rlnyListArr[i].phContext
                           +'</p>'
                           +'<p class="p_qz">'+'<span class="qqzz">'+"前值："+'</span>'+'<span class="qz">'+rlnyListArr[i].previous+'</span>'+'<span data_type2='+yxjx+' class="yx" data_type='+goltype+'>'+golval+'</span>'+'</p>'
                          +'<p class="p_yq">'+'<span class="qqzz">'+"预期："+'</span>'+'<span class="yq">'+rlnyListArr[i].predict+'</span>'+'<span class="yx2" data_yx2='+goltypeData2+'>'+golvalData2+'</span>'+'</p>'
                           +'<div class="sjz_wrap">'
                           +'<p class="sjz_p1">'+"实际值"+'</p>'
                           +'<p class="sjz_p2">'+rlnyListArr[i].currentValue+'</p>'
                           +'</div>'
                           +'</span>'
                           +'</a>'




                   }
                   // console.log(listIndexArr[0]);
                  
                  $('.upWrap').css("display","none");
                  
                
                    // tab选项卡隐藏于显示消除底部空白（因为插件原因所以写了此方法）
                       if (resList=="") {
                                resList='<div class="noHoliday">'
                                    +'<div class="noHoliday1">'
                                        +'<img src="cjrImg/zwjr@2x.png">'
                                        +'<div>'+"暂无财经事件"+'</div>'

                                    +'</div>'
                                     
                                +'</div>'
                               
                        }
                    $('.tabList1').append(resList);
                    var rl_listTop= $(".rl_list").eq(listIndexArr[0]).position().top-75;
                    $('html, body').animate({
                          scrollTop: rl_listTop+"px"
                    }, 500);
                   // console.log(rl_listTop);
                
                      $('.ac1').click(function(){
                        $('.tabList1').css("height","100%");  
                      })
                      $('.ac2').click(function(){                 
                        $('.tabList1').css("height","0");
                      })
                      $('.ac3').click(function(){                 
                        $('.tabList1').css("height","0");
                        $('.tabList2').css("height","0");
                       
                      })

                   

                
                   $('.rl_list').click(function(){
                      for (var i = 0; i < $('.rl_list').length; i++) {
                           var index=$(this).index();
                          
                         
                            localStorage.countryName=countryArr[index];
                            /*
                                //指标内页跳转 国家名                               
                                //指标内页跳转 标题名
                                //指标内页跳转 内容名
                                //指标内页跳转 公布次数名
                                //前值
                                //预期
                                //实际
                                //星星
                            */ 
                            localStorage.phContext=phContext[index];
                            localStorage.define=define[index];
                            localStorage.frequency=frequency[index];
                            localStorage.previous=previous[index];
                            localStorage.predict=predict[index];
                            localStorage.currentValuer=currentValue[index];
                            localStorage.weightiness=weightiness[index];
                            localStorage.columnCode=columnCode[index];
                            localStorage.currency2=currency[index];
                      }
                   })
                 

                   // 利多利空 、影响较小。
                   for (var i = 0; i < $('.yx2').length; i++) {
                    if ($('.yx2')[i].getAttribute("data_yx2")==1) {
                           $('.yx2').eq(i).css({
                               "color":"#E45555",
                               "background-image":"url(img/liduo@2x.png)"
                           });                      
                    }else if($('.yx2')[i].getAttribute("data_yx2")==2){
                           $('.yx2').eq(i).css({
                               "color":"#399C31",
                               // "border":"0.01rem solid #399C31"
                                "background-image":"url(img/likong@2x.png)"
                           });
                    }else if ($('.yx2')[i].getAttribute("data_yx2")==""){
                           $('.yx2').eq(i).css({
                                "background-image":"none"
                           });

                    }
                }
                   for (var i = 0; i < $('.yx').length; i++) {
                       if ($('.yx')[i].getAttribute("data_type")==1) {
                           $('.yx').eq(i).css({
                               "color":"#E45555",
                               // "border":"0.01rem solid #E45555"
                               "background-image":"url(img/liduo@2x.png)"
                           });
                       }else if($('.yx')[i].getAttribute("data_type")==2){
                           $('.yx').eq(i).css({
                               "color":"#399C31",
                               // "border":"0.01rem solid #399C31"
                                "background-image":"url(img/likong@2x.png)"
                           });
                       }else if ($('.yx')[i].getAttribute("data_type")==""){
                           $('.yx').eq(i).css({
                               "color":"#999",
                               // "border":"0.01rem solid #399C31"
                                "background-image":"url(img/yxjx@2x.png)"
                           });

                       }
                       if ($('.yx')[i].getAttribute("data_type2")==2) {
                           $('.yx').eq(i).html(rlnyListArr[i].compareText);
                           

                       }else if ($('.yx')[i].getAttribute("data_type2")==0) {
                            // $('.yx').eq(i).css("border","0.01rem solid #999");
                            $('.yx').eq(i).css({
                              
                               // "border":"0.01rem solid #399C31"
                                "background-image":"none"
                           });
                       }else if ($('.yx')[i].getAttribute("data_type2")==1 &&$('.yx')[i].getAttribute("data_type")=="" ) {
                            // $('.yx').eq(i).css("border","0.01rem solid #999");
                            $('.yx').eq(i).css({
                              
                               // "border":"0.01rem solid #399C31"
                                "background-image":"none"
                           });
                       }
                       if ($('.flag img')[i].getAttribute("data-src")=="USA") {
                           $('.flag img').eq(i).attr("src","cjrImg/mg@2x.png")

                       }else if($('.flag img')[i].getAttribute("data-src")=="AUS"){
                           $('.flag img').eq(i).attr("src","cjrImg/adly@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="UK"){
                           $('.flag img').eq(i).attr("src","cjrImg/yg@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="CAN"){
                           $('.flag img').eq(i).attr("src","cjrImg/jnd@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="NZ"){
                           $('.flag img').eq(i).attr("src","cjrImg/xxl@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="JPN"){
                           $('.flag img').eq(i).attr("src","cjrImg/rb@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="SWI"){
                           $('.flag img').eq(i).attr("src","cjrImg/rs@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="EU"){
                           $('.flag img').eq(i).attr("src","cjrImg/om@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="SIN"){
                           $('.flag img').eq(i).attr("src","cjrImg/xjp@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="ITA"){
                           $('.flag img').eq(i).attr("src","cjrImg/ydl@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="SK"){
                           $('.flag img').eq(i).attr("src","cjrImg/hg@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="GER"){
                           $('.flag img').eq(i).attr("src","cjrImg/dg@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="TW"){
                           $('.flag img').eq(i).attr("src","cjrImg/tw@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="HK"){
                           $('.flag img').eq(i).attr("src","cjrImg/xg@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="FRA"){
                           $('.flag img').eq(i).attr("src","cjrImg/fg@2x.png")
                       }else if($('.flag img')[i].getAttribute("data-src")=="CHN"){
                           $('.flag img').eq(i).attr("src","cjrImg/zg@2x.png")
                       }

                       // 星级

                       if ($('.star')[i].getAttribute("data-star")==1) {
                           $('.star1').eq(i).attr("src","cjrImg/xing@2x.png");
                           $('.star2').eq(i).attr("src","cjrImg/xing@2x fb.png");
                           $('.star3').eq(i).attr("src","cjrImg/xing@2x fb.png");
                       }else if ($('.star')[i].getAttribute("data-star")==2) {
                           $('.star1').eq(i).attr("src","cjrImg/xing@2x.png");
                           $('.star2').eq(i).attr("src","cjrImg/xing@2x.png");
                           $('.star3').eq(i).attr("src","cjrImg/xing@2x fb.png");
                       }else{
                           $('.star1').eq(i).attr("src","cjrImg/xing@2x.png");
                           $('.star2').eq(i).attr("src","cjrImg/xing@2x.png");
                           $('.star3').eq(i).attr("src","cjrImg/xing@2x.png");
                           $('.orlTile').eq(i).css("color","#df474a");
                       }

                   }
               }
        });
          
        $(".find_nav_list li").click(function(){
            var index=$(this).index();
            rlDate=setDATEArr[index];
            $.ajax({
               url: baseUrl+"economic/getCalendarIndicator.json",
               dataType: "jsonp",
               type: "GET",
               data:{
                  strDate:rlDate
               },
               success:getdatacjrl

           });


            function getdatacjrl(data){
                var rlnyListArr=[];
                rlnyListArr=data.data.result;
                var resList="";
                var zwgb="";
                var substrldlkarr1=[];
                var substrldlkarr2=[];

                zwgb='<img class="zwgb" src="cjrImg/nzhong@2x.png"></img>'+'<span class="zwgb_span"  style="color:#e45555">'+"暂未公布"+'</span>';
                $(".tabList1").html("");
                   var countryArr=[];//指标内页跳转 国家名
                   var phContext=[];//指标内页跳转 标题名
                   var define=[];//指标内页跳转 内容名
                   var frequency=[];//指标内页跳转 公布次数名
                   var previous=[];//前值
                   var predict=[];//预期
                   var currentValue=[]//实际
                   var weightiness=[]//星星
                   // var countryArr=[];
                   var columnCode=[];
                   var currency=[];
                for (var i = 0; i < rlnyListArr.length; i++) {
                    var sstr="- -";
                    var ssssssaaa="";
                    if (rlnyListArr[i].time=="") {
                        rlnyListArr[i].time=sstr;

                    }
                    if (rlnyListArr[i].previous=="") {
                        rlnyListArr[i].previous=sstr;

                    }
                    if (rlnyListArr[i].predict=="") {
                        rlnyListArr[i].predict=sstr;

                    }
                    var newvalue=rlnyListArr[i].currentValue;

                    if (rlnyListArr[i].currentValue=="") {
                        rlnyListArr[i].currentValue=zwgb;

                    }

                    var substrldlk1 =  rlnyListArr[i].greaterText.substring(0, 4);
                    var substrldlk2 =  rlnyListArr[i].lessText.substring(0, 4);
                    substrldlkarr1.push(substrldlk1);
                    substrldlkarr2.push(substrldlk2);
                    var sssssssss=rlnyListArr[i].textValueList;
                     var bbbb=sssssssss[0];
                     var dt2=sssssssss[1];
                     var golval="";
                     var goltype="";
                     $.each(bbbb, function(i, val) {
                         golval=bbbb.value;
                         goltype=bbbb.type;
                     });
                     var golvalData2="";
                     var goltypeData2="";
                     $.each(dt2, function(i, val) {
                         golvalData2=dt2.value;
                         goltypeData2=dt2.type;
                     });
                     var yxjx=rlnyListArr[i].type;
                     // 国家
                     var country=rlnyListArr[i].countryEn;
                     var conname=rlnyListArr[i].countryName;
                     var omyphContext=rlnyListArr[i].phContext;
                     var omydefine=rlnyListArr[i].define;
                     var omyfrequency=rlnyListArr[i].frequency;
                     var omyprevious=rlnyListArr[i].previous;
                     var omypredict=rlnyListArr[i].predict;
                     var omycolumnCode=rlnyListArr[i].columnCode;
                     var omycurrency=rlnyListArr[i].currency;
                     var omycurrentValue=newvalue;
                     var omyweightiness=rlnyListArr[i].weightiness;
                     countryArr.push(conname);
                     phContext.push(omyphContext);
                     define.push(omydefine);
                     frequency.push(omyfrequency);
                     previous.push(omyprevious);
                     predict.push(omypredict);
                     currentValue.push(omycurrentValue);
                     columnCode.push(omycolumnCode);
                     weightiness.push(omyweightiness);
                     currency.push(omycurrency);
                     // 星级
                     var star=rlnyListArr[i].weightiness;
                    resList+='<a href="rlzbny.html" class="rl_list">'
                        +'<span class="listspan">'
                        +'<p class="omyTime">'+rlnyListArr[i].time+'</p>'
                        +'<p data-star='+star+' class="star">'
                        +'<img class="star1" src="cjrImg/xing@2x.png">'+'</img>'
                        +'<img class="star2" src="cjrImg/xing@2x.png">'+'</img>'
                        +'<img class="star3" src="cjrImg/xing@2x.png">'+'</img>'
                        +'</p>'
                        +'<p class="flag">'
                        +'<img data-src='+country+' src="cjrImg/中国@2x.png">'+'</img>'
                        +'</p>'
                        +'<p class="boderSline">'+'</p>'
                        +'</span>'
                        +'<span class="second">'
                        +'<p class="orlTile">'
                        +'<span class="country">'+rlnyListArr[i].countryName+'</span>'
                        +rlnyListArr[i].phContext
                        +'</p>'
                        +'<p class="p_qz">'+'<span class="qqzz">'+"前值："+'</span>'+'<span class="qz">'+rlnyListArr[i].previous+'</span>'+'<span data_type2='+yxjx+' class="yx" data_type='+goltype+'>'+golval+'</span>'+'</p>'
                        +'<p class="p_yq">'+'<span class="qqzz">'+"预期："+'</span>'+'<span class="yq">'+rlnyListArr[i].predict+'</span>'+'<span class="yx2" data_yx2='+goltypeData2+'>'+golvalData2+'</span>'+'</p>'
                        +'<div class="sjz_wrap">'
                        +'<p class="sjz_p1">'+"实际值"+'</p>'
                        +'<p class="sjz_p2">'+rlnyListArr[i].currentValue+'</p>'
                        +'</div>'
                        +'</span>'
                        +'</a>'
                }

                  
                  $('.upWrap').css("display","none");
                       if (resList=="") {
                                resList='<div class="noHoliday">'
                                    +'<div class="noHoliday1">'
                                        +'<img src="cjrImg/calendar@2x.png">'
                                        +'<div>'+"暂无日历指标"+'</div>'
                                    +'</div>'                                     
                                +'</div>'
                               
                   }
                    $('.tabList1').append(resList);
                   // 点击
                   
                   $('.rl_list').click(function(){
                      for (var i = 0; i < $('.rl_list').length; i++) {
                           var index=$(this).index();


                            localStorage.countryName=countryArr[index];
                            /*
                                //指标内页跳转 国家名
                                
                                //指标内页跳转 标题名
                                //指标内页跳转 内容名
                                //指标内页跳转 公布次数名
                                //前值
                                //预期
                                //实际
                                //星星
                            */ 
                            localStorage.phContext=phContext[index];
                            localStorage.define=define[index];
                            localStorage.frequency=frequency[index];
                            localStorage.previous=previous[index];
                            localStorage.predict=predict[index];
                            localStorage.currentValuer=currentValue[index];
                            localStorage.weightiness=weightiness[index];
                            localStorage.columnCode=columnCode[index];
                            localStorage.currency2=currency[index];
                      }
                   })
                 

                // 循环列表
               
                // 利多利空 、影响较小。

                for (var i = 0; i < $('.yx2').length; i++) {
                    if ($('.yx2')[i].getAttribute("data_yx2")==1) {
                           $('.yx2').eq(i).css({
                               "color":"#E45555",
                               "background-image":"url(img/liduo@2x.png)"
                           });                      
                    }else if($('.yx2')[i].getAttribute("data_yx2")==2){
                           $('.yx2').eq(i).css({
                               "color":"#399C31",
                               // "border":"0.01rem solid #399C31"
                                "background-image":"url(img/likong@2x.png)"
                           });
                    }else if ($('.yx2')[i].getAttribute("data_yx2")==""){
                           $('.yx2').eq(i).css({
                                "background-image":"none"
                           });

                    }
                }
                for (var i = 0; i < $('.yx').length; i++) {
                     if ($('.yx')[i].getAttribute("data_type")==1) {
                           $('.yx').eq(i).css({
                               "color":"#E45555",
                               // "border":"0.01rem solid #E45555"
                               "background-image":"url(img/liduo@2x.png)"
                           });
                       }else if($('.yx')[i].getAttribute("data_type")==2){
                           $('.yx').eq(i).css({
                               "color":"#399C31",
                               // "border":"0.01rem solid #399C31"
                                "background-image":"url(img/likong@2x.png)"
                           });
                       }else if ($('.yx')[i].getAttribute("data_type")==""){
                           $('.yx').eq(i).css({
                               "color":"#999",
                               // "border":"0.01rem solid #399C31"
                                "background-image":"url(img/yxjx@2x.png)"
                           });

                       }
                       if ($('.yx')[i].getAttribute("data_type2")==2) {
                           $('.yx').eq(i).html(rlnyListArr[i].compareText);
                           

                       }else if ($('.yx')[i].getAttribute("data_type2")==0) {
                            // $('.yx').eq(i).css("border","0.01rem solid #999");
                            $('.yx').eq(i).css({
                              
                               // "border":"0.01rem solid #399C31"
                                "background-image":"none"
                           });
                       }else if ($('.yx')[i].getAttribute("data_type2")==1 &&$('.yx')[i].getAttribute("data_type")=="" ) {
                            // $('.yx').eq(i).css("border","0.01rem solid #999");
                            $('.yx').eq(i).css({
                              
                               // "border":"0.01rem solid #399C31"
                                "background-image":"none"
                           });
                       }
                    if ($('.flag img')[i].getAttribute("data-src")=="USA") {
                        $('.flag img').eq(i).attr("src","cjrImg/mg@2x.png")

                    }else if($('.flag img')[i].getAttribute("data-src")=="AUS"){
                        $('.flag img').eq(i).attr("src","cjrImg/adly@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="UK"){
                        $('.flag img').eq(i).attr("src","cjrImg/yg@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="CAN"){
                        $('.flag img').eq(i).attr("src","cjrImg/jnd@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="NZ"){
                        $('.flag img').eq(i).attr("src","cjrImg/xxl@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="JPN"){
                        $('.flag img').eq(i).attr("src","cjrImg/rb@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="SWI"){
                        $('.flag img').eq(i).attr("src","cjrImg/rs@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="EU"){
                        $('.flag img').eq(i).attr("src","cjrImg/om@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="SIN"){
                        $('.flag img').eq(i).attr("src","cjrImg/xjp@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="ITA"){
                        $('.flag img').eq(i).attr("src","cjrImg/ydl@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="SK"){
                        $('.flag img').eq(i).attr("src","cjrImg/hg@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="GER"){
                        $('.flag img').eq(i).attr("src","cjrImg/dg@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="TW"){
                        $('.flag img').eq(i).attr("src","cjrImg/tw@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="HK"){
                        $('.flag img').eq(i).attr("src","cjrImg/xg@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="FRA"){
                        $('.flag img').eq(i).attr("src","cjrImg/fg@2x.png")
                    }else if($('.flag img')[i].getAttribute("data-src")=="CHN"){
                        $('.flag img').eq(i).attr("src","cjrImg/zg@2x.png")
                    }

                    // 星级

                    if ($('.star')[i].getAttribute("data-star")==1) {
                        $('.star1').eq(i).attr("src","cjrImg/xing@2x.png");
                        $('.star2').eq(i).attr("src","cjrImg/xing@2x fb.png");
                        $('.star3').eq(i).attr("src","cjrImg/xing@2x fb.png");
                    }else if ($('.star')[i].getAttribute("data-star")==2) {
                        $('.star1').eq(i).attr("src","cjrImg/xing@2x.png");
                        $('.star2').eq(i).attr("src","cjrImg/xing@2x.png");
                        $('.star3').eq(i).attr("src","cjrImg/xing@2x fb.png");
                    }else{
                        $('.star1').eq(i).attr("src","cjrImg/xing@2x.png");
                        $('.star2').eq(i).attr("src","cjrImg/xing@2x.png");
                        $('.star3').eq(i).attr("src","cjrImg/xing@2x.png");
                        $('.orlTile').eq(i).css("color","#df474a");
                    }

                }

            }
            //财经事件
            cjbind(rlDate)
            // 假日预告
            initjryg(rlDate);


        }) 



   //财经事件
  function cjbind(rlDate){

    $.ajax({
        url: baseUrl+"/economic/getFinancialEvent.json",
        dataType: "jsonp",
        type: "GET",
        data:{
            strDate:rlDate
        },
        success: function (data) {
      
            var cjsj=[];
            cjsj=data.data.result;
            var cjsjRes="";
            for (var i = 0; i < cjsj.length; i++) {
                var witness=cjsj[i].weightiness;
              
                cjsjRes+='<ul>'
                    +'<li odata_src='+witness+' class="cjsj_star">'
                    +'<img class="cjsj_star1"  src="cjrImg/xing@2x.png">'+'</img>'
                    +'<img class="cjsj_star2"  src="cjrImg/xing@2x.png">'+'</img>'
                    +'<img class="cjsj_star3"  src="cjrImg/xing@2x.png">'+'</img>'
                    +'</li>'
                    +'<li class="event">'+cjsj[i].event+'</li>'
                    +'<div class="cjsj_bt">'
                    +'<li class="area">'+cjsj[i].area+'</li>'
                    +'<li class="area_time">'+cjsj[i].time+'</li>'
                    +'</div>'
                    +'</ul>'
            }
            // 将财经事件append到页面
            $('.tabList2').html("");
            if (cjsjRes=="") {
              
              cjsjRes='<div class="noHoliday">'
                                    +'<div class="noHoliday1">'
                                        +'<img src="cjrImg/cjsj@2x.png">'
                                        +'<div>'+"暂无财经事件"+'</div>'

                                    +'</div>'
                                     
                                +'</div>'
            }
            $('.tabList2').append(cjsjRes);
            // 财经事件星级
            for (var i = 0; i < $('.cjsj_star').length; i++) {
                if ($('.cjsj_star')[i].getAttribute("odata_src")==1) {
                    $('.cjsj_star1').eq(i).attr("src","cjrImg/xing@2x.png");
                    $('.cjsj_star2').eq(i).attr("src","cjrImg/xing@2x fb.png");
                    $('.cjsj_star3').eq(i).attr("src","cjrImg/xing@2x fb.png");
                }else if ($('.cjsj_star')[i].getAttribute("odata_src")==2) {
                    $('.cjsj_star1').eq(i).attr("src","cjrImg/xing@2x.png");
                    $('.cjsj_star2').eq(i).attr("src","cjrImg/xing@2x.png");
                    $('.cjsj_star3').eq(i).attr("src","cjrImg/xing@2x fb.png");
                }else{
                    $('.cjsj_star1').eq(i).attr("src","cjrImg/xing@2x.png");
                    $('.cjsj_star2').eq(i).attr("src","cjrImg/xing@2x.png");
                    $('.cjsj_star3').eq(i).attr("src","cjrImg/xing@2x.png");
                }
            }

        }
    })
} 


// 假日预告
 function initjryg(rlDate){
            $.ajax({
               url: baseUrl+"economic/getHolidayNotice.json",
                dataType: "jsonp",
                type: "GET",
                data:{
                    strDate:rlDate
                },
                success: function (data) {
                  var jryg=data.data.result;
                  var jrygres="";
                  for (var i = 0; i < jryg.length; i++) {
                    var jrygwitness=jryg[i].weightiness;
                    jrygres+='<ul class="cjyg_ul">'
                                  +'<li odata_src='+jrygwitness+' class="cjsj_star">'
                                    +'<img class="cjsj_star1"  src="cjrImg/xing@2x.png">'+'</img>'
                                    +'<img class="cjsj_star2"  src="cjrImg/xing@2x.png">'+'</img>'
                                    +'<img class="cjsj_star3"  src="cjrImg/xing@2x.png">'+'</img>'
                                  +'</li>'
                                  +'<li class="event">'+jryg[i].event+'</li>'
                                  +'<div class="cjsj_bt">'
                                    +'<li class="area">'+jryg[i].area+'</li>'
                                    +'<li class="area_time">'+jryg[i].time+'</li>'
                                  +'</div>'
                                +'</ul>'
                  }
                  $('.tabList3').html("");
                   if( jrygres==""){
                          // jrygres='<img src="cjrImg/暂无假日@2x.png">'
                          jrygres='<div class="noHoliday">'
                                    +'<div class="noHoliday1">'
                                      +'<img src="cjrImg/zwjr@2x.png">'
                                      +'<div>'+"暂无假日预告"+'</div>'
                                    +'</div>'                                     
                                +'</div>'
                      }
                  $('.tabList3').append(jrygres);
                   
                }
            })
            }
})


 var init={
        translate:function(obj,windowWidth,star){
            obj.style.webkitTransform='translate3d('+-star*windowWidth+'px,0,0)';
            obj.style.transform='translate3d('+-star*windowWidth+',0,0)px';
            obj.style.webkitTransition='all 0.3s ease-in-out';
            obj.style.transition='all 0.3s ease-in-out';
        },
        touchs:function(obj,windowWidth,tar,distance,endX){
            obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
            obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
        },
        lineAnme:function(obj,stance){
            obj.style.webkitTransform='translate3d('+stance+'px,0,0)';
            obj.style.transform='translate3d('+stance+'px,0,0)';
            obj.style.webkitTransition='all 0.1s ease-in-out';
            obj.style.transition='all 0.1s ease-in-out';
        },
        back:function(obj,windowWidth,tar,distance,endX,time){
            obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
            obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
            obj.style.webkitTransition='all '+time+'s ease-in-out';
            obj.style.transition='all '+time+'s ease-in-out';
        },
    }

    function closeTopBanner () {
    $('.close').click(function(){
        $('.wrapa').hide();
        $('.find_nav').css("top","0");
        $('.tabClick').css("top","1.01rem");
        // $('.tab_son_wrap').css("top","0.8rem");
        $('.moudle').css("height","1.01rem");
              
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
