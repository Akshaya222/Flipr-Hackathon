const express = require('express');
const router = express.Router();
const {
  signupUsername,
  signupPhone
} = require('../controllers/signup');

const {sendOTP} = require('../controllers/user');

const { auth } = require('../helpers/middlerwares/isLoggedIn');

const {
  loginUsername,
  loginPhone
} = require('../controllers/login');

router.post('/api/signup-username', signupUsername);
router.post('/api/signup-phone', signupPhone);
// router.put('/api/user/login', login);

router.get('/api/send-otp', sendOTP);

// login routes
router.put('/api/login-username', loginUsername);
router.put('/api/login-phone', loginPhone);

module.exports = router;
