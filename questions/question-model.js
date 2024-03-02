const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    text: String,
    answers: [{
        true : Answer,
        false1 : Answer,
        false2 : Answer,
        false3 : Answer
    }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question