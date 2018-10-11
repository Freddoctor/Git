import "jquery";
import {
  sckUrl1,
  sckUrl2,
  socketUrlArr,
  sudiUrlArr,
  baseUrl,
  baseUrlHost,
  socketUrl,
  searchUrl,
  index_socket
} from "./common.js";
import "./jquery.lazyload.min.js";


$(function() {
  // 初始化导航栏
  initTabInfo();
  // 专题列表
  inintZtList();
  //市场进展选中
  selectBlue();

  closeTopBanner();
  $('.close').click()
})
// sessionStorage.zhuanTiId=4668;
// 点击隐藏首页头部app下载
function closeTopBanner() {
  $('.close').click(function() {
    $('.wrap').hide();
    $('.nav-container').css("top", 0);
    $('.moudle').css("height", "0");
    $('.second_tab_top').css('top', '0.81rem');
  })
}

//市场进展选中
function selectBlue() {
  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    if (scrollTop == 0) {
      $('.blue').addClass('selected2');
    } else {
      $('.blue').removeClass('selected2');
    }

  })
}


var scr1 = null,
  scr2 = null,
  scr3 = null;
//当窗口加载完成获取各个栏目top值
window.onload = function() {
  //$('body').show();
  //最新进度、市场反应、市场声音距离顶部高度
  scr1 = $('.second_tab_first').offset().top - 179;
  scr2 = $('.second_tab_second').offset().top - 179;
  scr3 = $('.second_tab_third').offset().top - 179;
  $(window).scroll(function() {
    var scroll = $(document).scrollTop();
    if (scroll >= scr1 || scroll >= scr2 || scroll >= scr3) {
      $('.second_tab_top').show();
    } else {
      $('.second_tab_top').hide();
    }
    if (scroll >= scr1 && scroll <= scr2) {
      $('.top_ft').html($('.second_tab_first span').html())
    } else if (scroll >= scr2 && scroll <= scr3) {
      $('.top_ft').html($('.second_tab_second span').html());
    } else if (scroll >= scr3) {
      $('.top_ft').html($('.second_tab_third span').html());
    }

  })

}



// 初始化导航栏
function initTabInfo() {
  //点击选中tab
  $('.tabNav').click(function(e) {
    var index = $(this).index();
    e.preventDefault();
    // console.log(index);
    $('.tabNav a').removeClass('selected');
    $(this).find($('a')).addClass('selected');
  });
}

// 初始化专题列表
function inintZtList() {
  $.ajax({
    type: 'GET',
    url: baseUrl + "zhuanti/getZhuantiContent.json",
    // url:baseUrl+"zhuanti/getZhuantiContent.json",
    data: {
      zhuantiId: sessionStorage.zhuanTiId
    },

    dataType: 'jsonp',
    success: inintZtList_success

  });
}

function inintZtList_success(data) {
  $('.upWrap').css("display", "none");
  // console.log(data);
  var arr = data.data;
  $('.top_img').attr("src", arr.zhuanti.image);
  $('.font_zy').html(arr.zhuanti.content);
  for (var i = 0; i < $('.tabNav a').length; i++) {
    $('.tabNav a').eq(i).html(arr.zhuantiContent[i].desc);
    $('.second_tab_continar span').eq(i).html(arr.zhuantiContent[i].desc);
  }
  // 事件进展
  inintAllZtList(data, 0, ".second_con_first");
  //市场反应
  inintAllZtList(data, 1, ".second_con_second");
  //市场声音
  inintAllZtList(data, 2, ".second_con_third");

}

// 初始化三个事件列表
function inintAllZtList(data, index, continar) {
  var arr = data.data;
  var eventEvolve = arr.zhuantiContent[index].newList;
  var result = "";
  for (var i = 0; i < eventEvolve.length; i++) {
    var substr = eventEvolve[i].publishTime.substring(5, 16);
    var substr_title = eventEvolve[i].newsTitle.substring(0, 28);
    eventEvolve[i].publishTime = substr;
    eventEvolve[i].newsTitle = substr_title;
    result += '<a class="oli2" href="/active/article/' + eventEvolve[i].id + '.html" data_newID="' + eventEvolve[i].id + '">' +
      '<img class="newImg lazy" data-original="' + eventEvolve[i].image + '" src="' + "" + require("../img/newPic@2x.png") + '" alt="">' +
      '<div class="odiv">' +
      '<div class="newsTitle">' +
      '<p class="news_tile_p">' + eventEvolve[i].newsTitle + '</p>' +
      '<div class="new_bt">' +
      '<p class="new_bt_p1">' +
      '<img class="clickimg" src="' + "" + require("../img/lll@2x.png") + '"/>' +
      eventEvolve[i].clickNum +
      '</p>' +
      '<p class="new_bt_p2">' + eventEvolve[i].publishTime + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</a>';
  }
  $(continar).append(result);
  $("img.lazy").lazyload();
}
