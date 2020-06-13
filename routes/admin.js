const express = require("express");
const controller = require("../controller/product");


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://duongpt:201085@cluster0-ppw04.mongodb.net/test";


const router = express.Router();

router.get("/home", controller.getHomePage);

router.get("/add-product", controller.getAddProductPage);

router.get("/login", controller.getLoginPage);

router.get("/show", controller.getDisplayPage);

router.post("/addProduct", controller.addProduct);

router.get('/getByDate/:date', controller.getDataByDate)


module.exports = router;
