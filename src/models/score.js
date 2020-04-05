const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScoreSchema = new Schema({
    user_id: {type: String, required: true},
    article_id: {type: String, required: true},
    score: {type: Number, required: true},
    scored_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Scores', ScoreSchema);