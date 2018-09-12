$(document).ready(function(){
	$('.zb_tile_cun').html(localStorage.countryName);
	$('.zb_tile_tile').html(localStorage.phContext);
	$('.define').html(localStorage.define);
	$('.head_inner3').html(localStorage.frequency);
	$('.ba_li1').append(localStorage.previous);
	$('.ba_li2').append(localStorage.predict);

	$('.ba_li3').append(localStorage.currentValuer);
    // console.log(localStorage.currentValuer)
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
	 url: "https://app5.fx168api.com/economic/getEconomicHistoryData.json",
         dataType: "JSONP",
         type: "GET",
         data:{
         	columnCode:localStorage.columnCode
         },
         success:function(data){
            // console.log(data)
         	timeValue=data.data.result;
         	$.each(timeValue,function(i,val){
         		// console.log(val)
         		var dataPubTime=val.dataPubTime;
                // console.log(dataPubTime)
                newPtime.push(dataPubTime);
                for (var i = 0; i < newPtime.length; i++) {
                     // console.log(newPtime[i]);
                     var strr=newPtime[i]
                     var numStr=getByteLen(newPtime[i]);
                     // console.log(numStr)
                     if (numStr==7) {
                        strr=strr+"-01";
                        // console.log(strr)
                     }
                }
                 console.log(strr)
         		var dataVal=val.dataValue;
                newPVal.push(dataVal);
         		date = strr.replace(/-/g,'/'); 
                console.log(date)
                var timestamp = new Date(date).getTime(); 
         		dataV[0]=timestamp;
         		// console.log(timestamp);
         		dataV[1]=dataVal;

                omy_zxt.push([
                    dataV[0], // the date
                     parseFloat(dataV[1]) // the volume
                ])
                console.log(dataV[0])
         	})
         	console.log(omy_zxt)
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

   
           
console.log(newPtime);
console.log(newPVal);


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
                        y: 20, //x轴刻度往下移动20px
                        style: {
                            // color: '#19a0f5',//颜色
                            fontSize:'0.24rem'  //字体
                        }
                    },
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
// console.log(localStorage.currency)
$.ajax({
    url: "https://app4.fx168api.com/news/searchAppNews.json",
         dataType: "JSONP",
         type: "GET",
         data:{
           keyWord:localStorage.currency,
           pageSize:4,
           pageNo:1
         },
         success:function(data){
            var abnews=[];
            abnews=data.data.items;
            var newsTitleArr=[];
            var abnewsId=[];
            for (var i = 0; i < abnews.length; i++) {
                 var newsTitle=abnews[i].newsTitle;
                 newsTitleArr.push(newsTitle);
                 abnewsId.push(abnews[i].id)
            }
           // console.log(abnewsId);


           var aboutzxRES="";
           for (var i = 0; i < newsTitleArr.length; i++) {
               aboutzxRES+='<li class="ab_li">'
                               
                                
                                +'<a class="abn" href="../../H5_wapProject/newContent.html">'
                                    +'<span class="abn_oimg">'
                                        +'<img src="../h5-app-project/img/dian.png">'+'</img>'
                                       
                                    +'</span>'
                                    +'<span class="font-rlzb">'+newsTitleArr[i]+'</span>'

                                +'</a>'

                            +'</li>'
                            
            } 
            $('.a_aboutwrap').append(aboutzxRES);
            $('.ab_li').click(function(){
                for (var i = 0; i < abnewsId.length; i++) {
                    index=$(this).index();
                    // console.log(index);
                    newsIdIndex=abnewsId[index];
                }
                 var newsIdURL='http://app1.fx168api.com:8080//news/getNews.json?newsId='+newsIdIndex;
                  localStorage.newsIdURLIndex=newsIdURL;
            })
            $('.btn').click(function(){
                sessionStorage.keyWord=localStorage.currency;
            })

         }
})

})