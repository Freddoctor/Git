var editor = ace.edit("editor");

var config = {
  small: 12,
  middle: 16,
  big: 20,
  eclipse: "ace/theme/eclipse",
  monokai: "ace/theme/monokai",
  github: "ace/theme/github",
  default: "",
  emacs: "ace/keyboard/emacs"
}

$(".pull-options").on("click", ".setting-btn", function() {
  $("#setting-theme").toggle();
  return false;
})

$("body").on("click", function(e) {
  $("#setting-theme").hide();
})

$("#setting-theme li").each(function(i) {
  $(this).click(settingTheme.bind($(this)))
})

$("input").on("input propertychange", function() {

});

function settingTheme() {
  var fontsize = $(this).data("fontsize"),
    theme = $(this).data("theme"),
    keybinding = $(this).data("keybinding"),
    fullscreen = $(this).data("fullscreen");
  fontsize && setFont($(this), fontsize);
  theme && setThemes($(this), theme);
  keybinding && setKeybind($(this), keybinding);
  fullscreen && toggleScreen();
}

function setKeybind(elem, keybinding) {
  editor.setKeyboardHandler(config[keybinding]);
  elem.addClass("active").siblings(".keybinding").removeClass("active");
}

function setThemes(elem, theme) {
  editor.setTheme(config[theme]);
  elem.addClass("active").siblings(".theme").removeClass("active");
}

function setFont(elem, fontsize) {
  editor.setFontSize(config[fontsize]);
  elem.addClass("active").siblings(".fontsize").removeClass("active");
}

function toggleScreen() {
  if (document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement) {
    ExitScreen();
  } else {
    FullScreen();
  }
}

function FullScreen() {
  var docElm = document.documentElement;
  var api = ["requestFullscreen", "mozRequestFullScreen", "webkitRequestFullScreen", "msRequestFullscreen"];
  for (var i = 0; i < api.length; i++) {
    if (docElm[api[i]] && docElm[api[i]]()) break;
  }
}

function ExitScreen() {
  var api = ["exitFullscreen", "mozCancelFullScreen", "webkitCancelFullScreen", "msExitFullscreen"];
  for (var i = 0; i < api.length; i++) {
    if (document[api[i]] && document[api[i]]()) break;
  }
}

/*
 * 微信端引入
 */
import wx from "../plugin/weixin-plugin.js";
wx.wxShare("微信测试", "试试", "https://m.fx168.com", "https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png")
