const mongoose = require('mongoose');
const Schema = mongoose.Schema;

personSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String },
    surename: { type: String },
    personalId: { type: Number },
    country:  { type: String },
    zipCode:  { type: Number },
    address:  { type: String },
    phoneNumber: { type: Number },
}, {collection: 'persons'});

Person = mongoose.model('Person', personSchema);

module.exports = Person;
