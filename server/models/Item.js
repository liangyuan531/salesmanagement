const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {type: String, required: true, trim: true},
    purchasePrice: String,
    salePrice: String,
    amount: {type: Number, required: true},
})

module.exports = mongoose.model('Item', ItemSchema);