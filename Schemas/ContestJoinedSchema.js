const mongoose = require('mongoose');

const ContestJoinedSchema=mongoose.Schema({
      User_Name:{
      type:String,
      require: true
      },
  
      Contest_ID:{
      type:String,
      require: true
      },

      Total_Correct_Answers:{
      type: String,
      required: true
     },

      Total_Time_Taken:{
      type: String,
      required: true
     },

      Rank:{
      type: String,
      required: true
     },
  });
  
  const AddNewContestJoined = mongoose.model('ContestJoined', ContestJoinedSchema); // Creating a model

  module.exports= AddNewContestJoined;
