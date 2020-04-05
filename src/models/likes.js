const mongoose = require('mongoose');

const {Schema} = mongoose;

const LikeOpinionSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    send_by: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    received_by:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    opinion_id: {type: mongoose.Schema.Types.ObjectId, ref: 'opinion'}
});

module.exports = mongoose.model('Likes', LikeOpinionSchema);