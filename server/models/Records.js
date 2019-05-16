const mongoose = require('mongoose');

const RecordsSchema = new mongoose.Schema({
    item: {type: String, required: true, trim: true},
    purchasePrice: mongoose.Decimal128,
    salePrice: mongoose.Decimal128,
    amount: {type: Number, required: true},
    date: Date
})

module.export = mongoose.model('Records', RecordsSchema);