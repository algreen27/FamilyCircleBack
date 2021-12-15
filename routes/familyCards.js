const {
  Parent,
  Child,
  validateChild,
  validateParent,
} = require("../models/familyCard");
const express = require("express");
const router = express.Router();

router.post("/addchild", async (req, res) => {
  try {
    const { error } = validateChild(req.body);
    if (error) return res.status(400).send(error);

    const child = new Child({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });


    // if (!post) return res.status(400).send(`Reply doesnt exist.`);
    // user.posts.push(post);
    await user.save();
    return res.send(child);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/addparent", async (req, res) => {
  try {
    const { error } = validateChild(req.body);
    if (error) return res.status(400).send(error);

    const parent = new Parent({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });


    // if (!post) return res.status(400).send(`Reply doesnt exist.`);
    // user.posts.push(post);
    await user.save();
    return res.send(parent);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
