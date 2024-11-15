const mongoose = require('mongoose');

const ContestCreationSchema=mongoose.Schema({

      Entry_Fee:{
      type:String,
      require: true
      },
  
      Contest_ID:{
      type:String,
      require: true
      },

      Prize_pool:{
      type: String,
      required: true
     },

      Max_Spots:{
      type: String,
      required: true
     },

      Start_Time:{
      type: String,
      required: true
     },

  });
  
  const AddNewContestCreation = mongoose.model('ContestCreation', ContestCreationSchema); // Creating a model

  module.exports= AddNewContestCreation;
