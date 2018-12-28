import "./js/public.js"
import "./css/error.scss";

window.Promise = Promise

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

delay(1000).then((value) => {
  console.log(value);
});
