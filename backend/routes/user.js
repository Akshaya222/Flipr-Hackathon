const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/user');

// router.post('/api/user/register', register);
// router.put('/api/user/login', login);

module.exports = router;
