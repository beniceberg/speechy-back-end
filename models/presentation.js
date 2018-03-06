const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Presentation = new Schema({
  title: String,
  date: Date,
  attempts: [{ type: Schema.Types.ObjectId, ref: 'Attempt' }]
});

module.exports = mongoose.model('Presentation', Presentation);
