const express = require("express");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const userRouter = require("./routes/users");
const photoRouter = require("./routes/photos");
const cookiesParser = require('cookie-parser');

//for env variables
require('dotenv').config();

connectDB();

const app = express();

//set a high json limit so images can be passed through json
app.use(express.json({limit: '16mb'}));


const port = 3000;

//have seperate routers for user auth and photo interactions
app.use('/photos', photoRouter);
app.use('/users', userRouter);


//if the mongoose connection is successful, start server
mongoose.connection.once('connected', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  })
})