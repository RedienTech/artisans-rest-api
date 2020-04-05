const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const OpinionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tag: {type: String, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    content: {type: String},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Opinion', OpinionSchema);