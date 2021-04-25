const {successHandler, errorHandler} =  require('../helpers/responseHandler');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);
const User = require('../models/user');
const Team = require('../models/teams');
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
                 to: `+91${phoneNumber}`, channel: 'sms'
                })
             .then((verification)=> {
                 user['verification'] = verification;
            });
        
        successHandler(res, user, 200);

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
            to: `+91${phoneNumber}`, code:otp
        })
        .then((verification)=> {
            user['verification'] = verification;
       });
   
             
        successHandler(res, user, 200);

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
  
// create team
exports.createTeam = async (req, res) => {
    try{

        let err;

        const _id = req.params.userID;

        const {players, team1, team2, credits} = req.body;

        if(!_id || !players || players.length===0 || !team1 || !team2 || !credits){
            err = new Error('Missing Fields');
            err.statusCode = 400;
            throw err;
        }

        if (players.length !== 11){
            err = new Error('Please add 11 players strictly');
            err.statusCode = 400;
            throw err;
        }
        
        const user = await User.findById({_id});

        if (!user){
            err = new Error('Invalid User ID');
            err.statusCode = 400;
            throw err;
        }

        req.body = {};
        req.body['userID'] = _id;
        req.body['players'] = players;
        req.body['team1'] = team1;
        req.body['team2'] = team2;
        req.body['credits'] = credits;

        const team = await Team.create(req.body);

        if (!team){
            err = new Error('Failed to create team');
            err.statusCode = 500;
            throw err;
        }

        successHandler(res, team, 201);

    }catch(e){
        errorHandler(res, e.statusCode, e.message);
    }
};
