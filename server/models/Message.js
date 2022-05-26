const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema } = mongoose;

const messageSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
