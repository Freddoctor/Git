$(function() {
	newsRequest();
    dbClick();
});

function newsRequest(){
	$.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url:baseUrl2+"/h5/news/getNews.json",
        data:{
            "newsId":getUrlParam('newsId')
        },
        success:function(data){
        	var arr=data.data.result;
            var publishTime=arr.publishTime.substring(0,16);
        	$('.news_con').html(arr.newsHtmlContent);
        	$(".newsTitle").html(arr.newsTitle);
        	$(".author").html(arr.editor);
        	$(".clickNum").html(arr.clickNum);
        	$(".pub_dates").html(publishTime);
        	$(".source").html(arr.newsSource);
        }
    });
}

// 获取url
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
};

function dbClick(){
     var lastClickTime = 0;
        var clickTimer;
        document.addEventListener('click', (event) => {
            var nowTime = new Date().getTime();
            if (nowTime - lastClickTime < 400) {
                /*双击*/
                lastClickTime = 0;
                clickTimer && clearTimeout(clickTimer);
                alert('双击');
                window.webkit.messageHandlers.doubleTapGesture.postMessage("");
                
            } else {
                /*单击*/
                lastClickTime = nowTime;
                clickTimer = setTimeout(() => {
                    // alert('单击');
                }, 400);
            }
        });
}