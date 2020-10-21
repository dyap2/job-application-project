const { boolean } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const config = require('config');
const jwt = require('jsonwebtoken');

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      unique: true,
    }, password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isAdmin: Boolean
  })
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}


function validateUser(user) {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return Schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
