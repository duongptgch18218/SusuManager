const express = require("express");
const controller = require("../controller/product");

const router = express.Router();

router.get("/login", controller.getLoginPage);

router.get("/", controller.getHomePage);


module.exports = router;