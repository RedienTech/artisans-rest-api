const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    img_url: {type: String, required: false},
    name: {type: String, required: false},
    last_name: {type: String, required: true},
    borned: {type: Date, required: false},
    sex: {type: String, required: true},
    country: {type: String, required: false},
    password: {type: String, required: true},
    email: {type: String, required: true},
    created_at: {type: Date, default: Date.now}    
});

UserSchema.methods.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hash = bcrypt.hash(password, salt);
   return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Users', UserSchema);
