function App() {
  111111
}

function App3() {
  223234234
}

function App4() {
  99999
}
// console.log(getPropertyNames(this));
function getPropertyNames(obj) {
  var props = {};
  while (obj) {
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}

module.exports = window;
