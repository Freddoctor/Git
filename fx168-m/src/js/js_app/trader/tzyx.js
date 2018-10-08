$(function(){
	initDetailInfoTabContent() 
});


function initDetailInfoTabContent() {

	 $.ajax({
	    url: 'http://t.fx168.com/Handler/GetRankD.ashx?pageindex=1&pagesize=5&desctype=3&callback',
	    type: 'GET',
	    dataType: 'JSONP',
	    data: {},
	    success:function(data){
	    	// console.log(data);
		      var arr=data.data;
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
			                          +'<img class="nick_header lazy" data-original="'+arr[i].imgurl+'" src="../img/img_app/touxiang@2x.png" />'
			                    +'</li>'
			                    +'<li class="headerNick">'
			                          +'<div class="nick_name">'+arr[i].nickname+'</div>'
			                          +'<div>'
			                              +'<span class="_elWrap">'
			                                    +'<span>'+"粉丝数："+'</span>'
			                                    +'<span>'+arr[i].followcount+'</span>'
			                              +'</span>'
			                              +'<span>'
			                                    +'<span>'+"总盈利："+'</span>'
			                                    +'<span>'+arr[i].totalprofit+'</span>'
			                              +'</span>'

			                          +'</div>'
			                          +'<div>'
			                              +'<span class="_elWrap">'
			                                    +'<span>'+"回撤率："+'</span>'
			                                    +'<span>'+arr[i].retardratio+'</span>'
			                              +'</span>'
			                              +'<span>'
			                                    +'<span>'+"胜率："+'</span>'
			                                    +'<span>'+arr[i].winratio+'</span>'
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