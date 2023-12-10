const mongoose = require('mongoose');
const Schema = mongoose.Schema;

priceListSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String },
    cost: { type: Number },
    material: { type: String },
    indications: { type: String },
    testTime: { type: Number },
}, {collection: 'priceList'});

PriceList = mongoose.model('PriceList', priceListSchema);

module.exports = PriceList;
