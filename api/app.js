var ExpressApp = require("./request.js");

var MongodbConnect = require("./sql.js");

const app = new ExpressApp();

const url = "mongodb://localhost:27017";

var mongo = new MongodbConnect(url, "websit");
// mongo.createCollection("websit_user"); //创建新表
app.static("public");

app.static("web");

app.get("/home", function(req, res) {
  mongo.find("websit_user", {}, function(result) {
    var string = JSON.stringify({
      status: 0,
      type: "object",
      msg: "success",
      data: {
        result: result
      }
    });
    console.log(`${JSON.stringify(result)} received success`);
    res.send(string);
  });
});

app.post("/submit", function(req, res) {
  let string = JSON.stringify({
    code: 200,
    msg: "注册成功"
  });
  mongo.insertOne("websit_user", req.body, function(result) {
    console.log(`${JSON.stringify(result)} insert success`);
    res.send(string);
  }); //插入新数据
});

app.listen(80);
