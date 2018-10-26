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
  $("#setting-theme").toggle();
})

$("#setting-theme li").each(function(i) {
  $(this).click(settingTheme.bind($(this)))
})

function settingTheme() {
  var fontsize, theme, keybinding;
  fontsize = $(this).data("fontsize");
  theme = $(this).data("theme");
  keybinding = $(this).data("keybinding");
  if (fontsize) {
    editor.setFontSize(config[fontsize]);
    $(this).addClass("active").siblings(".fontsize").removeClass("active");
  }
  if (theme) {
    editor.setTheme(config[theme]);
    $(this).addClass("active").siblings(".theme").removeClass("active");
  }
  if (keybinding) {
    editor.setKeyboardHandler(config[keybinding]);
    $(this).addClass("active").siblings(".keybinding").removeClass("active");
  }
}
