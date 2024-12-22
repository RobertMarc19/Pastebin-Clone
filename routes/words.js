const express = require("express");
const router = express.Router();
const connection = require("../server/database/connection");

router.post("/save-data-form", (req, res) => {
  const savedText = req.body.savedText;
  const query = "INSERT INTO word (words) VALUES (?)";
  connection.query(query, [savedText], (err) => {
    if (err) {
      console.error("Couldn't save the data:", err);
      return res.status(500).send("Couldn't save the data");
    }
    res.send("Data saved successfully!");
  });
});

router.get("/get-data", (req, res) => {
  const query = "SELECT * FROM wordsdb.word";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("You couldn't get the data:", err);
      return res.status(500).send("Couldn't fetch the data");
    }
    res.json(result);
  });
});

router.get("/word/:id", (req, res) => {
  const wordId = req.params.id;
  const query = "SELECT words FROM wordsdb.word WHERE id = ?";
  connection.query(query, [wordId], (err, result) => {
    if (err) {
      console.error("You couldn't get the word:", err);
      return res.status(500).send("Couldn't fetch the word");
    }
    res.send(`<p>${result[0].words}</p>`);
  });
});

module.exports = router;
