// 交易员风采
$(function(){
	initDetailInfoTabContent() 
});
function initDetailInfoTabContent(){
   $.ajax({
	     url: baseUrl2+'/comment/getAgentTraderList.json',
	     type: 'GET',
	     dataType: 'JSONP',
	     data: {agentName: 'followme'},
	     success:function(data){
	     	console.log(data);
		      console.log(data.status);
		      var arr=data.data.traderList;
		      var result="";
		      if (arr!=undefined || arr.length>0 || arr!="" || arr!=null || data.status!=400) {
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
				                          +'<img class="nick_header lazy" data-original="https://www.followme.com/Avata/'+arr[i].userId+'" src="../img/img_app/touxiang@2x.png" />'
				                    +'</li>'
				                    +'<li class="headerNick">'
				                          +'<div class="nick_name">'+arr[i].nickName+'</div>'
				                          +'<div>'
				                              +'<span class="_elWrap">'
				                                    +'<span>'+"粉丝数："+'</span>'
				                                    +'<span>'+arr[i].orders+'</span>'
				                              +'</span>'
				                              +'<span>'
				                                    +'<span>'+"盈亏点数："+'</span>'
				                                    +'<span>'+arr[i].bizPoint+'</span>'
				                              +'</span>'

				                          +'</div>'
				                          +'<div>'
				                              +'<span class="_elWrap">'
				                                    +'<span>'+"订单数："+'</span>'
				                                    +'<span>'+arr[i].foucsCount+'</span>'
				                              +'</span>'
				                              +'<span>'
				                                    +'<span>'+"交易周期："+'</span>'
				                                    +'<span>'+arr[i].weeks+'</span>'
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
