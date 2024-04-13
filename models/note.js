const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Note', noteSchema);
