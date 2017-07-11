'use strict';

const mongoose = require('mongoose');

const answerChoiceSchema = mongoose.Schema({
    choice: {type: String, required: true},
    votes: {type: Number, 'default': 0}
})

const questionSchema = mongoose.Schema({
    text: {type: String, required: true},
    title: {type: String, required: true},
    choices:[answerChoiceSchema],
})

const pollSchema = mongoose.Schema({
    poll: [questionSchema],
    // aut hor: {type: String, required: true}
})

pollSchema.methods.apiRepr = function() {
    return{
        id: this._id,
        question: this.questions,

    }
}

const Poll = mongoose.model('Poll', pollSchema);

module.exports = {Poll}