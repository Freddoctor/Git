import "../css/bootstrap-markdown-editor.css"
import "../css/b.scss"

import pulgin from "./pulgin.js";
import marked from "./markdown.js";

var editor = ace.edit("editor");
var editorValue = "";
var data = [{
  key:"test",
  meta: "function test(a,b)",
  value: "test(a,b)",
  score: 100
},
{
  key:"after_code_changed",
  meta: "function after_code_changed(context)",
  value: "after_code_changed(context)",
  score: 101
}];

editor.setTheme("ace/theme/monokai"); //monokai 主题
editor.setFontSize(16);
editor.setValue(editorValue, 1);
editor.setShowPrintMargin(true);

var langTools = ace.require("ace/ext/language_tools"); //扩展语言包
langTools.addCompleter({
  getCompletions: function(editor, session, pos, prefix, callback) {
    if (prefix.length === 0) {
      return callback(null, []);
    } else {
      return callback(null, data);
    }
  }
});

import python from "./python-ace.js";
editor.getSession().setMode("ace/mode/pythonace"); //自定义语法高亮

editor.getSession().setUseWrapMode(true);
editor.getSession().setUseWorker(false);

editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: false,
  enableLiveAutocompletion: true, //补全代码
});

editor.session.on('change', function(delta) {
  // console.log(editor.getValue())
})

/*
 * TODO: ctrl + s屏蔽
 */
document.addEventListener('keydown', function(event) {
  var e = window.event || event;
  var keycode = e.keyCode || e.which;
  if (e.ctrlKey && keycode == 83) {
    e.preventDefault();
    window.event.returnValue = false;
  }
})

/*
 * TODO: 时间展示
 */
// import moment from 'moment';
// var timeElement = $("#time time");
// setInterval(function() {
//   timeElement.html(moment().format('YYYY-MM-DD HH:mm:ss'));
// }, 1000)
