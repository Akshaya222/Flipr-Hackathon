// helper fn
const {successHandler, errorHandler} =  require('../helpers/responseHandler');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// sign up using username
exports.signupUsername = async (req, res) => {
  try{

    let err;
    const {username, password} = req.body;

    if (!username.trim() || !password.trim()){
      err = new Error('Missing Fields');
      err.statusCode = 400;
      throw err;
    }

    if (!password.match(/[a-z]/i) || !password.match(/[0-9]/) || password.length<6) {
        err = new Error('Password format - atleast 1 num, atleast 1 char, length>6');
        err.statusCode = 400;
        throw err;
    }

    const isAlreadyRegistered = await User.findOne({username});

    if (isAlreadyRegistered){
      err = new Error('User Already Exists, Please Login');
      err.statusCode = 400;
      throw err;
    }

    req.body = {}
    req.body['username'] =  username;
    req.body['password'] = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);

    if (!user){
      err = new Error('Failed to Register');
      err.statusCode = 500;
      throw err;
    }

    successHandler(res, user, 201);

  }catch(e){
   errorHandler(res, e.statusCode, e.message);
  }
};


// sign up using phone number
exports.signupPhone = async (req, res) => {
  try{

    let err;
    
    const {phoneNumber} = req.body;

    if (!phoneNumber.trim()){
      err = new Error('Missing Fields');
      err.statusCode = 400;
      throw err;
    }

    const isPhoneListed = await User.findOne({phoneNumber});

    if (isPhoneListed){
      err = new Error('Phone number already Registered');
      err.statusCode = 400;
      throw err; 
    }

    req.body = {};
    req.body['phoneNumber'] = phoneNumber; 

    const user = await User.create(req.body);

    if (!user){
      err = new Error('Failed to Register');
      err.statusCode = 500;
      throw err;
    }

    successHandler(res, user, 201);

  }catch(e){
   errorHandler(res, e.statusCode, e.message);
  }
};