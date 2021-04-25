const express = require('express');
const router = express.Router();
const {
  signupUsername,
  signupPhone,
  signupFB
} = require('../controllers/signup');
const {
  sendOTP,
  verifyOTP,
  resetUserPassword,
  createTeam
} = require('../controllers/user');
const { auth } = require('../helpers/middlerwares/isLoggedIn');
const {
  loginUsername,
  loginPhone,
  loginFB
} = require('../controllers/login');
router.post('/api/signup-username', signupUsername);
router.post('/api/signup-phone', signupPhone);
router.post('/api/signup-fb', signupFB);
// login routes
router.put('/api/login-username', loginUsername);
router.put('/api/login-phone', loginPhone);
router.put('/api/login-fb', loginFB);
// private user routes
router.put('/api/reset-password/:userID', auth, resetUserPassword);
router.post('/api/send-otp', sendOTP);
router.post('/api/verify-otp', verifyOTP);
router.post('/api/create-team/:userID', auth, createTeam)

module.exports = router;