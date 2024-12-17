const express = require("express");
const connection = require("../database/connection");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..")));

app.get("/Pastebin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/save-data-form", (req, res) => {
  const savedText = req.body.savedText;
  const query = "INSERT INTO word (words) VALUES (?)";
  connection.query(query, [savedText], (err, result) => {
    if (err) {
      console.error(
        "Something happend while trying to save the data in DB:",
        err
      );
      return res.status(500).send("Couldn't save the data");
    }
  });
});

app.get("/get-data", (req, res) => {
  const query = "SELECT * FROM wordsdb.word";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Getting the data failed", err);
    }
    res.json(result);
    console.log("Got the data succesfully");
  });
});

app.get("/full-word", (req, res) => {
  const word = req.query.word;
  res.send(`<p>${word}</p>`);
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, " +
        "and App is listening on port " +
        PORT
    );
  else console.log("Error occurred, server can't start", error);
});
