//here we import mongoose to create tables in DB.
const mongoose = require('mongoose');
const { Schema } = mongoose;

//here we created a schema so that we can use it in auth.js to verify details and populate entries in correct tables.
//for required entry if not filled will throw error and here type is set to string.
const UserSchema = new Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   date: {
    type: Date,
    default: Date.now
   }

  });

  // here we expose the model as module so we can use it in auth.js as a module.
  module.exports = mongoose.model('user', UserSchema)