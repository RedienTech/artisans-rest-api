const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentsSchema = new Schema({
    user_id: {type: String, required: true},
    article_id: {type: String, required: true},
    comment_content: {type: Text, required: true},
    created_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Comments', CommentsSchema);