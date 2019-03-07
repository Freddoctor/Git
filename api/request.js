const http = require('http');
const querystring = require('querystring');
const url = require("url");
const fs = require("fs");
const path = require("path");

function ExpressApp() {
  this.http = http;
  this.server = null;
  this._get = {};
  this._post = {};
  this.root = []; //静态资源目录
  this.createServer();
}

ExpressApp.prototype.createServer = function() {
  this.server = this.http.createServer(this.requestServer.bind(this));
  return this;
}

ExpressApp.prototype.requestServer = function(req, res) {
  const _this = this;
  changeRes.call(_this, res);
  var pathname = url.parse(req.url).pathname;
  pathname = stringRealize(pathname);
  var method = req.method.toLowerCase();
  if (method == 'get' && _this['_' + method][pathname]) {
    _this["_" + method][pathname](req, res); /*执行方法*/
  }
  if (method == 'get' && _this.root.length) {
    UseStatic.call(this, _this.root, req, res);
  }
  if (method == 'post' && _this['_' + method][pathname]) { /*执行post请求*/
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function(err, chunk) { //添加请求属性
      req.body = querystring.parse(body); /*表示拿到post的值*/ /*执行方法*/
      _this['_' + method][pathname](req, res);
    })
  }
  return this;
}

ExpressApp.prototype.static = function(root) {
  this.root.push(root);
  return this;
}

ExpressApp.prototype.listen = function(port, callback) {
  if (typeof callback == 'function') {
    this.server.listen(port || 80, callback)
  } else {
    this.server.listen(port || 80);
  }
  return this;
}

ExpressApp.prototype.get = function(string, callback) { //注册多个get方法
  const _this = this;
  var str = stringRealize.call(this, string);
  if (typeof callback == 'function') {
    this._get[str] = callback;
  }
  return this;
}

ExpressApp.prototype.post = function(string, callback) { //注册多个post方法
  const _this = this;
  var str = stringRealize(string);
  if (typeof callback == 'function') {
    _this._post[str] = callback;
  }
  return this;
}

function changeRes(res) { //write response send allow Origin
  res.send = function(data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8"
    });
    res.end(data);
  }
}

function stringRealize(string) { //请求接口url统一化
  if (!string.startsWith('/')) {
    string = '/' + string;
  }
  if (!string.endsWith('/')) {
    string = string + '/';
  }
  return string;
}

function foreachRead(root, req, res) { //多目录资源读取
  var _this = this;
  root.forEach(function(item, index) {
    var pathname = __dirname + url.parse("/" + item + req.url).pathname; //资源指向public目录
    if (path.extname(pathname) == "") {
      pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
      pathname += "index.html";
    }
    fs.exists(pathname, function(exists) {
      if (exists) {
        switch (path.extname(pathname)) {
          case ".html":
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            break;
          case ".js":
            res.writeHead(200, {
              "Content-Type": "text/javascript"
            });
            break;
          case ".css":
            res.writeHead(200, {
              "Content-Type": "text/css"
            });
            break;
          case ".gif":
            res.writeHead(200, {
              "Content-Type": "image/gif"
            });
            break;
          case ".jpg":
            res.writeHead(200, {
              "Content-Type": "image/jpeg"
            });
            break;
          case ".png":
            res.writeHead(200, {
              "Content-Type": "image/png"
            });
            break;
        }
        fs.readFile(pathname, function(err, data) {
          res.end(data);
        });
      }
    });
  })
}

function UseStatic(root, req, res) { //默认设置静态目录
  var _this = this;
  foreachRead.call(this, root, req, res)
  return this;
}

module.exports = ExpressApp;

/*
 *
 * `api用法`
 *
 * const app = new ExpressApp(); 新建实例
 * app.static("public"); 创建静态目录
 *
 * app.get("/home", function(req, res) { get请求
 *   res.send(string);
 * }
 *
 *  app.post("/submit", function(req, res) {post 请求
 *    res.send(JSON.stringify(req.body));
 * }
 *
 * app.listen(80) //端口号创建
 */
