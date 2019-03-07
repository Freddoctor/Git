// 加入两个nextTick()的回调函数
process.nextTick(function() {
  console.log('nextTick延迟执行1');
});
process.nextTick(function() {
  console.log('nextTick延迟执行2');
});
// 加入两个setImmediate()的回调函数
setImmediate(function() {
  console.log('setImmediate延迟执行1');
  // 进入下次循环
  process.nextTick(function() {
    console.log('强势插入');
  });
});
setImmediate(function() {
  console.log('setImmediate延迟执行2');
});
setTimeout(function() {
  console.log("setTimeout 延迟执行")
})
console.log('正常执行');

var toString = Object.prototype.toString;

var isString = function(obj) {
  return toString.call(obj) == '[object String]';
};

var isFunction = function(obj) {
  return toString.call(obj) == '[object Function]';
};

var isArray = function(obj) {
  return toString.call(obj) == '[object Array]';
};
