const {successHandler, errorHandler} =  require('../helpers/responseHandler');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);
const User = require('../models/user');
const bcrypt = require('bcrypt');

// send otp 
exports.sendOTP = async (req, res) => {
    try{

        let err, user={};

        const {phoneNumber} = req.body;

        if(!phoneNumber){
            err = new Error('Missing Fields');
            err.statusCode = 400;
            throw err;
        }

        await client.verify.services(`${serviceID}`)
             .verifications
             .create({
                 to: '+918726905758', channel: 'sms'
                })
             .then((verification)=> {
                 user['verification'] = verification;
            });
        
        successHandler(res, user, 201);

    }catch(e){
        errorHandler(res, e.statusCode, e.message);
    }
};

// verify otp 
exports.verifyOTP = async (req, res) => {
    try{

        let err, user={};

        const {otp, phoneNumber} = req.body;

        if(!otp || !phoneNumber){
            err = new Error('Missing Fields');
            err.statusCode = 400;
            throw err;
        }

        await client
        .verify
        .services(`${serviceID}`)
        .verificationChecks
        .create({
            to: '+918726905758', code:otp
        })
        .then((verification)=> {
            user['verification'] = verification;
       });
   
             
        successHandler(res, user, 201);

    }catch(e){
        errorHandler(res, e.statusCode, e.message);
    }
};

// reset user password in db
exports.resetUserPassword = async (req, res) => {

    try{
  
      let err;
  
      const _id = req.params.userID;
  
      const {oldPassword, newPassword} = req.body;
  
      if (!oldPassword.trim() || !newPassword.trim()){
        err = new Error('MissingFields');
        err.statusCode = 400;
        throw err;
      }
  
      const user = await User.findById({_id});

      if (!user){
          err = new Error('Invalid user ID');
          err.statusCode = 400;
          throw err;
      }
  
      const isPassMatched = await bcrypt.compare(`${oldPassword}`,`${user.password}`);
  
      if (!isPassMatched){
        err = new Error('IncorrectPassword');
        err.statusCode = 400;
        throw err;
      }
  
      if (oldPassword === newPassword){
        err = new Error('NewPasswordCannotBeSameAsOldPassword');
        err.statusCode = 400;
        throw err;
      }
  
      // truncate any extra field
      req.body = {};
  
      // hash the new password
      req.body['password'] = await bcrypt.hash(newPassword, 10);
  
      const updatedUser = await User.findByIdAndUpdate({_id}, req.body, {new:true});
  
      successHandler(res, updatedUser);
  
    }catch(e){
      errorHandler(res, e.statusCode, e.message);
    }
  
  };
  
