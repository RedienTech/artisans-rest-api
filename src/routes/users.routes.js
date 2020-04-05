const express = require('express');
const UserCtrlr = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', UsersCtrl.createUser);

router.post('/signin', UsersCtrl.loginUser);

module.exports = router;