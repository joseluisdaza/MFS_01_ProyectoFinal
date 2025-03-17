require("dotenv").config();
var express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require('morgan');

// var indexRouter = require("./routes/index");
var usuariosRouter = require("./routes/usuarios");
var tareasRouter = require("./routes/tareas");

var app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/api", usuariosRouter);
app.use("/api", tareasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gestor API corriendo en el puerto ${PORT}.`);
});

module.exports = app;
