(function requireMustache(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    // For CommonJS environments
    module.exports = factory(global);
  } else if (typeof define === 'function' && define.amd) {
    // For AMD environments
    define(factory(global))
  } else {
    factory(global);
  }
})(this, function commonRequire(mustache) {
  'use strict';
  mustache.name = "touch elastic";
  mustache.version = "1.0.0";

  return mustache;
});
