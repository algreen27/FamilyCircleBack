const mongoose = require("mongoose");
const Joi = require("joi");

const family = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 30 },
  picture: {type: String},
  description: { type: String, required: true, minlength: 5, maxlength: 50 },
  likes: { type: Number, default: 0 },
});

const Family = mongoose.model("Family", family);

function validateFamily(family) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()  
  });
  return schema.validate(family);
}

exports.Family = Family;
exports.validateFamily = validateFamily;
exports.family = family;
