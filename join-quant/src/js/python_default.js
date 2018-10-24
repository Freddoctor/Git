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

ace.define("ace/mode/drools", function(require, exports, module) {
  "use strict";
  var oop = require("../lib/oop");
  var TextMode = require("./text").Mode;
  var DroolsHighlightRules = require("./drools_highlight_rules").DroolsHighlightRules;
  var DroolsMode = function() {
    this.HighlightRules = DroolsHighlightRules;
  };
  oop.inherits(DroolsMode, TextMode);
  (function() {
    this.$id = "ace/mode/drools"
  }).call(DroolsMode.prototype),
    exports.Mode = DroolsMode;
});
