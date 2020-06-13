const express= require('express');
const app = express();

app.use(express.json())



const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://duongpt:201085@cluster0-ppw04.mongodb.net/test";

exports.getHomePage = (req, res) => {
  res.render("home", { img: true, nav: true });
};

exports.getDisplayPage = (req, res) => {
  var utc = new Date().toJSON().slice(0, 10);
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("SusuManager");
    var query = { date: utc };
    dbo
      .collection("product")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.render("display", { displayCSS: true, nav: true, product: result });
        db.close();
      });
  });
};

exports.getLoginPage = (req, res) => {
  res.render("login");
};

exports.getAddProductPage = (req, res) => {
  res.render("add", { addProduct: true, nav: true });
};

exports.addProduct = async (req, res) => {
  const name = req.body.name;
  const tel = req.body.phone;
  const address = req.body.address;
  const price = req.body.price;
  const amount = req.body.amount;
  const paid = req.body.paid;
  const date = req.body.date;
  const total = price * amount;
  let newProduct = {
    name: name,
    address: address,
    phone: tel,
    price: price,
    amount: amount,
    total: total,
    paid: paid,
    date: date,
  };
  let client = await MongoClient.connect(url);
  let dbo = client.db("SusuManager");
  await dbo.collection("product").insertOne(newProduct);
  res.redirect("/show");
};


exports.getDataByDate = (req,res) => {
    const date = req.params.date;
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("SusuManager");
      var query = { date: date };
      dbo
        .collection("product")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          let flag = true;
          if(result.length < 1){
            flag = false;
          }
          res.json({result: result});
          db.close();
        });
    });
}

