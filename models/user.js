const mongoose = require("mongoose");
const Joi = require("joi");
const { Post, postSchema } = require("./post");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 30 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  dob: { type: Date, required: false },
  // message: { type: [postSchema], default: [] },
  password: { type: String, required: true, minlength: 5, maxlength: 200 },
  // aboutMe: { type: String, minlength: 5, maxlength: 1024 },
  // linkRequests: [],
  image: { type: String, default: "" },
  // parents: {type: [parentSchema], default: []}
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, name: this.name }, config.get("jwtSecret"));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    dob: Joi.date(),
    image: Joi.string(),
  });
  return schema.validate(user);
}

// const validateLogin = (req) => {
//   const schema = Joi.object({
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(1024).required(),
//   });
//   return schema.validate(req);
// };

exports.User = User;
exports.validateUser = validateUser;
// exports.validateLogin = validateLogin;
