const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require('jsonwebtoken');

const router = express.Router();


const auth = require('../middleware/auth');


//CRUD operations

//reading all
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

//reading by id  so this should just be for checking we can use this for verification 
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("the user with the given if was not found");
  res.send(user);
});

//creating a new user
// here we check if that account already exists.
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send * error.details[0].message;

  //checkign for duplicated
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User has already been registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();


  // why tokens?
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));




});

// // update
// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(req.params.id, {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });

//   if (!user) return res.status(404).send("the given id was not found");

//   res.send(user);
// });

// router.delete("/:id", async (req, res) => {
//   const user = await User.findByIdAndRemove(req.params.id);
//   if (!user) return res.status(404).send("customer with that id was not found");
//   res.send(user);
// });

module.exports = router;
