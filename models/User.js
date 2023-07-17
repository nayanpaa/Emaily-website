const mongoose = require('mongoose');
const { Schema } = mongoose; //destructuring Schema from mongoose

//we can freely add in properties as we see fit
//you can assign just the type, or an object with multiple things
  //there are a lot of things we can assign
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//telling mongoose that we want to create a new collection named users
  //mongoose will create a model if it does not already exist
mongoose.model('users', userSchema);