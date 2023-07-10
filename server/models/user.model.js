const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    login: { type: String },
    password: { type: String },
    role: {type: String, default: "patient"},
    name: { type: String },
    surename: { type: String },
    personalId: { type: Number },
    country:  { type: String },
    zipCode:  { type: Number },
    address:  { type: String },
    phoneNumber: { type: Number },
}, {collection: 'users'});

User = mongoose.model('User', userSchema);

module.exports = User;
