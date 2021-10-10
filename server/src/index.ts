const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

const username = "selmetwa";
const cluster = "cluster0.eauvk";
const dbname = "myFirstDatabase";
const password = process.env.PASSWORD;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(5000, () => console.log('Server running'));