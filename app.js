const express = require("express");
require("dotenv").config();
const mysql = require("mysql2/promise");

const app = express();

app.use(express.json());

const port = 5000;

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const welcome = (req, res) => {
  res.send("Welcome to my favourite users list");
};
const HANDLER = (req, res) => {
  database
    .query("select * from userss")
    .then(([userss]) => {
      res.json(userss);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const postusers = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO userss(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      // wait for it
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the users");
    });
};
app.get("/", welcome);
app.get("/api/userss", HANDLER);
app.post("/api/userss", postusers);
