class GetInfo {
  constructor(time) {
    this.time = time;
  }
  currentTime(play) {
    return new Promise((resolve, reject) => {
      if (typeof play == "function") {
        setInterval(() => {
          resolve(play());
        }, 1000);
      }
    })
  }
}

module.exports = GetInfo;
