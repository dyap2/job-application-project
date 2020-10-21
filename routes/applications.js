const { Application, validate } = require("../models/application");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//TODO: add infromation about the status as well

// MAKE SURE WE GET THE USERS INFO FIRST!
router.get("/", async (req, res) => {
  const user = await User.findById(req.body.customerId);
  if (!user) return res.status(400).send("Invalid user.");

  //TODO: query by user???????
  const applications = Application.find().sort("company_name");
  res.send(applications);
});

//reading by id
// TODO: also implement user only here
router.get("/:id", async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application)
    return res.status(404).send("the user with the given if was not found");
  res.send(application);
});

// update
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const applications = await Application.findByIdAndUpdate(req.params.id, {
    company_name: req.body.company_name,
    position: req.body.position,
  });

  if (!applications) return res.status(404).send("the given id was not found");
  res.send(applications);
});

router.delete("/:id", async (req, res) => {
  const applications = await Application.findByIdAndRemove(req.params.id);
  if (!applications)
    return res.status(404).send("application with that id was not found");
  res.send(applications);
});

//creating a new apllication
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let applications = new Application({
    company_name: req.body.company_name,
    position: req.body.position,
  });

  applications = await applications.save();
  res.applications(user);
});

module.exports = router;
