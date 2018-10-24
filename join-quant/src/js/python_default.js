ace.define("ace/mode/drools_highlight_rules", function(require, exports, module) {
  "use strict";
  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
  var DroolsHighlightRules = function() {
    var keywords = (
      "and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
      "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
      "raise|return|try|while|with|yield|async|await"
    );
    var builtinConstants = (
      "True|False|None|NotImplemented|Ellipsis|__debug__"
    );
    var builtinFunctions = (
      "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
      "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
      "binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
      "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
      "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
      "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
      "__import__|complex|hash|min|set|apply|delattr|help|next|setattr|" +
      "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|except|test|after_code_changed|context"
    );
    var keywordMapper = this.createKeywordMapper({
      "invalid.deprecated": "debugger",
      "support.function": builtinFunctions,
      "variable.language": "self|cls",
      "constant.language": builtinConstants,
      "keyword": keywords
    }, "identifier");
    this.$rules = {
      "start": [{
        token: keywordMapper,
        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
      }]
    };
  };
  oop.inherits(DroolsHighlightRules, TextHighlightRules);
  exports.DroolsHighlightRules = DroolsHighlightRules;
});

//折叠
ace.define("ace/mode/folding/drools_fold", function(require, exports, module) {
  "use strict";
  var Range = require("../../range").Range;
  var FoldMode = exports.FoldMode = function() {};
  (function() {
    var _this = this;
    this.endRow = 0;
    this.startColumn = 0;
    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.getFoldWidget = function(session, foldStyle, row) {
      var line = session.getLine(row);
      if (line.match(_this.foldingStartMarker)) {
        _this.startColumn = line.length
        return "start";
      }
      if (line.match(_this.foldingStopMarker)) {
        _this.endRow = row;
      }
      return "";
    };
    this.getFoldWidgetRange = function(session, foldStyle, row) {
      console.warn(session, foldStyle, row);
      var startRow = row,
        startColumn = 4;
      var endRow = row + 1,
        endColumn = 3;
      var line = session.getLine(endRow);
      //new Range(Number startRow, Number startColumn, Number endRow, Number endColumn)
      while (!session.getLine(endRow).match(_this.foldingStopMarker)) {
        endRow += 1;
        if (endRow > _this.endRow) break;
      }
      return new Range(startRow, startColumn, endRow, endColumn);
    };
  }).call(FoldMode.prototype);
});

ace.define("ace/mode/drools", function(require, exports, module) {
  "use strict";
  var oop = require("../lib/oop");
  var TextMode = require("./text").Mode;
  var DroolsHighlightRules = require("./drools_highlight_rules").DroolsHighlightRules;
  var DroolsFoldMode = require("ace/mode/folding/drools_fold").FoldMode;
  var DroolsMode = function() {
    this.HighlightRules = DroolsHighlightRules;
    this.foldingRules = new DroolsFoldMode();
  };
  oop.inherits(DroolsMode, TextMode);
  (function() {
    this.$id = "ace/mode/drools"
  }).call(DroolsMode.prototype);
  (function() {
    this.getNextLineIndent = function(state, line, tab) {
      var indent = this.$getIndent(line);
      if (state == "start") {
        var match = line.match(/^.*[\{\(\[]\s*$/); // 如果是{[(结尾的，那么下一行的缩进加一
        if (match) {
          indent += tab;
        }
      }
      return indent;
    };
  }).call(DroolsMode.prototype);
  exports.Mode = DroolsMode;
});
