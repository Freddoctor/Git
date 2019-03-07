const MongoClient = require('mongodb').MongoClient;

function MongodbConnect(url, dbname) {
  this.url = url;
  this.dbname = dbname;
  this.connect = MongoClient.connect(this.url);
}

MongodbConnect.prototype.createCollection = function(site) {
  this.connect.then((db) => {
    var dbo = db.db(this.dbname); //链接数据库
    dbo.createCollection(site, function(err, res) { //创建集合
      if (err) {
        throw err;
      }
      console.log(`create ${site} success`);
      // db.close();
    });
  }).catch((err) => {
    throw err;
  });
  return this;
}

MongodbConnect.prototype.insertOne = function(site, query, callback) {
  const _this = this;
  this.connect.then((db) => {
    var dbo = db.db(_this.dbname); //链接数据库
    dbo.collection(site).insertOne(query, (err, res) => {
      if (err) {
        throw err;
      }
      if (typeof callback == 'function') {
        callback(query);
      }
      // db.close();//取消
    })
  }).catch((err) => {
    throw err;
  });
}

MongodbConnect.prototype.find = function(site, query, callback) {
  const _this = this;
  this.connect.then((db) => {
    var dbo = db.db(_this.dbname); //链接数据库
    dbo.collection(site).find(query).toArray((err, result) => {
      if (err) {
        throw err;
      }
      if (typeof callback == 'function') {
        callback(resultArray(result));
      }
      // db.close();//取消
    })
  }).catch((err) => {
    throw err;
  });
}

function resultArray(result) {
 /*
  *移除数据库识别_id
 */
  var arr = new Array();
  var list = JSON.parse(JSON.stringify(result));
  arr = list.map((item, index) => {
    if (item._id) {
      delete item._id;
    }
    return item;
  })
  return arr;
}

// var mongo = new MongodbConnect(url, "websit");
// // mongo.createCollection("websit_user"); //创建新表
// mongo.insertOne("websit_user",{name:"花花使者",age:28,sex:"Man",tel:15995698400});//插入新数据
//
module.exports = MongodbConnect;

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("runoob");
//     let ayy = dbo.collection("orders").find({}).toArray(function(err, result) { // 返回集合中所有数据
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     console.log('操作结束', new Date().getTime())
//     db.close();
//   });
//   console.log('操作结束', new Date().getTime());
// });
