const express = require("express");
const User = require("./user.model");
const router = express.Router();

// Get tous les utilisateurs
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Créer un utilisateur
router.post("/users", async (req, res) => {
  const user = new User({
    title: req.body.title,
    content: req.body.content,
  });
  await user.save();
  res.send(user);
});

// Get un utilisateur individuellement
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "L'utilisateur n'existe pas !" });
  }
});

// Met à jour l'utilisateur
router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.title) {
      user.title = req.body.title;
    }

    if (req.body.content) {
      user.content = req.body.content;
    }

    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "L'utilisateur n'existe pas !" });
  }
});

// Supprimer l'utilisateur
router.delete("/users/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "L'utilisateur n'existe pas !" });
  }
});

module.exports = router;
