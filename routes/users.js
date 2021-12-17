const { User, validateUser, validateLogin } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const config = require('config');
const jwt = require('jsonwebtoken');
// const fileUpload = require("../middleware/fileUpload");

//Search for family in internal DB
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//create new user/register
router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // dob: req.body.dob,
      password: await bcrypt.hash(req.body.password, salt),
      // image: req.file.path,
    });
    await user.save();

    // const token = user.generateAuthToken();
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id
      },
      config.get("jwtsecret")
    );
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // image: user.image,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//logih users
router.post("/login", auth, async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id
      },
      config.get("jwtsecret")
    );
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/:id/posts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.id}" does not exist.`);

    const post = new Post({
      // description: req.body.description,
      // likes: 0,
    });
    if (!post) return res.status(400).send(`Reply doesnt exist.`);
    user.posts.push(post);
    await user.save();
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        // dob: req.body.dob,
      },
      { new: true }
    );
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.id}" does not exist.`);

    await user.save();
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      config.get("jwtsecret")
    );
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
