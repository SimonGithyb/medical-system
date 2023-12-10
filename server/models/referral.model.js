const mongoose = require('mongoose');
const Schema = mongoose.Schema;

referralSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    personalId: { type: Number },
    description: { type: String },
    addedTime: { type: String, default: new Date }
}, {collection: 'referral'});

referral = mongoose.model('referral', referralSchema);

module.exports = referral;
