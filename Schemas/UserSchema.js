const mongoose = require('mongoose');

const UserSchema=mongoose.Schema({
      User_Name: {
            type: String,
            required: true,  // Corrected spelling from 'require' to 'required'
          },
          Phone_Number: {
            type: String,
            required: true,  // Corrected spelling
            minlength: 10,   // Use minlength and maxlength instead of 'length'
            maxlength: 10,
            unique: true     // Make sure phone numbers are unique
          },
          Password: {
            type: String,
            required: true
          }
  });
  
  const AddNewUser = mongoose.model('User', UserSchema); // Creating a model

  module.exports= AddNewUser;


  