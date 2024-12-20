const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const indexRouter = require("./routes/index");
const wordsRouter = require("./routes/words");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", wordsRouter);

module.exports = app;