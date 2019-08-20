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
    postDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostDetails'
    },
    date: Date
})

RecordsSchema.methods.applyUser = function(id) {
    this.user = id;
    return this.save();
}

RecordsSchema.methods.addItems = function(items) {
    items.map(item=>{
        this.items.push(item._id);
    })
    return this.save();
}

RecordsSchema.methods.addPostDetail = function(id) {
    this.postDetail = id;
    return this.save()
}

module.exports = mongoose.model('Records', RecordsSchema);