import "jquery";
import "./css/home.css"
var template = require("./asset/handlebars.hbs");
document.addEventListener("DOMContentLoaded", function() {
  var div = document.createElement('div');
  div.innerHTML = template({
    images: {
      index: require("./img/img_h5_v.2.0/shouye1@2x.png"),
      news: require("./img/zixun.png"),
      sudi: require("./img/sudi.png"),
      quote: require("./img/hangqing.png"),
      calendar: require("./img/cjrl.png"),
    }
  });
  document.body.appendChild(div);
});
