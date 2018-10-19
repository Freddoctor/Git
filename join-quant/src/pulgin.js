(function defineMustache(global, factory) {
    if (typeof exports === "object" && exports && typeof exports.nodeName !== "string") {
        factory(exports)
    } else if (typeof define === "function" && define.amd) {
        define(["exports"], factory)
    } else {
        global.Mustache = {};
        factory(global.Mustache)
    }
}
)(this, function mustacheFactory(mustache) {
    mustache.name = "mustache.js";
    mustache.version = "2.3.0";
    mustache.tags = ["{{", "}}"];
    return mustache;
});
