$(document).ready(function(){

closeTopBanner();
$('.close').click();
	$('.zb_tile_cun').html(localStorage.countryName);
	$('.zb_tile_tile').html(localStorage.phContext);
	$('.define').html(localStorage.define);
	$('.head_inner3').html(localStorage.frequency);
	$('.ba_li1').append(localStorage.previous);
	$('.ba_li2').append(localStorage.predict);

	$('.ba_li3').append(localStorage.currentValuer);
if (localStorage.weightiness==1) {
	$('.xingxing1').attr("src","cjrImg/1star.png")
}else if (localStorage.weightiness==2) {
	$('.xingxing1').attr("src","cjrImg/2star.png")
}else{
	$('.xingxing1').attr("src","cjrImg/3star.png")
}



// 折线图
var omy_zxt=[];
var timeValue=[];
var dataV=[];
var newPtime=[];
var newPVal=[];
$.ajax({
	 url: baseUrl+"economic/getEconomicHistoryData.json",
         dataType: "JSONP",
         type: "GET",
         data:{
         	columnCode:localStorage.columnCode
         },
         success:function(data){

         	timeValue=data.data.result;
         	$.each(timeValue,function(i,val){

         		var dataPubTime=val.dataPubTime;

                newPtime.push(dataPubTime);
                for (var i = 0; i < newPtime.length; i++) {
                     var strr=newPtime[i]
                     var numStr=getByteLen(newPtime[i]);

                     if (numStr==7) {

                        strr=strr+"-01";

                     }
                }

         		var dataVal=val.dataValue;
            newPVal.push(dataVal);
         		date = strr.replace(/-/g,'/'); 
            var timestamp = new Date(date).getTime(); 
         		dataV[0]=timestamp;

         		dataV[1]=dataVal;

                omy_zxt.push([
                    dataV[0], // the date
                     parseFloat(dataV[1]) // the volume
                ])

         	})
// console.log(omy_zxt)
        //历史数据
        // 得到日期的位数
    function getByteLen(val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      return len;
    }

   
           



var lsRESULT="";

for (var i = 0; i < newPtime.length; i++) {
    lsRESULT+='<ul class="lsList">'
                +'<li>'
                    +'<span>'+newPtime[i]+'</span>'
                    +'<span>'+newPVal[i]+'</span>'
                +'</li>'
            +'</ul>'
}


$('.highData').append(lsRESULT);
         	// 开始画图
        $('#container').highcharts('StockChart', {
          credits:{
                enabled:false
            },
            rangeSelector : {
                selected : 6,
                inputEnabled:false
            },
             scrollbar: {
                enabled: false//不显示下方刻度滚动条
            },

            navigator: {
                height:-60,
                enabled: false//不显示下方刻度游标尺

            },
             xAxis: {
                    lineWidth: 1,
                    lineColor: "#1a96ef",
                    tickWidth: 0,
                    labels: {
                        x:-20,
                        y: 50, //x轴刻度往下移动20px
                        style: {
                            // color: '#19a0f5',//颜色
                            fontSize:'0.24rem'  //字体
                        }
                    },
                      type: 'datetime',
                      dateTimeLabelFormats: {
                          millisecond: '%H:%M:%S.%L',
                          second: '%H:%M:%S',
                          minute: '%H:%M',
                          hour: '%H:%M',
                          day: '%m-%d',
                          week: '%m-%d',
                          month: '%Y-%m',
                          year: '%Y'
                      }
                    // categories: ['One','Two','three']
                },
             yAxis: {
                    lineWidth: 1,
                    lineColor: "#1a96ef",
                    tickWidth: 0,
                    labels: {
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            // color: '#19a0f5',//颜色
                            fontSize:'0.24rem'  //字体
                        }
                    },
                    
                },

            // title : {
            //     text : 'AAPL Stock Price'
            // },
            series : [{
                name : 'AAPL Stock Price',
                data : omy_zxt,
                type : 'area',
                threshold : null,
                // tooltip : {
                //     valueDecimals : 2
                // },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },

          
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },

           

            }]
        });

    }

});
// 相关新闻

$.ajax({
    url: searchUrl+"news/searchAppNews.json",
         dataType: "JSONP",
         type: "GET",
         data:{
           keyWord:localStorage.currency2,
           pageSize:3,
           pageNo:1
         },
         success:function(data){
            var arr=data.data.items;
    var result="";


     var clickimgRes = '';

    for (var i = 0; i < arr.length; i++) {
          var substr = arr[i].publishTime.substring(5, 16);
          var substr_title = arr[i].newsTitle.substring(0, 28);
          arr[i].publishTime = substr;
          arr[i].newsTitle = substr_title;
          var newsId=arr[i].id;
          // newsIdArrOli2.push(newsId);
          if (arr[i].hotType && arr[i].hotType!="" &&arr[i].hotType!=null &&arr[i].hotType!=undefined) {
                  if (arr[i].hotType == 2) {
                      clickimgRes = 'img/img_h5_v.2.0/2d.png'
                  }else if (arr[i].hotType == 3) {
                      clickimgRes = 'img/img_h5_v.2.0/3d.png'
                  }else if (arr[i].hotType == 4){
                      clickimgRes = 'img/img_h5_v.2.0/4d.png'
                  }else if (arr[i].hotType == 5){
                      clickimgRes = 'img/img_h5_v.2.0/5d.png'
                  }
          }
          result += '<a class="oli2" href="/active/article/'+arr[i].id+'.html" data_newID="'+arr[i].id+'">'
                                                +'<img class="newImg lazy" data-original="'+arr[i].image+'" src="img/newPic@2x.png" alt="">'
                                                +'<div class="odiv">'
                                                    +'<div class="newsTitle">'
                                                        +'<p class="news_tile_p">'+arr[i].newsTitle+'</p>'
                                                        +'<div class="new_bt">'
                                                            +'<p class="new_bt_p1">'
                                                                +'<img class="clickimg" src="'+clickimgRes+'"/>'
                                                            
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
      //     var newsIdURL=baseUrl+"h5/news/getNews.json?newsId="+newsIdIndex;
      //     var clockNewsNumUrl=baseUrl+"/h5/news/clickNews.json?newsId="+newsIdIndex;
      //     localStorage.newsIdURLIndex=newsIdURL;
      //     localStorage.clockNewsNum=clockNewsNumUrl;

      // });

         }
})

})



function closeTopBanner () {
    $('.close').click(function(){
        $('.wrap').hide();
        $('.moudle').css("height","0rem");
        
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
