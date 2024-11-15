const mongoose = require('mongoose');

const AdminSchema=mongoose.Schema({
      
      Phone_Number:{
      type: String,
      require: true,
      length:10,
      },

      Password:{
      type: String,
      required: true
     },
  });
  
  const AddNewAdmin = mongoose.model('Admin', AdminSchema); // Creating a model

  module.exports= AddNewAdmin;

