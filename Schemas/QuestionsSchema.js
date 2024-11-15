const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const QuestionSchema = mongoose.Schema({
    Question: {
        type: String,
        required: true,
    },
    Options: {
        type: [OptionSchema], // Array of OptionSchema objects
        required: true,
    },
    Answer: {
        type: String,
        required: true,
    },
});

const AddNewQuestion = mongoose.model('Question', QuestionSchema);

module.exports = AddNewQuestion;
