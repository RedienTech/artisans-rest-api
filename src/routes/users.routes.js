const express = require('express');
const UserCtrlr = require('../controllers/user.controller');
const Auth = require('../config/middelware');

const router = express.Router();

router.get('/info', Auth.ensureAuthenticated)

router.post('/signup', UsersCtrl.createUser);

router.post('/signin', UsersCtrl.loginUser);

module.exports = router;