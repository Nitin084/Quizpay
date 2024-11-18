require("dotenv").config();
const express= require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app=express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const multer = require('multer');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const fast2sms = require('fast-two-sms')


// for post request
const Admin = require('./Schemas/AdminSchema.js');
const ContestJoined = require('./Schemas/ContestJoinedSchema.js');
const ContestCreation = require('./Schemas/ContestCreationSchema.js');
const Questions = require('./Schemas/QuestionsSchema.js');
const User = require('./Schemas/UserSchema.js');

//for get request
const UserModel = require('./Schemas/UserSchema.js');
const AdminModel = require('./Schemas/AdminSchema.js');
const ContestJoinedModel = require('./Schemas/ContestJoinedSchema.js');
const ContestCreationModel = require('./Schemas/ContestCreationSchema.js');
const QuestionModel = require('./Schemas/QuestionsSchema.js');

// const db_link = require('./Data.js');
const { constrainedMemory } = require('process');
const { Console, error } = require('console');
// use this fuction for post property
app.use(express.json());
app.use(cookieParser());
// for question purpuse delete if not done right
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
//
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.db_link)
.then(function(db){
  console.log('db connected');
})
.catch(function(err){
  console.log(err);
});

// Serve static files with the correct MIME types
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } 
    }
  }));

const authRouter=express.Router();

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

app.use('/auth', authRouter);


authRouter.route('/AddNewQuestion')
.get(getAddNewQuestion)
.post(postAddNewQuestion);


authRouter.route('/AddNewContest')
.get(getContest)
.post(postContest);

authRouter.route('/UserList')
.get(getUserList)


authRouter.route('/Admin')
.get(getAdmin)


authRouter.route('/login')
.get(getlogin)
.post(login)


authRouter.route('/logout')

authRouter.route('/loginUser')
// .get(getloginUser)    
.post(loginUser)


//get request for all input field pages( helps to load these pages on server)


function getAddNewQuestion(req,res){
  res.sendFile(path.join(__dirname, '/', '/Frontend/ADMIN/AddNewQuestion.html'));
}  


function getContest(req,res){
  res.sendFile(path.join(__dirname, '/', '/Frontend/ADMIN/AddNewContest.html'));
}  

function getlogin(req,res){
  res.sendFile(path.join(__dirname, '/', '/Frontend/LOGIN/login.html'));
}    

//Get request for all fetch field pages ( helps to load all pages who shows backend data in frontend)
function getUserList(req,res){
  res.sendFile(path.join(__dirname, '/', '/Frontend/ADMIN/UserList.html'));
}  

function getAdmin(req,res){
  res.sendFile(path.join(__dirname, '/', '/Frontend/ADMIN/Admin.html'));
} 

// post request for all input field pages(helps to post data to backend mongodb)

function postAddNewQuestion(req, res) {
  const { Question, Options, Answer } = req.body;
  const QuestionsData = new Questions({ Question, Options, Answer });
  QuestionsData.save()
  .then(savedData => {
    console.log('backend',req.body);
    res.status(200).send('Data saved successfully');
  })
  .catch(error => {
    console.error('Error while saving data:', error);
    res.status(500).send('Internal Server Error');
  });
}


function postContest(req, res) {
  const { Entry_Fee, Contest_ID ,Prize_pool, Max_Spots, Start_Time} = req.body;
  const ContestData = new TopicLink({ Entry_Fee, Contest_ID ,Prize_pool, Max_Spots, Start_Time });
  ContestData.save()
  .then(savedData => {
    console.log('backend',req.body);
    res.status(200).send('Data saved successfully');
  })
  .catch(error => {
    console.error('Error while saving data:', error);
    res.status(500).send('Internal Server Error');
  });
}

// database save request for all input field pages( helps to save data from post request to backend mongodb)

app.post('/auth/Questions', async (req, res) => {
  const QuestionsData = new Questions(req.body);
  await QuestionsData.save();
  console.log(QuestionsData);
})


app.post('/auth/Contest', async (req, res) => {
  const ContestData = new Contest(req.body);
  await ContestkData.save();
  console.log(ContestData);
})

// THIS API IS USED TO SEND OTP TO THE MOBILE FOR CHANGING PASSWORD
app.post('/send-otp', async (req, res) => {
  const { PhoneNumber } = req.body;
  console.log(PhoneNumber)
  sendOTP(PhoneNumber);
  // Function to send OTP using Fast2SMS
  function sendOTP(PhoneNumber) {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
console.log(generatedOTP)
    otpStorage[PhoneNumber] = generatedOTP;

    // const options = {
    //   authorization: 'atXDAen9YRsZQJhS5Kqro8Mpu7y3TIifG1HL24xmBCWd6jbclV3FvLA56qgru4V9MDitUswGoPhOakX1',
    //   message: `This is a test OTP code ${generatedOTP}`,
    //   numbers: [PhoneNumber],
    // };

    // fast2sms.sendMessage(options)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
});


// THIS API IS USED TO VERIFY THE OTP BEFORE CHANGING THE PASSWORD
const otpStorage = {};
app.post('/verify-otp', async (req, res) => {
  try {
    const { enteredOTP, PhoneNumber } = req.body;
    console.log(enteredOTP, PhoneNumber);
   
    const storedOTP = otpStorage[PhoneNumber];
    console.log(storedOTP);
    if (enteredOTP == storedOTP) {
      delete otpStorage[PhoneNumber];
      return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// API TO REGISTER USERS
app.post('/User', async (req, res) => { 
  const { username, PhoneNumber, password } = req.body;
  console.log(username, PhoneNumber, password)
  try {
    const newUser = new User({User_Name: username,Phone_Number: PhoneNumber,Password: password });
    await newUser.save();
    console.log(newUser);
    res.status(200).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving user data', error: error.message });
  }
});


// API FOR LOGIN
async function loginUser(req,res){
  try{
    let data =req.body;
    let User=await UserModel.findOne({Phone_Number:data.PhoneNumber});
    if (User){
      if(User.Password==data.password){
        
          const UserDetails = {
            username: User.User_Name,
            PhoneNumber: User.Phone_Number,
          };
          return res.status(200).json({UserDetails});
      }
      else{
        return res.json({message:'Wrong Credentials'});
      }
    }
    else{
      return res.status(302).json({ message: 'User Number not found' });
    }
  }
  catch(err){
    return res.status(500).json({message:err.message});
  }}


  async function login(req,res){
    try{
      let data =req.body;
      let User=await UserModel.findOne({Phone_Number:data.PhoneNumber});
      if (User){
        if(User.Password==data.password){
            return res.redirect('/auth/Admin');
        }
        else{
          return res.json({message:'Wrong Credentials'});
        }
      }
      else{
        return res.status(302).json({ message: 'User Number not found' });
      }
    }
    catch(err){
      return res.status(500).json({message:err.message});
    }}



  app.get('/questions', async (req, res) => {
    try {
      const questions = await QuestionModel.find({});
  
      // Format the result to include both Question and Options in each object
      const formattedQuestions = questions.map(question => {
        return {
          Question: question.Question,
          Options: question.Options,
        };
      });
  
      // Send the formatted questions in the response
      res.json(formattedQuestions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
