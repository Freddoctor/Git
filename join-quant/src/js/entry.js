import plugin from "../plugin/common.js";
import "../css/bootstrap-markdown-editor.css"
import "../css/b.scss"
import moment from 'moment';
import pulgin from "./pulgin.js";
var langTools = ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");

console.log(pulgin)
var editorValue = "";
var data = [{
  meta: "描述文字",
  caption: "zero",
  value: "zero",
  score: 1,
  token: "identifier",
  regex: "settings|options|global|user"
}];

editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: false,
  enableLiveAutocompletion: true, //补全代码
});
editor.setTheme("ace/theme/monokai"); //monokai 主题
editor.getSession().setMode("ace/mode/javascript"); //程序语言
editor.setFontSize(16);
editor.setValue(editorValue);
editor.setShowPrintMargin(true);
editor.session.on('change', function(delta) {
  console.log(editor.getValue())
})
langTools.addCompleter({ ///插入函数库
  getCompletions: function(editor, session, pos, prefix, callback) {
    if (prefix.length === 0) {
      return callback(null, []);
    } else {
      return callback(null, data);
    }
  }
});

document.addEventListener('keydown', function(event) {
  var e = window.event || event;
  var keycode = e.keyCode || e.which;
  if (e.ctrlKey && keycode == 83) {
    //Ctrl + S
    e.preventDefault();
    window.event.returnValue = false;
  }
})

var timeElement = $("#time time");
setInterval(function() {
  timeElement.html(moment().format('YYYY-MM-DD HH:mm:ss'));
}, 1000)
