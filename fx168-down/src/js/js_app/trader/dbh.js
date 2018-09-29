$(function(){
	initDetailInfoTabContent() 
});
function initDetailInfoTabContent() {
		 $.ajax({
		    url: 'http://app3.dbhapp.com/api/app/data/getSourceSignalIfoData.json',
		    type: 'GET',
		    dataType: 'JSONP',
		    crossDomain: true,
	        jsonp: "callback",
	        jsonpCallback: "callback",
		    data: {},
		   	success:function(data){
		    	// console.log(data);
			      var arr=data;
			      var result="";
			      if (data!=undefined&&arr.length>0) {
				      for (var i = 0; i < (arr.length > 5 ? 5 : arr.length); i++) {
				        var elSortNum="";
				        if (i<=2) {
				          elSortNum='<img class="sort_nums" src="../img/img_app/sort'+i+'.png" />'
				        }else{
				          elSortNum='<span class="sort_tol">'+(i+1)+'</span>'
				        }

				        result+='<ul class="list_jyfc">'
				                    +'<li class="elSortNum">'
				                          +'<span>'+elSortNum+'</span>'
				                          +'<img class="nick_header lazy" data-original="'+arr[i].headPic+'" src="../img/img_app/touxiang@2x.png" />'
				                    +'</li>'
				                    +'<li class="headerNick">'
				                          +'<div class="nick_name">'+arr[i].signalSourceName+'</div>'
				                          +'<div>'
				                              +'<span class="_elWrap">'
				                                    +'<span>'+"交易周期："+'</span>'
				                                    +'<span>'+arr[i].allTradeTime+"周"+'</span>'
				                              +'</span>'
				                              +'<span>'
				                                    +'<span>'+"总盈利率："+'</span>'
				                                    +'<span>'+arr[i].sumrate+'</span>'
				                              +'</span>'

				                          +'</div>'
				                          +'<div>'
				                              +'<span class="_elWrap">'
				                                    +'<span>'+"回撤率："+'</span>'
				                                    +'<span>'+arr[i].maxWithdrawal+'</span>'
				                              +'</span>'
				                              +'<span>'
				                                    +'<span>'+"月盈利率："+'</span>'
				                                    +'<span>'+arr[i].prevmonthrate+'</span>'
				                              +'</span>'
				                          +'</div>'
				                    +'</li>'
				              +'</ul>'
				      }
				      $('.detailInfoChild').html(result);
				      $("img.lazy").lazyload();
			      }else{
				      	var  noDataImg='<div class="noImgWrap">'
			                               +'<img src="../img/img_app/zanwu@2x.png" />'
			                               +'<p>'+"当前暂无交易员风采"+'<p/>'
			                          +'<div/>'
			            $('.detailInfoChild').html(noDataImg);
		      }
		    },
		   	error:function(){
		   		var  noDataImg='<div class="noImgWrap">'
			                               +'<img src="../img/img_app/zanwu@2x.png" />'
			                               +'<p>'+"当前暂无交易员风采"+'<p/>'
			                          +'<div/>'
			    $('.detailInfoChild').html(noDataImg);
		    }
		 })
	}