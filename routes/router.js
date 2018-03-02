'use strict';

const express = require('express');

const speechController = require('../controllers/speech.controller');

const router = express.Router();

router.route('').get((req,res) => res.send('Wrong Server'));
router.route('/api/speech-to-text/token').get(speechController.getSpeechToTextToken);

module.exports = router;
