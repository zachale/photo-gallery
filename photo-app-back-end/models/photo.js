const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  location:String,
  dateTaken:String,
  name:String,
  data: String,
  user: String
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;