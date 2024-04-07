const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
    },
    correctQuestions: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
    doneAt: {
      type: Date,
      default: Date.now, 
    },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record