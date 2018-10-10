$(function(){

    initinnerSocket();
     socket.on('disconnect', function() {

        var socketUrlArr=["https://app6.fx168api.com:9091","https://app7.fx168api.com:9091"];//行情
        var index_socket = Math.floor((Math.random()*socketUrlArr.length)); 
        socketUrl=socketUrlArr[index_socket];
        initinnerSocket();
    });
    var selected=1;
   sessionStorage.hq_inner_left==0;
   sessionStorage.pagecount3 = "分时";
	$('.hqIn_title').html(sessionStorage.hq_inner_title);
	$('.title_date').html(sessionStorage.hq_inner_date);
	$('.hq_inner_trade').html(sessionStorage.hq_inner_tradePrice);
	$('.hq_inner_range').html(sessionStorage.hq_inner_range);
	$('.hq_inner_rangePercent').html(sessionStorage.hq_inner_rangePercent);
	$('.hq_data_open').html(sessionStorage.hq_inner_openPrice);
	$('.hq_data_high').html(sessionStorage.hq_inner_highPrice);
	$('.hq_data_preClose').html(sessionStorage.hq_inner_preClosePrice);
	$('.hq_data_low').html(sessionStorage.hq_inner_lowPrice);
    sessionStorage.clickType="Min01";
    
    
    // sessionStorage.quateJson=1

// 判断价格的颜色
	if (sessionStorage.hq_inner_range>0) {
		$('.hq_inner_trade').css("color","#EC1A1A");
		$('.hq_inner_range').css("color","#EC1A1A");
		$('.hq_inner_rangePercent').css("color","#EC1A1A");
		$('.hq_inner_tradeWrap img').attr("src","img/hjt@2x.png");
	}else{
		$('.hq_inner_trade').css("color","#0AA20D");
		$('.hq_inner_range').css("color","#0AA20D");
		$('.hq_inner_rangePercent').css("color","#0AA20D");
		$('.hq_inner_tradeWrap img').attr("src","img/ljt@2x.png");
	}

	// tab选项卡
    /*
        tabl选项卡start
        @gcy

    */ 
    $('.titleBar1').html(sessionStorage.fgTile);//改变标题

    $(".find_nav_list").css("left",sessionStorage.hq_inner_left+"px");

    $(".find_nav_list li").each(function(){
        if($(this).find("a").text()==sessionStorage.pagecount3){
            $(".sideline").css({left:0});
            $(".sideline").css({width:$(this).outerWidth()});

            $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
            navName(sessionStorage.pagecount3);
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
        $('.sum').css("display","block");
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
        sessionStorage.hq_inner_left=fnl_l;
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
  


function navName(c_nav) {
    switch (c_nav) {      
        case "分时":
            sessionStorage.pagecount3 = "分时";
            break;
        case "1小时":
            sessionStorage.pagecount3 = "1小时";
            break;
        case "日线":
            sessionStorage.pagecount3 = "日线";
            break;
        case "周线":
            sessionStorage.pagecount3 = "周线";
            break;
        case "月线":
            sessionStorage.pagecount3 = "月线";
            break;
        case "期货":
            sessionStorage.pagecount3 = "分钟";
            break;      
    }
}
// table end
$('.hq_inner_fz').click(function(){
    if ($('.hq_inner_fzx_wrap').css("display")=="none") {
        $('.hq_inner_fzx_wrap').css("display","block");
    }else if($('.hq_inner_fzx_wrap').css("display")=="block"){
        $('.hq_inner_fzx_wrap').css("display","none");
    }
    
})

$('.hq_inner_fzx_wrap ul li').click(function(){
    $('.hq_inner_fzx_wrap').css("display","none")
    var index=$(this).index();
    $('.hq_inner_fzx_wrap ul li').eq(index).each(function(){

        $('.hq_inner_fz a').html($(this).text());
    })
})

for (var i = 0; i < $('.find_nav_list li').length; i++) {
    $('.find_nav_list li').eq(i).click(function(){

        if ($(this).index()<5) {
            $('.hq_inner_fzx_wrap').css("display","none");
            $('.hq_inner_fz a').html("分钟");
        }
        if ($(this).index()>0) {
            $('#container').css("display","none");
            $('#container2').css("display","block");
        }else if ($(this).index()==0) {
            $('#container2').css("display","none");
            $('#container').css("display","block");
        }
            
    })
}

    $('.min').click(function(){   
        sessionStorage.clickType="Min01";
        $('.sum').css("display","none");
       
    })
    $('.hq_hour').click(function(){   
        sessionStorage.clickType="Min60";
        selected=1;
        hq_kAjax()
      
    })
    $('.hq_day').click(function(){   
        sessionStorage.clickType="Day";
        selected=1;
        hq_kAjax()
       
    })
    $('.hq_week').click(function(){   
        sessionStorage.clickType="Week";
        selected=4;
        hq_kAjax()
    })
    $('.hq_month').click(function(){   
        sessionStorage.clickType="Month";
        selected=5;
        hq_kAjax()
    })
    $('.hq_min01').click(function(){   
        sessionStorage.clickType="Min01";
        selected=1;
        hq_kAjax()
    })
    $('.hq_min03').click(function(){   
        sessionStorage.clickType="Min03";
        selected=6;
        hq_kAjax()
    })
    $('.hq_min05').click(function(){   
        sessionStorage.clickType="Min05";
        selected=2;
        hq_kAjax()
    })
    $('.hq_min15').click(function(){   
        sessionStorage.clickType="Min15";
        selected=2;
        hq_kAjax()
    })
    $('.hq_min30').click(function(){   
        sessionStorage.clickType="Min30";
        selected=2;
        hq_kAjax()
    })

//绘图分时图ajax
    $.ajax({
        url: baseUrl+"quotation/getData.json",
             dataType: "JSONP",
             type: "GET",
             data:{
                "count":240,
                "type":sessionStorage.clickType,
                "code":sessionStorage.hq_inner_key

             },
        success:getMinDataData
    })

    //绘制k线图 
    function hq_kAjax(){
        $.ajax({
            url: baseUrl+"quotation/getData.json",
                 dataType: "JSONP",
                 type: "GET",
                 data:{
                    "count":240,
                    "type":sessionStorage.clickType,
                    "code":sessionStorage.hq_inner_key

                 },
            success:initData
        })
    }
    // var chart=$('#container').highcharts();
    // chart.showLoading();
// 分时图回调函数
    function getMinDataData(data){

        var MinDataData=data.data.totalList;

        var MinDataDataArr=[];//收盘价
        var hqMinDate=[];//日期
        var dateStr="";
        var dataWrap=[];
        var dateArr=[];
        var closeArr=[];
        var newClose=[];
        for (var i = 0; i < MinDataData.length; i++) {
                      
            hqMinDate.push(MinDataData[i].date);
            var dateStr=MinDataData[i].date;
            var dateArrss=dateStr.split(" ");            
            dateArr.unshift(dateArrss[1]);
            closeArr.unshift(MinDataData[i].closePrice);
            newClose.unshift(MinDataData[i].closePrice);

        }

     

        
        sortArr=newClose.sort();

        var max="";
        var min="";
        for (var i = 0; i < sortArr.length; i++) {
           min=sortArr[0];
           max=sortArr[i];
        }

        

        // 开始画图

var dom = document.getElementById("container");
var myChart = echarts.init(dom);
option = { 
    title: {
        left: 0,
        text: '',
    },
    tooltip : {
        textStyle : {
            color: 'white',
            decoration: 'none',
            // fontFamily: 'Verdana, sans-serif',
            fontSize: 30,
            // fontStyle: 'italic',
            fontWeight: 'bold'
        },
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
    },
    grid: [{
      left: '2%',
      right:'7%',     
    }],  
    xAxis: {
        left:0,
        type: 'category',
        boundaryGap: false,
        data: dateArr,
        axisLabel:{ //调整x轴的lable  
            textStyle:{
                fontSize:20,// 让字体变大
                color:'#3E454D'
            }
        },
       
    },
    yAxis: {
        position:'right',
        axisLabel:{ //调整x轴的lable  
            textStyle:{
                fontSize:20, // 让字体变大
                color:'#3E454D'
                
            }
        },
        splitLine:{
           lineStyle:{
             color: '#1a1e24',
             width:2
           }
        },
        splitNumber:3,
        type: 'value',
        boundaryGap: [0, '100%'],
        min:min,
        max:max
    },
    // dataZoom: [{
    //     type: 'inside',
    //     start: 0,
    //     end: 100
    // }, {
    //     start: 0,
    //     end: 100,
    //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    //     handleSize: '80%',
    //     handleStyle: {
    //         color: '#fff',
    //         shadowBlur: 3,
    //         shadowColor: 'rgba(0, 0, 0, 0.6)',
    //         shadowOffsetX: 2,
    //         shadowOffsetY: 2
    //     }
    // }],
    series: [
        {
            name:'分时',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: '#84b3ff'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#2b3c59',
                        opacity:0.2
                    }, {
                        offset: 1,
                        color: '#2b3c59',
                        opacity:0.2
                    }])
                }
            },
            data: closeArr
        }
    ]
};
 if (option && typeof option === "object") {
        var startTime = +new Date();
        myChart.setOption(option, true);//显示
        var endTime = +new Date();
        var updateTime = endTime - startTime;
}
       
    }

var myStart=70;
 $('.add').click(function(){
    
    myStart+=5;
   if (myStart>=100) {
        myStart=100;
   }
    hq_kAjax();
  
 })
$('.jian').click(function(){
    if (myStart<=0) {
        myStart=0;
   }
    myStart-=5;
    hq_kAjax();
 })

      
function initData (data) {
    var bigArr=data.data.totalList;
    var arrList=[];
    var dateList = [];
    var arr=[];
    var dataWrap=[];
    var newDate=[];
    var newDateOne=[];
    var vol=[];
    for (var i = 0; i < bigArr.length; i++) {
        var dates=bigArr[i].date;
        var dateArr=dates.split(" ");
        var newDate1=dateArr[0]

        var high=bigArr[i].highPrice;
        var open=bigArr[i].openPrice;
        var low=bigArr[i].lowPrice;
        var close=bigArr[i].closePrice;
        var vol1=bigArr[i].amount;
          dataWrap.unshift([

          parseFloat(open),
          parseFloat(close),
          parseFloat(low),
          parseFloat(high),
          parseFloat(vol1),
        ]);
           newDate.unshift(newDate1);
           // newDateOne.unshift(dates);
           vol.unshift(vol1);       
    }

//MA计算公式
function calculateMA(dayCount) {
  var result = [];
  for (var i = 0, len = newDate.length; i < len; i++) {
      if (i < dayCount) {
          result.push('-');
          continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
          sum += dataWrap[i - j][1];
      }
      result.push((sum / dayCount).toFixed(6));
  }
 
  return result;

}

var dom = document.getElementById("container2");
var myChart = echarts.init(dom);
var option = {
    animation:false,
     // backgroundColor:'#0D1219',
  title: {
      text: '',
      left: 0
  },
   // tooltip : {
   //  triggerOn:'mousemove',
        // textStyle : {
        //     color: 'white',
        //     decoration: 'none',
        //     fontFamily: 'Microsoft YaHei',
        //     fontSize: 24,
        //     fontStyle: 'italic',
        //     fontWeight: 'bold'
        // },
   //      trigger: 'axis',
   //      axisPointer: {
   //        type: 'line'
   //      }
   //  },

    tooltip : {
            triggerOn:'mousemove',
            trigger: 'axis',
                    formatter: function (params) {
                var res = params[0].name;
                res += '<br/>' + params[0].seriesName;
                res += '<br/>  开盘 : ' + params[0].value[0] +'</br>'+'  最高 : ' + params[0].value[3];
                res += '<br/>  收盘 : ' + params[0].value[1] + '</br>'+'  最低 : ' + params[0].value[2];
                return res;
            },
            textStyle : {
                color: 'white',
                decoration: 'none',
                // fontFamily: 'Microsoft YaHei',
                fontSize: 24,
                // fontStyle: 'italic',
                fontWeight: 'bold'
            },
    },
  // legend: {
  //     data: ['KLine', 'MA5','MA10','MA30']
  // },
  grid: [           {
      left: '2%',
      right: '7%',
      height: '80%'
  }],
  xAxis: [{
    
    // offset:100,
     axisLabel:{ //调整x轴的lable  
            textStyle:{
                fontSize:20 // 让字体变大
            }
        },
      type: 'category',
      data: newDate,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      splitNumber: 3,
      min: 'dataMin',
      max: 'dataMax'
  }],
  yAxis: [{
    position:'right',
       splitLine:{
           lineStyle:{
             color: '#1a1e24',
             width:2
           }
        },
    splitNumber:3,
     axisLabel:{ //调整x轴的lable  
            textStyle:{
                fontSize:20 // 让字体变大
            }
        },
      scale: true,
      splitArea: {
          show: false
      },

  }],
  dataZoom: [{
    disabled:true,

          type: 'inside',
          dataZoomIndex:100,
          xAxisIndex: [0, 0],
          start: myStart,
          end: 100
    }],
  series: [{

          name: sessionStorage.hq_inner_title,
          type: 'candlestick',
          data: dataWrap,
          itemStyle: {
              normal: {
                  color: '#0D1219',
                  color0: '#0AA20D',
                  borderColor: '#EC1A1A',
                  borderColor0: '#0AA20D',

                  
              }
          },
      
        
          // markPoint: {
          //     data: [
          //         {type: 'max', name: '最大值'},
          //         {type: 'min', name: '最小值'}
          //     ]
          // },
        
      },{
          name: 'MA5',
          type: 'line',
          symbol:'none',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
              normal: {
                  opacity: 0.5,
                  color:'blue'
              }
          }
      },{
          name: 'MA10',
          type: 'line',
          symbol:'none',
          data: calculateMA(10),
          smooth: true,
          lineStyle: {

              normal: {
                  opacity: 0.5,
                  color:'yellow'
              }
          }
      },{
          name: 'MA30',
          type: 'line',
          symbol:'none',
          data: calculateMA(30),
          smooth: true,
          lineStyle: {

              normal: {
                  opacity: 0.5,
                  color:'red'
              }
          }
      }
  ]
};  
      if (option && typeof option === "object") {
            var startTime = +new Date();
            myChart.setOption(option, true);//显示
            var endTime = +new Date();
            var updateTime = endTime - startTime;
    }

 }

 quateAboutNews();
    
})



function initinnerSocket() {
    // socket 行情请求
    $('.hq_inner_con_Left').attr("data-key",sessionStorage.hq_inner_key)
        var hq_key=[];
        var hq_value=[];
        socket = io.connect(socketUrl, { 'reconnect': true });  

        socket.on('connect', function(data) {  

            
             socket.emit('quotationH5', {"secret":"h5Socket","appType":"h5"});
            
        });  


        socket.on('quotationPushH5', function(data) {   
            var resArr=JSON.parse(data);
            var key1= null;
            var data=null;
            $.each(resArr,function(key,value){
                key1 =key;
                data = value;
            })

             
                
                if ($('.hq_inner_con_Left').attr("data-key")==key1) {
                    $('.hq_inner_trade').html(data[0]);
                    $('.hq_inner_range').html(data[5]);  
                    $('.hq_inner_rangePercent').html(data[6]);
                    $('.title_date').html(data[7]);
                    sessionStorage.hq_inner_date=data[7];
                    sessionStorage.hq_inner_tradePrice=data[0];
                    sessionStorage.hq_inner_range=data[5];
                    sessionStorage.hq_inner_rangePercent=data[6];
                

                }
                
              
                // $('.hq_List').eq(i).attr("data-key")==hq_key[i]
              
            
        }); 
}

// 相关新闻
function quateAboutNews(){
    $.ajax({
        url: searchUrl+"news/searchAppNews.json",
        dataType: "jsonp",
        type: "GET",                    
        data:{
            keyWord:sessionStorage.hq_inner_title,
            pageSize:3,
            pageNo:1
        },
        success:quateAboutNewsSuc
    })
}
function quateAboutNewsSuc (data){
    var arr=data.data.items;
    var result="";


     

    for (var i = 0; i < arr.length; i++) {
          var substr = arr[i].publishTime.substring(5, 16);
          var substr_title = arr[i].newsTitle.substring(0, 28);
          arr[i].publishTime = substr;
          arr[i].newsTitle = substr_title;
          var newsId=arr[i].id;
          // newsIdArrOli2.push(newsId);
          result += '<a class="oli2" href="/active/article/'+arr[i].id+'.html" data_newID="'+arr[i].id+'">'
                                                +'<img class="newImg lazy" data-original="'+arr[i].image+'" src="img/newPic@2x.png" alt="">'
                                                +'<div class="odiv">'
                                                    +'<div class="newsTitle">'
                                                        +'<p class="news_tile_p">'+arr[i].newsTitle+'</p>'
                                                        +'<div class="new_bt">'
                                                            +'<p class="new_bt_p1">'
                                                                +'<img class="clickimg" src="img/lll@2x.png"/>'
                                                                +arr[i].clickNum
                                                            +'</p>'
                                                            +'<p class="new_bt_p2">'+arr[i].publishTime+'</p>'
                                                        +'</div>'
                                                    +'</div>'
                                                +'</div>'
                      +'</a>';
    }

    $('.quateAbout').append(result);
    $("img.lazy").lazyload();
      // $(".oli2").click(function(){                                  
      //     newsIdIndex=$(this).attr("data_newID");                                 
      //     var newsIdURL=baseUrl+"news/getNews.json?newsId="+newsIdIndex;
      //     var clockNewsNumUrl=baseUrl+"news/clickNews.json?newsId="+newsIdIndex;
      //     localStorage.newsIdURLIndex=newsIdURL;
      //     localStorage.clockNewsNum=clockNewsNumUrl;

      // });
}