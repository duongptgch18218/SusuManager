const express = require("express");

const app = express();

const path = require("path");

const engines = require("express-handlebars");

const bodyParser = require("body-parser");

app.engine(
  "hbs",
  engines({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const adminController = require(path.join(__dirname, "routes", "admin"));
app.use("/", adminController);

const getErrorPage = require(path.join(__dirname,"controller","error"));
app.use(getErrorPage);

app.listen(3000, () => {
  console.log("Server is running ar port 3000");
});
