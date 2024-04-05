const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  location:String,
  dateUploaded:String,
  img: {
    
  }

})

const User = mongoose.model('User', userSchema);

module.exports = User;