const Product = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require('bycrypt');

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // dob: req.body.dob,
      // password: await bcrypt.hash(req.body.password, salt),
      // image: req.file.path,
    });
    await user.save();

    return res.send({ _id: user._id, name: user.name, email: user.email });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
