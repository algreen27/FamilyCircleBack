const Product = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // const { error } = validateProduct(req.body);
    // if (error) return res.status(400).send(error);

    const user = new Product.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        // password: await bcrypt.hash(req.body.password, salt),
        // image: req.file.path,
  
    });
    await user.save();

    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
