const express = require('express');
const router = express.Router();

const Photo = require('../models/photo')
const cors = require("cors");
router.use(cors());

// router.use();
// router.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

router.post("/upload", (req,res) => {


  const photo = new Photo(req.body);

  // photo.save()

  console.log(photo);

  res.send("success");
});

router.get("/get", async (req,res) => {

  const user = req.query.name

  if(user==null){
    res.send("error")
  }
 
  const photos = await Photo.find({user:user})
  console.log(photo)
  if(photo==null){
    res.send("error")
  } else {
    res.send({"photos":photos});
  }

  
});

module.exports = router;