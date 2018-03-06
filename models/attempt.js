const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attempt = new Schema({
  presentation: { type: Schema.Types.ObjectId, ref: 'Presentation' },
  date: Date,
  videoURL: String,
  speechText: String,
  time: Number,
  volumeArr: []
});

module.exports = mongoose.model('Attempt', Attempt);
