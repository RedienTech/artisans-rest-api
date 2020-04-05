const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticlesSchema = new Schema({
    name: {type: String, required:true},
    content: {type: Text, required: true},
    cretated_at: {type: Date, default: Date.now()},
    tags: {type: Array, required:false}
});

module.exports = mongoose.model('Articles', ArticlesSchema);