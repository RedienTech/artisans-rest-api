const mongoose = require('mongoose');

const { Schema } = mongoose;

const FollowersSchema = new Schema({
    folower_id: {type: String, required: true},
    followed_id: {type: String, required: true},
    followed_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Folows', FollowersSchema);
