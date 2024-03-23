const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    //id: String,
    text: String,
    // answers: [{
    //     true : String,
    //     false1 : String,
    //     false2 : String,
    //     false3 : String
    // }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question