const {
  Parent,
  Child,
  validateChild,
  validateParent,
} = require("../models/familyCard");
const express = require("express");
const router = express.Router();

router.post("/child", async (req, res) => {
  try {
    const { error } = validateChild(req.body);
    if (error) return res.status(400).send(error);

    const child = new Child({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });


    await child.save();
    return res.send(child);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/parent", async (req, res) => {
  try {
    const { error } = validateParent(req.body);
    if (error) return res.status(400).send(error);

    const parent = new Parent({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });


    // if (!post) return res.status(400).send(`Reply doesnt exist.`);
    // user.posts.push(post);
    await parent.save();
    return res.send(parent);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//Future Feature
router.post("/relate/:parent/:child", async (req, res) => {
  try {
    const {parent, child} = req.params 
    const p = await Parent.findOne({firstName, lastName: parent })
    const c = await Child.findOne({firstName, lastName: child }) 
    const { error } = validateRelation(req.body);
    if (error) return res.status(400).send(error);

    const relation = new Relation({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });


    // if (!post) return res.status(400).send(`Reply doesnt exist.`);
    // user.posts.push(post);
    await parent.save();
    return res.send(parent);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;

