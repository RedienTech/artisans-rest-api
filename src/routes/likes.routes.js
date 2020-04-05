const express = require('express');
const OpinionCtrlr = require('../controllers/opinions.controller');
const Auth = require('../config/middelware');

const router = express.Router();

router.get('/opinion/:id', Auth.ensureAuthenticated, OpinionCtrlr.addLike);

module.exports = router;