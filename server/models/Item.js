const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {type: String, required: true, trim: true},
    purchasePrice: mongoose.Decimal128,
    salePrice: mongoose.Decimal128,
    amount: {type: Number, required: true},
})

module.exports = mongoose.model('Item', ItemSchema);