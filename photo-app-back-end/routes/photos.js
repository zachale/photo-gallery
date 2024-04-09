const express = require('express');
const router = express.Router();
const cookiesParser = require('cookie-parser');

const Photo = require('../models/photo')
const cors = require("cors");
const jwt = require('jsonwebtoken');

router.use(cors());
 
router.use(authenticateToken);

// router.use();
// router.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

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

router.get("/get", async (req,res) => {

  try{
    const user = req.query.user

    if(user==null){
      res.send({"msg":"user nnot found"});
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