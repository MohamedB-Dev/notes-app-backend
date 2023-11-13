const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/signup', UserController.createuser);

router.post('/login', UserController.loginuser);

module.exports = router;
