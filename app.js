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

const mainPage = require(path.join(__dirname, "routes", "main"));
app.use('/', mainPage);

const importPage = require(path.join(__dirname, "routes", "import"));
app.use('/import', importPage);

const exportPage = require(path.join(__dirname, "routes", "export"));
app.use("/export", exportPage);

const getErrorPage = require(path.join(__dirname,"controller","error"));
app.use(getErrorPage);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running ar port 3000");
});
