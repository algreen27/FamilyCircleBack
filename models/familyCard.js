const mongoose = require("mongoose");
const Joi = require("joi");

// const family = new mongoose.Schema({
//   firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
//   lastName: { type: String, required: true, minlength: 2, maxlength: 30 },
//   picture: {type: String},
//   description: { type: String, required: true, minlength: 5, maxlength: 50 },
// });

// const Family = mongoose.model("Family", family);


const parent = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 30 },
    dob: { type: Date, required: false },
    // aboutMe: { type: String, minlength: 5, maxlength: 1024 },
    image: { type: String, default: "" },
  
  })

const Parent = mongoose.model("Parent", parent);

const child = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 30 },
    dob: { type: Date, required: false },
    // aboutMe: { type: String, minlength: 5, maxlength: 1024 },
    image: { type: String, default: "" },
  })

const Child = mongoose.model("Child", child);

const relation = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: "Parent"},
    child: {type: mongoose.Schema.Types.ObjectId, ref: "Child"}
})

const Relation = mongoose.model("Relation", relation);

function validateParent(parent) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    });
    return schema.validate(parent);
};

function validateChild(child) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    });
    return schema.validate(child);
};


exports.Parent = Parent;
exports.Child = Child;
exports.Relation = Relation;
exports.validateChild = validateChild;
exports.validateParent = validateParent;