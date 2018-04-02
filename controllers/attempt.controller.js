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

  res.status(201).json(presentation);
}

exports.deleteAttempt = async (req, res) => {
  const presentationId = req.params.id;
  const attemptId = req.params.attemptId;

  const presentation = await Presentation.findOne({_id: presentationId})
    .catch(() => res.sendStatus(404))

  const index = presentation.attempts.indexOf(attemptId);

  presentation.attempts.splice(index, 1);
  await presentation.save(function (err) {
    if (err) return handleError(err);
    return res.status(204).json(presentation);
    // saved!
  });
}

exports.getAttempt = async (req, res) => {
  const presentationId = req.params.id;
  const attemptId = req.params.attemptId;

  const presentationIndex = await Presentation.findOne({_id: presentationId});
  const presentation = await Presentation.findOne({_id: presentationId}).populate('attempts')
    .catch(() => res.sendStatus(404))

  const index = presentationIndex.attempts.indexOf(attemptId);
  const attempt = presentation.attempts[index];

  res.status(200).json(attempt);
}
