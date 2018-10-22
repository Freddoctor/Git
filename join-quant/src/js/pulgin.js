(function defineMustache(global, factory) {
  if (typeof exports === "object" && exports && typeof exports.nodeName !== "string") {
    module.exports = factory(global);
  } else if (typeof define === "function" && define.amd) {
    define(factory(global))
  } else {
    global.Appsupport = {};
    factory(global.Appsupport)
  }
})(this, function mustacheFactory(mustache) {
  mustache.name = "mustache.js";
  mustache.version = "2.3.0";
  mustache.tags = ["{{", "}}"];
  mustache.app_link = function() {
    return true
  };
  for (var i in mustache) {
    if (/^app.*$/.test(i)) {
      window[i] = mustache[i];
    }
  }
  return mustache;
});
