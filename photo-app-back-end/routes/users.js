const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const router = express.Router();
const cors = require("cors");
router.use(cors());


router.post("/login", async (req,res) => {

  let success = false;

  const user = await User.findOne({name:req.body.name});

  if(user == null){
    return res.send({success: false, message:"User does not exist"});
  }

  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      success = true;
    } else {
      return res.send({success: false, msg:"Incorrect password"});
    }
  } catch {
    return res.status(500).send({success: false, msg:"Something went wrong..."});
  }
  
  if(success){
    const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);

    return res.send({ success: true, token: accessToken });
  } else {
    return res.json({success: false});
  }


})

router.post("/signup", async (req, res) => {

  

  if(req.body.name == null || req.body.password == null){
    res.send({message: "Username or Password cannot be empty"});
  }

  const user = await User.findOne({name: req.body.name});

  if (user){
    return res.status(401).send({message: "User already exists!"});
  }

  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({name:req.body.name, password:hashedPass});
    await user.save();
  } catch (error) {
    console.error(error);
    return res.status(500).send({message: "something went wrong"});
  }

  const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
  return res.json({ success: true, token: accessToken});

});



module.exports = router;