'use strict';

const express = require('express');

const speechController = require('../controllers/speech.controller');
const presentationController = require('../controllers/presentation.controller');
const attemptController = require('../controllers/attempt.controller');

const router = express.Router();

router.route('').get((req,res) => res.send('Wrong Server'));
router.route('/api/speech-to-text/token').get(speechController.getSpeechToTextToken);

// Presentation routes
router.route('/presentations').get(presentationController.listPresentations);
router.route('/presentations/:id').get(presentationController.getPresentation);
router.route('/presentations').post(presentationController.addPresentation);
router.route('/presentations/:id').delete(presentationController.deletePresentation);

// Attempts routes
router.route('/presentations/:id/attempts').get(attemptController.listAttempts);
router.route('/presentations/:id/attempts').post(attemptController.addAttempt);
router.route('/presentations/:id/attempts/:attemptId').delete(attemptController.deleteAttempt);
router.route('/presentations/:id/attempts/:attemptId').get(attemptController.getAttempt);

module.exports = router;
