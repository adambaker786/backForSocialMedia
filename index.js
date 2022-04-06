const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const importRoute = require("./routes");
const req = require("express/lib/request");
const path = require("path");

require("dotenv").config();

const port = 4000;

const app = express();

app.use(express.json());
app.use(path.resolve(__dirname, "assets"), express.static("assets"));
app.use(cors());
app.use(importRoute);

mongoose
  .connect(`mongodb+srv://jackcoul:1558@cluster0.rbezt.mongodb.net/SocialMedia`)
  .then(() => {
    console.log("Соединение с монго установлено");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  });
