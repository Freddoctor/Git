$(document).ready(function() {
  // 轮播图
  var parsom = {

  };
  $.ajax({
    url: baseUrl + "news/getFocusNewsBanner.json?channelId=1&appType=0&8EEC5E2BCDAEF8D194C9C69B43A1473C",
    dataType: "jsonp",
    type: "GET",
    data: parsom,
    success: getBannerData
  });

  // // 轮播图回调
  function getBannerData(data) {
    var bannerArr = [];
    var bannerIdArr = [];
    var length = "";
    var resBannerImage = "";
    for (var i = 0; i < data.data.pager.result.length; i++) {
      var length = data.data.pager.result.length;
      var banner_src = data.data.pager.result[i].image;
      bannerArr.push(banner_src);
      var bannerId = data.data.pager.result[i].id;
      bannerIdArr.push(bannerId);
      resBannerImage += '<a href="newContent.html" class="swiper-slide bannerSlide1" bannerId="' + bannerId + '">' +
        '<img src="' + require("../img/newPic@2x.png") + '">' +
        '<div class="slide_font">' +
        '<span>' + '</span>'
        +
        '</div>' +
        '</a>'
    }
    $('.wrapper_ban').html(resBannerImage);
    for (var i = 0; i < $(".wrapper_ban .swiper-slide").length; i++) {
      $(".wrapper_ban .swiper-slide img").eq(i).attr("src", bannerArr[i]);
      $(".slide_font span").eq(i).html(data.data.pager.result[i].newsTitle);
    }
    var swiper = new Swiper('.swiper-container1', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      // loop : true,
      effect: 'fade',
      autoplay: 3500,
      autoplayDisableOnInteraction: false
    });
    var newsIdIndex = null;

    $('.wrapper_ban a').click(function() {
      newsIdIndex = $(this).attr("bannerId");
      var newsIdURL = baseUrl + "/news/getNews.json?newsId=" + newsIdIndex;

      localStorage.newsIdURLIndex = newsIdURL;
    })
  }

});
