require("dotenv").config()

const app = require("./src/app");
const express = require("express");

const connectToDb = require("./src/config/database")


// ----------------------------------------------------------------------------------------------------------

// middleware

connectToDb();

app.use(express.json());

// ----------------------------------------------------------------------------------------------------------




app.listen(3000, () => {
  console.log("server is running at port 3000");
});
