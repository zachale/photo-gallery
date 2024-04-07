const express = require("express");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const userRouter = require("./routes/users");
const photoRouter = require("./routes/photos");


require('dotenv').config();

connectDB();

const app = express();
app.use(express.json({limit: '16mb'}));

const port = 3000;

app.use('/photos', photoRouter);
app.use('/users', userRouter);



mongoose.connection.once('connected', () => {

  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  })
})