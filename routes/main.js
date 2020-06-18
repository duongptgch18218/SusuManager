const express = require("express");
const controller = require("../controller/product");


const router = express.Router();

// router.get("/login", auth.getLoginPage);

// router.post("/dologin", auth.doLogin);

router.get("/", controller.getHomePage);

// router.get('/logout', auth.logOut);
module.exports = router;