const express = require("express");
const controller = require("../controller/product");


const router = express.Router();


router.get('/add-product', controller.getAddProductPage);

router.get('/', controller.getDisplayPage);

router.post('/addProduct', controller.addProduct);

router.get('/getByDate/:date', controller.getDataByDate);

router.get('/update/:id', controller.getUpdatePage);

router.post('/update', controller.updateData);

router.get('/delete/:id', controller.deleteData);


module.exports = router;
