const express = require('express');
const OpinionCtrlr = require('../controllers/opinions.controller');
const Auth = require('../config/middelware');

const router = express.Router();

router.get('/opinions', Auth.ensureAuthenticated, OpinionCtrlr.getOpinions);

router.post('/write/opinion', Auth.ensureAuthenticated, OpinionCtrlr.createOpinion);

module.exports = router;