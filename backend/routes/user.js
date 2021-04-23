const express = require('express');
const router = express.Router();
const {signupUsername} = require('../controllers/signup');

router.post('/api/signup-username', signupUsername);
// router.put('/api/user/login', login);

module.exports = router;
