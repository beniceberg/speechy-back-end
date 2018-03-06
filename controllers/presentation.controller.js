'use strict';

const Presentation = require('../models/presentation');

exports.listPresentations = (req,res) => {
  Presentation.find().populate('attempts').sort([['date',1]])
    .then(presentations => res.json(presentations))
}

exports.getPresentation = (req,res) => {
  Presentation.findOne({_id: req.params.id}).populate('attempts')
    .then(presentation => res.json(presentation))
}

exports.addPresentation = (req, res) => {
  if(!req.body.title) return res.status(400).json({
    error: 'No title sent'
  });

  Presentation.create({
    title: req.body.title,
    date: Date.now(),
    attempts: []
  })
    .then(presentation => res.status(201).json(presentation))
}

exports.deletePresentation = (req, res) => {
  const presentationId = req.params.id;
  Presentation.findOneAndRemove({
    _id: presentationId
  })
  .then(() => res.sendStatus(204))
  .catch(() => res.sendStatus(404))
}
