const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const router = express.Router();
const cors = require("cors");
router.use(cors());


//this route validates a user / pass word combo
router.post("/login", async (req,res) => {

  let success = false;

  const user = await User.findOne({name:req.body.name});

  if(user == null){
    return res.send({success: false, msg:"User does not exist"});
  }

  try{

    //compare the encrypted password to the plain text password
    if(await bcrypt.compare(req.body.password, user.password)){
      success = true;
    } else {
      return res.send({success: false, msg:"Incorrect password"});
    }
  } catch {
    return res.status(500).send({success: false, msg:"Something went wrong..."});
  }
  
  //if the passwords match, return a new JWT token
  if(success){
    const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);

    return res.send({ success: true, token: accessToken });
  } else {
    return res.json({success: false, msg:"Something went wrong"});
  }


})


//this route signs a user up if their name is unique
router.post("/signup", async (req, res) => {

  if(req.body.name == null || req.body.password == null){
    res.send({msg: "Username or Password cannot be empty"});
  }

  const user = await User.findOne({name: req.body.name});

  if (user){
    return res.status(401).send({msg: "User already exists!"});
  }

  //add a user to the db with their password hashed
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({name:req.body.name, password:hashedPass});
    await user.save();
  } catch (error) {
    console.error(error);
    return res.status(500).send({msg: "Something went wrong"});
  }

  res.send({msg: "success"})

});



module.exports = router;