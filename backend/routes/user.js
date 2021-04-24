const express = require('express');
const router = express.Router();
const {
  signupUsername,
  signupPhone
} = require('../controllers/signup');
const {
  sendOTP,
  verifyOTP,
  resetUserPassword
} = require('../controllers/user');
const { auth } = require('../helpers/middlerwares/isLoggedIn');
const {
  loginUsername,
  loginPhone
} = require('../controllers/login');

router.post('/api/signup-username', signupUsername);
router.post('/api/signup-phone', signupPhone);
// router.put('/api/user/login', login);

// login routes
router.put('/api/login-username', loginUsername);
router.put('/api/login-phone', loginPhone);

// private user routes
router.put('/api/reset-password/:userID', auth, resetUserPassword);
router.post('/api/send-otp', sendOTP);
router.post('/api/verify-otp', verifyOTP);

module.exports = router;
