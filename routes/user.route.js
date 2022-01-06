const express = require("express");
const app = express();

const userExpressRoute = express.Router();

// Model User
let UserSchema = require("../model/user.model");

// Get les Utilisateurs
userExpressRoute.route("/").get((req, res) => {
  UserSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Créer un Utilisateur
userExpressRoute.route("/create-user").post((req, res, next) => {
  UserSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get un utilisateur individuellement
userExpressRoute.route("/get-user/:id").get((req, res) => {
  UserSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update un utilisateur
userExpressRoute.route("/update-user/:id").put((req, res, next) => {
  UserSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Utilisateur mis à jour avec succès !");
      }
    }
  );
});

// Delete un utilisateur
userExpressRoute.route("/remove-user/:id").delete((req, res, next) => {
  UserSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = userExpressRoute;
