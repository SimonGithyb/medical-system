const mongoose = require('mongoose');
const Schema = mongoose.Schema;

reciptSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    personalId: { type: Number },
    drugs: { type: Array },
    addedTime: { type: String, default: new Date }
}, {collection: 'recipts'});

recipt = mongoose.model('recipt', reciptSchema);

module.exports = recipt;
