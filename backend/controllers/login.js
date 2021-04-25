// helper fn
const {successHandler, errorHandler} =  require('../helpers/responseHandler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUsername =  async (req, res) => {
  try{
    let err;

    const {username, password} = req.body;

    if (!username || !password){
      err = new Error('Missing fields');
      err.statusCode = 400;
      throw err;
    }

    let user = await User.findOne({username});

    if (!user) {
      err = new Error('User Not Found');
      err.statusCode = 404;
      throw err;
    }

    const isPassMatched = await bcrypt.compare(`${password}`,`${user.password}`);

    if (!isPassMatched){
      err = new Error('Incorrect Password');
      err.statusCode = 400;
      throw err;
    }

    // generate token
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
  
    user = await User.findOneAndUpdate({username}, {token},  {new: true});

    if (!user){
      err = new Error('Failed to update token');
      err.statusCode = 500;
      throw err;
    }

    successHandler(res, user);

  }catch(e){
    errorHandler(res, e.statusCode, e.message);
  }
};


// login usin otp
exports.loginPhone =  async (req, res) => {
  try{
    let err;

    const {phoneNumber} = req.body;

    if (!phoneNumber){
      err = new Error('Missing fields');
      err.statusCode = 400;
      throw err;
    }

    let user = await User.findOne({phoneNumber});

    if (!user) {
      err = new Error('User Not Found');
      err.statusCode = 400;
      throw err;
    }

    // generate token
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
  
    user = await User.findOneAndUpdate({phoneNumber}, {token},  {new: true});

    if (!user){
      err = new Error('Failed to update token');
      err.statusCode = 500;
      throw err;
    }

    successHandler(res, user);

  }catch(e){
    errorHandler(res, e.statusCode, e.message);
  }
};


// login usin fb id
exports.loginFB =  async (req, res) => {
  try{
    let err;

    const {fbID} = req.body;

    if (!fbID){
      err = new Error('Missing fields');
      err.statusCode = 400;
      throw err;
    }

    let user = await User.findOne({fbID});

    if (!user) {
      req.body = {};
      req.body['fbID'] = fbID; 
  
      const user = await User.create(req.body);
  
      if (!user){
        err = new Error('Failed to Register');
        err.statusCode = 500;
        throw err;
      }
  
    }

    // generate token
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
  
    user = await User.findOneAndUpdate({fbID}, {token},  {new: true});

    if (!user){
      err = new Error('Failed to update token');
      err.statusCode = 500;
      throw err;
    }

    successHandler(res, user,201);

  }catch(e){
    errorHandler(res, e.statusCode, e.message);
  }
};

