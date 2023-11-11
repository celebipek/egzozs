const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
      type: String,
     
  },
  price: {
      type: String,
      required: true,
      unique: true
  }
 
});
  
  const User = mongoose.model('User', userSchema);
  module.exports = User; 