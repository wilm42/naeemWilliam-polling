'use strict';

const mongoose = require('mongoose');

const answerChoiceSchema = mongoose.Schema({
    choice: {type: String, required: true},
    votes: {type: Number, 'default': 0}
})

const questionSchema = mongoose.Schema({
    text: {type: Array, required: true},
})

const pollSchema = mongoose.Schema({
    text: {type: String, ref: 'Question'},
    title: {type: String, required: true},
    choices: {type: Array, ref: 'Answers'},
    createdDate: {type: String}
})

pollSchema.methods.apiRepr = function() {
    return{
        id:this._id,
        title:this.title,
        text:this.text,
        choices:this.choices,
        createdDate:this.createdDate
    }
}

const Poll = mongoose.model('Poll', pollSchema);
const Question = mongoose.model('Question', questionSchema);
const Answers = mongoose.model('Answers', answerChoiceSchema);
module.exports = {Poll}