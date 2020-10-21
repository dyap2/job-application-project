const Joi = require("joi");
const mongoose = require("mongoose");

// embedded doucment attempt
const userSchema = new mongoose.Schema({
  name: String,
});

// do i still need to import this
const User = mongoose.model("User", userSchema);

const Application = mongoose.model(
  "Application",
  new mongoose.Schema({
    company_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    position: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 12,
    },
    user: userSchema,
  })
);



// should we already sassume that we have the user's infromation? if so, then i guess all we would need to do is 
function validateApplication(application) {
  const Schema = Joi.object({
    company_name: Joi.string().min(3).max(50).required(),
    position: Joi.string().min(10).max(12).required(),
  });
  return Schema.validate(application);
}

exports.Application = Application;
exports.validate = validateApplication;
