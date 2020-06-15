const express = require("express");
const { escapeExpression } = require("handlebars");
const app = express();

app.use(express.json());

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
        let totalKg = 0;
        let totalPaid = 0;
        let totalUnpaid = 0;
        result.forEach((data) => {
          totalKg += parseFloat(data.amount);
          if (data.paid === "yes") {
            totalPaid += data.total;
          } else {
            totalUnpaid += data.total;
          }
        });
        let totalMoney = totalPaid + totalUnpaid;
        res.render("display", {
          displayCSS: true,
          nav: true,
          product: result,
          check: result.length < 1,
          totalKg: totalKg,
          totalPaid: totalPaid,
          totalUnpaid: totalUnpaid,
          totalMoney: totalMoney,
        });
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
  res.redirect("/import/");
};

exports.getDataByDate = (req, res) => {
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
        let totalKg = 0;
        let totalPaid = 0;
        let totalUnpaid = 0;
        result.forEach((data) => {
          totalKg += parseFloat(data.amount);
          if (data.paid === "yes") {
            totalPaid += data.total;
          } else {
            totalUnpaid += data.total;
          }
        });
        let totalMoney = totalPaid + totalUnpaid;
        res.json({ result: result, totalKg: totalKg, totalMoney: totalMoney, totalPaid: totalPaid, totalUnpaid:totalUnpaid});
        db.close();
      });
  });
};

exports.getUpdatePage = (req, res) => {
  const id = req.params.id;
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("SusuManager");
    const ObjectID = require("mongodb").ObjectID;
    const query = { _id: ObjectID(id) };
    dbo
      .collection("product")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        res.render("update", {
          name: "/import/update/" + id,
          data: result,
          nav: true,
        });
        db.close();
      });
  });
};

exports.updateData = async (req, res) => {
  const id = req.body.idCustomer;
  const name = req.body.name;
  const tel = req.body.phone;
  const address = req.body.address;
  const price = req.body.price;
  const amount = req.body.amount;
  const paid = req.body.paid;
  const date = req.body.date;
  const total = price * amount;
  var newInfo = {
    $set: {
      name: name,
      address: address,
      phone: tel,
      price: price,
      amount: amount,
      total: total,
      paid: paid,
      date: date,
    },
  };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("SusuManager");
    const mongodb = require("mongodb");
    var query = { _id: new mongodb.ObjectID(id) };
    dbo.collection("product").updateOne(query, newInfo, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  res.redirect("/import");
};

exports.deleteData = (req, res) => {
  const id = req.params.id;
  console.log(id);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("SusuManager");
    const mongodb = require("mongodb");
    var myquery = { _id: mongodb.ObjectID(id) };
    dbo.collection("product").deleteOne(myquery, function (err, obj) {
      if (err) {
        res.json({ check: false });
        throw err;
      }
      console.log("1 document deleted");
      res.json({ check: true });
    });
  });
};
