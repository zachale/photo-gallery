const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/user")
const router = express.Router();
const cors = require("cors");

router.use(cors());



router.post("/login", async (req,res) => {

  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');

  const user = await User.findOne({name:req.body.name});
  console.log(user);

  if(user == null){
    return res.send({message:"User does not exit"});
  }

  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      res.send({message:"success"})
    } else {
      res.send({message:"incorrect password"})
    }
  } catch {
    res.status(500).send({message:"Something went wrong..."})
  }
  
  //validate credentials with the database (mongoose)
  //create JWT and return that token

})

router.post("/signup", async (req, res) => {

  if(req.body.name == null || req.body.password == null){
    res.send({message: "Username or Password cannot be empty"})
  }

  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({name:req.body.name, password:hashedPass});
    await user.save();
  } catch (error) {
    console.error(error)
    res.status(500).send();
  }

  res.send("success")
  //encrypt data, add user to database (using mongoose)

})

module.exports = router;