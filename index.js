const mongoose = require("mongoose");
//  const applications = require("./routes/applications");
const users = require("./routes/users");
const applications = require("./routes/applications");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/jobapps")
  .then(() => console.log("connected to the db..."))
  .catch((err) => console.error("couldn't connect", err));

  
//middleware
app.use(express.json());

// routes
app.use("/api/users", users);
app.use("/api/applications", applications);

// recall the environment port - what is this again?
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
