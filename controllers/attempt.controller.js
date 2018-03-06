'use strict';

const Attempt = require('../models/attempt');
const Presentation = require('../models/presentation');

exports.listAttempts = async (req,res) => {
  const presentation = await Presentation.findOne({_id: req.params.id}).populate('attempts');
  res.send(presentation.attempts);
  // Attempt.find().sort([['date',1]])
  //   .then(attempts => res.json(attempts))
}

exports.addAttempt = async (req, res) => {
  if(!req.body.videoURL) return res.status(400).json({
    error: 'No video sent'
  });

  const presentation = await Presentation.findOne({_id: req.params.id});

  const attempt = await Attempt.create({
    presentation: presentation._id,
    date: Date.now(),
    videoURL: req.body.videoURL,
    speechText: req.body.speechText,
    time: req.body.time,
    volumeArr: req.body.volumeArr
  })

  presentation.attempts.push(attempt._id);
  await presentation.save();

  res.status(201).json(attempt));
}

exports.deleteAttempt = (req, res) => {
  const presentationId = req.params.id;
  const attemptId = req.params.attemptId;
  Attempt.findOneAndRemove({
    _id: attemptId
  })
  .then(() => res.sendStatus(204))
  .catch(() => res.sendStatus(404))
}
