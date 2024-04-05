const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/user")
const router = express.Router();


router.post("/login", async (req,res) => {

  const user = await User.findOne({name:req.body.name});
  console.log(user);

  if(user == null){
    return res.status(400).send("User does not exit");
  }

  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      res.send("success")
    }
  } catch {
    res.status(500).send("Incorrect password")
  }
  
  //validate credentials with the database (mongoose)
  //create JWT and return that token

})

router.post("/signup", async (req, res) => {

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