const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./db/database");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Base de données connectée");
    },
    (error) => {
      console.log("La base de données n'a pas pu se connecter : " + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

const userRoute = require("./routes/user.route");
app.use("/api", userRoute);

// Créer le port
const port = process.env.PORT || 3000;

// Se connecter au port
const server = app.listen(port, () => {
  console.log("Port connecté au : " + port);
});

// Index de la route
app.get("/", (req, res) => {
  res.send("Endpoint invalide");
});
