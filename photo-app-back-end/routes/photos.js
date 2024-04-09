const express = require('express');
const router = express.Router();
const Photo = require('../models/photo')
const cors = require("cors");
const jwt = require('jsonwebtoken');

router.use(cors());
 
//custom middle ware that validates JWT tokens
router.use(authenticateToken);

// takes an input photo and uploads it to mongo db
router.post("/upload", (req,res) => {
  try{
    const photo = new Photo(req.body);

    photo.save();

    res.send({'msg': 'success'});
  } catch (err){
    console.log(err);
    res.status(500).send({'err':err});
  }
});

// given a user through a get request, it returns a list of all of the users photos
router.get("/get", async (req,res) => {

  try{
    const user = req.query.user

    if(user==null){
      res.send({"msg":"user not found"});
    }
  
    const photos = await Photo.find({user:user});
    if(photos==null){
      res.send({'msg':'error'});
    } else {
      res.send({"photos":photos});
    }
  } catch (err){
    console.log(err);
    res.status(500).send({'err':err});
  }
  
});

//Given a photo, it replaces a photo in the DB with the same id
router.post("/update", async (req,res) => {

  if(req.body._id){
    try{
      const photo = await Photo.findOneAndReplace({_id: req.body._id}, req.body);

      if(photo == undefined){
        throw Error("Photo was not found");
      }

      console.log(photo);
    } catch (error){
      console.error(error);
      res.status(500).send({"msg": error});
    }
    res.send({"msg":"OK"});
  } else {
    res.send({"msg":"No Id Found"});
  }

});

//Given a photo, it finds its counter part in the DB and then deletes it
router.post("/delete", async (req,res) => {

  if(req.body._id){
    try{
      const photo = await Photo.findOneAndDelete({_id: req.body._id}, req.body);

      if(photo == undefined){
        throw Error("Photo was not found");
      }

      console.log(photo);
    } catch (error){
      console.error(error);
      res.status(500).send({"msg": error});
    }
    res.send({"msg":"OK"});
  } else {
    res.send({"msg":"No Id Found"});
  }
});

//This middle ware validates the json token given in the authentication header
function authenticateToken(req,res,next){

  const token = req.headers.authorization.split(" ")[1];
  if(token == null){
    return res.status(401).send();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error,user) => {
    if (error){ 
      console.log(error)
      return res.status(403).send();
    } else {
      req.user = user;
      next();
    }
  })
}

module.exports = router;