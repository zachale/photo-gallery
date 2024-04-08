const express = require('express');
const router = express.Router();
const cookiesParser = require('cookie-parser');

const Photo = require('../models/photo')
const cors = require("cors");

router.use(cookiesParser());
router.use(cors());
 
router.use(authenticateToken);

// router.use();
// router.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

router.post("/upload", (req,res) => {
  const photo = new Photo(req.body);

  photo.save();

  console.log(photo);

  res.send("success");
});

router.get("/get", async (req,res) => {

  const user = req.query.user

  if(user==null){
    res.send({"msg":"error"})
  }
 
  const photos = await Photo.find({user:user})
  if(photos==null){
    res.send({'msg':'error'});
  } else {
    res.send({"photos":photos});
  }

  
});

router.post("/update", async (req,res) => {

  if(req.body._id){
    try{
      const photo = await Photo.findOneAndReplace({_id: req.body._id}, req.body);

      if(photo == undefined){
        throw Error("Photo was not found")
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
        throw Error("Photo was not found")
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

  const token = req.cookies.access_token;
  console.log(token);
  if(token == null){
    return res.status(401).send();
  }

  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (error,user) => {
    if (error){ 
      console.log(error)
      return res.status(403).send();
    } else {
      req.user = user;
      console.log("authenticated!")
      next();
    }
  })
}

module.exports = router;