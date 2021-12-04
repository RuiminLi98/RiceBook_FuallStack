const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    pid: {
        type: Number,
        required: [true, 'pid is required']
    },
    author: {
        type: String,
        required: [true, 'author is required']
    },
    text: {
        type: String,
        required: [true, 'text is required']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    },
    comments: []
})

module.exports = articleSchema;
