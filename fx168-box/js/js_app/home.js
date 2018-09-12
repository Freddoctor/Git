$(function(){
	// 搜索地址传输给app
	getSearchUrl();
	window.sc=0;
	$(".con-font").css({height:"0.65rem"});
	//点击展开
	clickMore ();
	// 本期之星
	ajaxThisStar ();	
	// 滚动定位
	scrollWindow ();
	// 点击综合排序
	var headConHeight=$('.advertisement').outerHeight()+$('.img_star').outerHeight()+$('.content_middle').outerHeight()+$('.con-font').outerHeight();
	var scrollTop=0;
	// 综合排序
	$(".sortComplex").click(function() {
        $('html, body').animate({
            scrollTop: headConHeight
        }, 500);
        getSortComplex();
    });
	 // 筛选
	$(".screen").click(function() {
        $('html, body').animate({
            scrollTop: headConHeight
        }, 500);
        getScreen();
    });
	initAd ();
	// 获取广告信息
	getDeviceInfo();
	// getSampleAdData();
	initDropLoad();


})






var materialId=null;
var sortIndex=0;
var Screen=null;
var regulator="";//监管机构
var platformType="";//平台性质
var tradeMode="";//交易平台
var fundingMethod="";//入金方式
var regTimeIndex="";//成立时间
var regTimeIndex="";//成立时间
var counter = 0;
// 每页展示4个
var num = 20;
var pageSize=20;
var pageNo=1;
var pageStart = 0,pageEnd = 0;
var droploader=null;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var appType=0;
var t="";
var ua="",ip="", sw="",sh="",make="",model="",ose="",osv="",did="",mac="",adid="",carrier="",connectiontype="",devicetype="",t="",brand="",osvVersion="",appCategory="",appVersion="";
var adMap={};

// 广告
if (isAndroid) {
	appType=1
}else if (isiOS) {
	appType=0
}
function acceptToken(t){
	t=t;
	
}







// 广告ajax
function Advertisementajax(){
	
		$.ajax({
        url: baseUrl2+"/ad/getAdForNewVersion.json",
        // url :"http://123.206.224.250:8080/ad/getAdForNewVersion.json?configName=commentBanner&appType=1",
        // url:"https://app3.fx168api.com/small/news/getNewsByChannel.json?channelId=1",
        dataType: "jsonp",
        type: "GET",
        data:{
        	"appType":appType,
        	"configName":"commentBanner",
        	"t":"",
        	"ua":ua,
        	"ip":ip,
        	"sw":sw,
        	"sh":sh,
        	"make":make,
        	"model":model,
        	"os":ose,
        	"osv":osv,
        	"did":did,
        	"mac":mac,
        	"adid":adid,
        	"carrier":carrier,
        	"connectiontype":connectiontype,
        	"devicetype":devicetype,
        	"appVersion":appVersion,
        	"appCategory":appCategory

        },
        success: Advertisement
       
    });
}

//点击广告
function clickAdvAjax(adCodeId,materialType,sourceFrom,materialId){
	
	$.ajax({
		url: baseUrl2+"//ad/addLog.json",
        
        dataType: "jsonp",
        type: "GET",
        data:{        	
        	"token":t,
        	"type":0,
        	"deviceId":did,
        	"osv":osv,
        	"osvVersion":osvVersion,
        	"channel":model,
        	"apiv":"http",
        	"ip":ip,
        	"adCodeId":adCodeId,
        	"materialType":materialType,
        	"sourceFrom":sourceFrom,
        	"materialId":materialId
        },
        success:clickAdv
	});
}
// 展示广告
function showAdvAjax(shoWadCodeId,showMaterialType,showSourceFrom,materialId){
	
	$.ajax({
		url: baseUrl2+"//ad/addLog.json",
        
        dataType: "jsonp",
        type: "GET",
        data:{
        	"brand":brand,        	
        	"token":t,
        	"type":1,
        	"deviceId":did,
        	"osv":osv,
        	"osvVersion":osvVersion,
        	"channel":model,
        	"apiv":"http",
        	"ip":ip,
        	"adCodeId":shoWadCodeId,
        	"materialType":showMaterialType,
        	"sourceFrom":showSourceFrom,
        	"materialId":materialId,

        },
        success:clickAdv
	});
}
// 滚动定位tab
function scrollWindow () {
	var headConHeight=$('.header').outerHeight()+$('.bgStar_Wrap').outerHeight();
	var scrollTop=0;
	
	$(window).scroll(function(){
		scrollTop=$(document).scrollTop();
		sc=0;
		sc=scrollTop;
		

		
		
	     if (scrollTop>headConHeight) {
			$('.sort ul').css({
				"position":"fixed",
				"top":0,
				"box-shadow":"0px -10px 30px #888"
			})
			if (isAndroid) {
				$('.sort').css("margin-bottom","0.8rem");
				
			}
			
		}else{
			$('.sort ul').css({
				"position":"relative",
				"top":0,
				"z-index":100,
				"box-shadow":"none"
			})
			if (isAndroid) {
				$('.sort').css("margin-bottom","0rem");
			}
			
		}

	});
}


function initAd () {
	var baiduStr=null;		
	 $.ajax({
	        url: baseUrl2+"/comment/getBaiduAdInfo.json",
	       
	        dataType: "jsonp",
	        type: "GET",    
	        data:{
	           
	        },
	        success: function(data){	       	
	       		var dataObj_ad=data.data;
                $.each(dataObj_ad,function(key,val){
					    adMap[key]=val["adId"];
				});   
							       		
	        }	       
	    })

}


//初始化上拉加载
function initDropLoad(){

	droploader=$('.con').dropload({
    	scrollArea : window,
    	 domDown : {  
            domClass   : 'dropload-down',  
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',  
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',  
            domNoData  : '<div class="dropload-noData">暂无更多数据</div>'  
        },
    	distance:0,
    	loadDownFn:function(me){
    		var needToGetAd={};
    	
    		$.ajax({
		        url: baseUrl2+"/comment/getBrokerList.json",
		       
		        dataType: "jsonp",
		        type: "GET",
		        data:{
		        	"sortIndex":sortIndex,
		        	"regulator":regulator,
		        	"platformType":platformType,
		        	"tradeMode":tradeMode,
		        	"fundingMethod":fundingMethod,
		        	"regTimeIndex":regTimeIndex,
		        	"keyWord":"",
		        	"pageSize":pageSize,
		        	"pageNo":pageNo
		        },
		        success: function(data){
		      		console.log(data);
					pageNo++;
			     
					var commissionArr =[];
					commissionArr=data.data;
					var listResArr =commissionArr.result;
					var result="";
					var keyWords="";
					var resultgg="";
					var abjArr=[];

					  if(listResArr==""||listResArr==null||listResArr.length==0){
					  	
					  	$('.dropload-down').hide();
                           // if(pageNo==1){
                            var noDataImg='<div class="noImgWrap">'
                                       // +'<img src="img/no_jjs@2x.png" />'
                                       +'<img src="../img/img_app/no_jjs@2x.png" />'
                                       +'<p>'+"暂无相关经纪商"+'<p/>'
    
                                   +'<div/>'
                             $('.commissionList').html(noDataImg);
                             return;

                      


                       }







							
                            var isLock=true;
							if(listResArr.length==pageSize){
								
								isLock=false;
							}
							for (var i = 0; i < listResArr.length; i++) {

								var keyWordsArr =listResArr[i].keyWords;
								var evaluationObj=listResArr[i].evaluation;
								keyWords="";
								for (var j = 0; j < keyWordsArr.length; j++) {
									keyWords+='<span>'+keyWordsArr[j]+'</span>'
								}
								resultgg="";
								if(evaluationObj!=null && evaluationObj!=undefined && evaluationObj!=""){
									resultgg+='<a href='+evaluationObj.url+'>'
												+'<img class="gg_img" src="../img/img_app/ceping@2x.png" />'
												+'<span class="gg_font">'+evaluationObj.summary+'</span>'
											+'</a>'

											
											
								}

							    var brokerId=listResArr[i].userId;
							    var value=adMap[brokerId];
							    var strAd="";
							    if(typeof value!=undefined &&value!=null &&value!=""){
							    	strAd='<span class="listBaiduAd">'
										+'<img class="" src="../img/img_app/guanggao@2x.png" />'
										+'<span userId="'+brokerId+'" class="baiduGg_home" id="ad-broke'+brokerId+'">'+'</span>'
									  +'</span>';
									  needToGetAd[brokerId]=value;


							    }



								result+='<ul style="border-bottom: 0.01rem solid #DDDDDD;" isStick="'+listResArr[i].isStick+'" isFlagship="'+listResArr[i].isFlagship+'" isAuth="'+listResArr[i].isAuth+'" userId="'+listResArr[i].userId+'" class="commission_wrap">'
									+'<li class="commission_inner" data-style="display:flex;">'
									+'<img class="tj" src="../img/img_app/tuijian@2x.png"/>'
									+'<div class="tile_img">'
									+'<img class="lazy" data-original="'+listResArr[i].logo+'" src="../img/img_app/liebiao@2x.png"/>'
										// +'<img src="img/jrwg.png" />'
									+'</div>'
									+'<div class="commission_middle">'
									+'<ul>'
									+'<div class="spread_wrap spread">'
									+'<li class="omyspread spread">'
									
									+'<span class="brokerNameList">'+listResArr[i].brokerName+'</span>'
									+'<img src="../img/img_app/guanfang@2x.png" class="qjd">'
									+'<img class="rz" src="../img/img_app/ranzheng@2x.png"/>'
									+'</li>'




									+'<li class="spread spread1">'
									+'<span>'+"欧美点差："+'</span>'
									+'<span class="euData1">'+listResArr[i].euSpread+'</span>'

									+'</li>'
									+'<li class="spread spread2">'
									+'<span>'+"返佣比例："+'</span>'
									+'<span class="euData2">'+listResArr[i].returnRatio+'</span>'
									// +'<span class="bfh">'+"%"+'</span>'
									+'</li>'
									+'<li class="spread keyWordsList">'
									+keyWords

									+'</li>'

									+'</div>'
									

									


									+'</ul>'

									+'</div>'
									+'<li class="resultgg">'
										+resultgg
									+'</li>'
									+strAd
									+'<div class="goal">'
									+'<span class="goalList">'+listResArr[i].complex+'</span>'
									+'<span class="goal-font">'+"分"+'</span>'
									+'</div>'
									+'</li>'



									+'</ul>'

							}
						

					
						$('.commissionList').append(result);

						for (var i = 0; i < $('.commission_wrap').length; i++) {
							var $findIM=$('.commission_wrap').eq(i);
							var findIMG_qjd=$('.commission_wrap').eq(i).attr("isFlagship");
							var findImg_rz=$('.commission_wrap').eq(i).attr("isAuth");
							if (findIMG_qjd==1&&findImg_rz==1) {
								$('.brokerNameList').eq(i).css("max-width","3rem");
							}else if(findIMG_qjd==0&&findImg_rz==1){
								$('.brokerNameList').eq(i).css("max-width","3.5rem");
							}else if (findIMG_qjd==1&&findImg_rz==0){
								$('.brokerNameList').eq(i).css("max-width","3.5rem");
							}
						}
						
						for (var i = 0; i < $('.resultgg').length; i++) {
							if ($('.resultgg').eq(i).html()=="") {
								$('.resultgg').eq(i).hide();
							}
							if($('.keyWordsList').eq(i).html()==""){
								$('.commission_middle').eq(i).css("margin-top","0.3rem");
								$('.goal').eq(i).css("top","0.4rem");
							}
						}
						
						$("img.lazy").lazyload();

		                $.each(needToGetAd,function(key,val){
                              BAIDU_CLB_fillSlot(val, "ad-broke"+key);
							    
						});

						
                        if(isLock){
							// 锁定
							me.lock();
							// 无数据
							me.noData();
							
						}

						for (var i = 0; i < $('.keyWordsList').length; i++) {
							$('.keyWordsList').eq(i).find('span').eq(0).show();
							$('.keyWordsList').eq(i).find('span').eq(1).show();
							$('.keyWordsList').eq(i).find('span').eq(2).show();
							if ($('.euData1').eq(i).html()=="") {
								$('.euData1').eq(i).html("暂无");
							}
							if ($('.euData2').eq(i).html()=="") {
								$('.euData2').eq(i).html("暂无");
								$('.bfh').eq(i).hide();
							}
							if ($('.commission_wrap').eq(i).attr("isStick")!=1) {
								$('.tj').eq(i).hide();
							}
							// 认证
							if ($('.commission_wrap').eq(i).attr("isAuth")!=1) {
								$('.rz').eq(i).hide();
							}
							if ($('.commission_wrap').eq(i).attr("isFlagship")!=1) {
								$('.qjd').eq(i).hide();
							}else if ($('.commission_wrap').eq(i).attr("isFlagship")==1) {
								$('.brokerNameList').eq(i).css("color","#ff8e00")
							}
							if ($('.tile_img img').eq(i).attr("src")==null||$('.tile_img img').eq(i).attr("src")==undefined || $('.tile_img img').eq(i).attr("src")=="") {
								$('.tile_img img').eq(i).attr("src","../img/img_app/liebiao@2x.png");
							}
						}
						$('.commission_wrap').unbind("click");
						$('.commission_wrap').on('click',function(){
							var imgURL=$(this).find($('.tile_img img')).attr("src");
							var title=$(this).find($('.brokerNameList')).html();
							var id=$(this).attr("userid");
							var jsonObj={
							      imgURL:imgURL,//0:不分享 1:分享
								  title:title,
								  id:id,
								  url:baseUrl+"/app/newinner.html",
							   };

							var jsonStr=JSON.stringify(jsonObj);
							getDetail(jsonStr);
							
						})
						
						me.resetload();
						

					}
	

		       
		    });
    	}
    })


    


}



// 点击展开更多
var conFontHeight=0;
function clickMore () {

	$('.zk-font').on("click",function(){
		if ($('.zk-font span').text()=="展开") {
			$(".con-font").animate({height:conFontHeight});
			$('.zk-font span').text("收起");
			$('.zk-font img').attr("src","../img/img_app/shouqi@2x.png");
		}else if ($('.zk-font span').text()=="收起") {
			$(".con-font").animate({height:0.65+"rem"});
			$('.zk-font span').text("展开");
			$('.zk-font img').attr("src","../img/img_app/zhankai@2x.png");
		}								
	})
}

// 点击广告
function clickAdv (data){
	var last=JSON.stringify(data);
}

// 获取广告的 方法
function Advertisement (data) {
	var AdvertisementArr= [];
	AdvertisementArr=data.data.result;	
	var result="";	
	if (typeof AdvertisementArr!=undefined&&AdvertisementArr!=""&&AdvertisementArr!=null&&AdvertisementArr.length>0) {
		for (var i = 0; i < AdvertisementArr.length; i++) {
			if (AdvertisementArr[i].isExist==true) {
				$('.header').show();
				result+='<a href="###" triggerContent="'+AdvertisementArr[i].ad.triggerContent+'" materialType="'+AdvertisementArr[i].ad.materialType+'" sourceFrom="'+AdvertisementArr[i].ad.sourceFrom+'" adCodeId="'+AdvertisementArr[i].adCodeId+'" adShowUrl="'+AdvertisementArr[i].ad.adShowUrl+'" adContent="'+AdvertisementArr[i].ad.adContent+'" adTitle="'+AdvertisementArr[i].ad.adTitle+'" materialId="'+AdvertisementArr[i].ad.materialId+'" class="swiper-slide bannerSlide1">'
		                        +'<img src='+AdvertisementArr[i].ad.adShowUrl+'>' 
		                        +'<div class="bg_gg">'+AdvertisementArr[i].ad.tag+'</div>'                    
		                 +'</a>'
		                 
				}
			}
			$('.wrapper_ban').html(result);



			for (var i = 0; i < $('.bannerSlide1').length; i++) {
				var shoWadCodeId=$('.bannerSlide1').eq(i).attr("adCodeId");
				var showmaterialType=$('.bannerSlide1').eq(i).attr("materialType");
				var showsourceFrom=$('.bannerSlide1').eq(i).attr("sourceFrom");
				var materialId=$('.bannerSlide1').eq(i).attr("materialId");
				showAdvAjax(shoWadCodeId,showmaterialType,showsourceFrom,materialId);
			}

			// 点击广告获取属性传值
			$('.bannerSlide1').click(function(){
				var index=$(this).index();		
				var adc=$(this).attr("adCodeId");
				var mater=$(this).attr("materialType");
				var source=$(this).attr("sourceFrom");
				var triggerContent=$(this).attr("triggerContent");
				var adTitle=$(this).attr("adTitle");
				var adContent=$(this).attr("adContent");
				var adShowUrl=$(this).attr("adShowUrl");
				var materialId=$(this).attr("materialId")
				var jsonObjAdv={
				      "triggerContent":triggerContent,//0:不分享 1:分享
					  "adTitle":adTitle,
					  "adContent":adContent,
					  "adShowUrl":adShowUrl
					 
				   };
				var jsonStrAdv=JSON.stringify(jsonObjAdv); 
				clickAdvAjax(adc,mater,source,materialId);
				getAdvDetail(jsonStrAdv);
				

				
			});
			var swiper = new Swiper('.swiper-container1', {
		            pagination: '.swiper-pagination',
		            paginationClickable: true,
		            // loop : true,
		            // effect : 'fade',
		            autoplay: 3500,
		            autoplayDisableOnInteraction: false
		    });
	    }
}


// 获取本期之星ajax
function ajaxThisStar (){
	$.ajax({
        url: baseUrl2+"/comment/getRecBroker.json",
        dataType: "jsonp",
        type: "GET",
        data:{
        	
        },
        success: thisStar
       
    });

}
// 获取本期之星方法
function thisStar (data) {
	var thisStarArr=data.data;	
	if (typeof thisStarArr!=undefined&&thisStarArr!=""&&thisStarArr!=null) {
			$('.bgStar_Wrap').show();			
			var keyLen=thisStarArr.keyWords;
			var result="";
			for (var i = 0; i < keyLen.length; i++) {
				result+='<span>'+keyLen[i]+'</span>'
			}
			$('.mid_title').html(thisStarArr.brokerName);
			$('.tile-img img').attr("src",thisStarArr.logo);
			$('.reason').html(thisStarArr.reason);
			$('.biaoqian').html(result);
			$('.mid-star').attr("data-star",thisStarArr.level);
			conFontHeight= $('.reason').outerHeight();
			if (conFontHeight<=64) {
				$('.zk-font').hide();
			}
			// 判断星的背景图
			var myStar=$('.mid-star').attr("data-star");
			if (myStar==5) {
				$('.mid-star').css("background-position","0 0");
			}else if (myStar==4.5) {
				$('.mid-star').css("background-position","0 -0.34rem");
			}else if (myStar==4) {
				$('.mid-star').css("background-position","0 -0.68rem");
			}else if (myStar==3.5) {
				$('.mid-star').css("background-position","0 -1.02rem");
			}else if (myStar==3) {
				$('.mid-star').css("background-position","0 -1.36rem");
			}else if (myStar==2.5) {
				$('.mid-star').css("background-position","0 -1.7rem");
			}else if (myStar==2) {
				$('.mid-star').css("background-position","0 -2.04rem");
			}else if (myStar==1.5) {
				$('.mid-star').css("background-position","0 -2.38rem");
			}else if (myStar==1) {
				$('.mid-star').css("background-position","0 -2.72rem");
			}else if (myStar==0.5) {
				$('.mid-star').css("background-position","0 -3.06rem");
			}else if (myStar==0) {
				$('.mid-star').css("background-position","0 -3.4rem");
			}
			//点击本期之星
			$('.content_middle').click(function(){
				var thisObj={
				      imgURL:thisStarArr.logo,//0:不分享 1:分享
					  title:thisStarArr.brokerName,
					  id:thisStarArr.userId,
					  url:baseUrl+"/app/newinner.html",

				   };
				var jsonStr=JSON.stringify(thisObj);
				getDetail(jsonStr);
			})
	}

	
	
}

// 获取经纪商一览ajax方法
function ajaxcommission (){
	$.ajax({
        url: baseUrl2+"/comment/getBrokerList.json",
        dataType: "jsonp",
        type: "GET",
        data:{
        	"sortIndex":sortIndex,
        	"regulator":"",
        	"platformType":"",
        	"tradeMode":"",
        	"fundingMethod":"",
        	"regTimeIndex":"",
        	"keyWord":"",
        	"pageSize":20,
        	"pageNo":1
        },
        success: commission
  
    });

}


// 接收app的keyword
function getSearchData(keyWord){
	keyWords=keyWord
	initDropLoad();
}

// 接收排序参数
function getSortScreenData(b,str){
	$('.zh').html(str);
	if(sortIndex==b){

	}else{
		sortIndex=b;
		$('.commissionList').html("");
		//$('.dropload-down').remove();
		pageNo=1;
		pageSize=20;
		droploader.unlock();
		droploader.noData(false);
		droploader.resetload();
	}
}

// 接收筛选参数
function getScreenData(objScreen){
	$('.sx').css("color","#3285ea");
	$('.screen img').attr("src","../img/img_app/shaixuan1@2x.png");
	$('.dropload-down').show();
	var objScreenObj=objScreen;
	if (Screen==objScreen) {

	}else{
		Screen=objScreen;
		regulator=objScreenObj.regulator;//监管机构
		platformType=objScreenObj.platformType;//平台性质		
		tradeMode=objScreenObj.tradeMode;// 交易平台	
		fundingMethod=objScreenObj.fundingMethod;// 入金方式	
		regTimeIndex=objScreenObj.regTimeIndex;// 成立时间
		$('.commissionList').html("");
		pageNo=1;
		pageSize=20;
		droploader.unlock();
		droploader.noData(false);
		droploader.resetload();
	}
		
}



// js调安卓获取广告信息
function getDeviceInfo(){
    if (isiOS) {
	     window.webkit.messageHandlers.getDeviceInfo.postMessage("");
	}else if (isAndroid) {
	     window.SysClientJs.getDeviceInfo();
	}

}

// 接收广告信息
function getDeviceInformation(informStr) {
	var dataObj=informStr;
	brand=dataObj.brand;
	t=dataObj.t;
	ua=dataObj.ua;
	ip=dataObj.ip;
	sw=dataObj.sw;
	sh=dataObj.sh;
	make=dataObj.make;
	model=dataObj.model;
	ose=dataObj.os;
	osv=dataObj.osv;
	did=dataObj.did;
	mac=dataObj.mac;
	adid=dataObj.adid;
	carrier=dataObj.carrier;
	connectiontype=dataObj.connectiontype;
	devicetype=dataObj.devicetype;
	osvVersion=dataObj.osvVersion;
	appCategory=dataObj.appCategory;
	appVersion=dataObj.appVersion;
	// localStorage.app_v=appVersion;

	Advertisementajax();
}
// 点击经纪商列表传参数
function getDetail(str){
	if (isiOS) {
	    window.webkit.messageHandlers.intoDetail.postMessage(str);
	}else if (isAndroid) {
	    window.SysClientJs.intoDetail(str);
	}
}

// 

//点击新闻传参
function getAdvDetail(str){
	if (isiOS) {
	     window.webkit.messageHandlers.intoAdvDetail.postMessage(str);
	}else if (isAndroid) {
	     window.SysClientJs.intoAdvDetail(str);
	}
}
// 综合排序
function getSortComplex(){
	if (isiOS) {
       	window.webkit.messageHandlers.getSortComplex.postMessage("");
	}else if (isAndroid) {
	    window.SysClientJs.getSortComplex();
	}
}

// 综合筛选
function getScreen(){
	if (isiOS) {
       window.webkit.messageHandlers.getScreen.postMessage("");
	}else if (isAndroid) {
	    window.SysClientJs.getScreen();
	}
}


function getSampleAdData(){
	var m='{"ua":"Mozilla\/5.0 (Linux; Android 6.0; Google Nexus 5 - 6.0.0 - API 23 - 1080x1920 Build\/MRA58K; wv) AppleWebKit\/537.36 (KHTML, like Gecko) Version\/4.0 Chrome\/44.0.2403.119 Mobile Safari\/537.36","ip":"10.0.3.15","sw":"1080","sh":"1776","make":"Genymotion","model":"Google Nexus 5 - 6.0.0 - API 23 - 1080x1920","os":"2","osv":"6.0","did":"000000000000000","mac":"02:00:00:00:00:00","adid":"7a8011ac201aaf5f","carrier":"31026","connectiontype":"1","devicetype":"1","t":"7C74AECDBECEDC87C3CF0E3E84529533","appCategory":"android","appVersion":"3.2"}';
	getDeviceInformation(JSON.parse(m));
}

// 搜索地址
function getSearchUrl (){
	if (isiOS) {
		
	    window.webkit.messageHandlers.getSearchUrl.postMessage(baseUrl+"/app/search.html");

	}else if (isAndroid) {
	    window.SysClientJs.getSearchUrl(baseUrl+"/app/search.html");

	}

}