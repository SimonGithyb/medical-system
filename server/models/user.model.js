const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    login: { type: String },
    password: { type: String },
    role: {type: String, default: "patient"},
    personalId: { type: Number },
}, {collection: 'users'});

User = mongoose.model('User', userSchema);

module.exports = User;
