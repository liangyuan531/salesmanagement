const mongoose = require('mongoose');

const RecordsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    date: Date
})

RecordsSchema.methods.applyUser = function(id) {
    this.user = id;
    return this.save()
}

RecordsSchema.methods.addItem = function(id) {
    this.items.push(id);
    return this.save()
}

module.export = mongoose.model('Records', RecordsSchema);