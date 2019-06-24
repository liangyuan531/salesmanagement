const mongoose = require('mongoose');

const PostDetailsSchema = new mongoose.Schema({
    receiver: {type: String, required: true},
    phoneNo: {type: String, required: true, trim: true},
    address: {type: String, required: true},
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
})

PostDetailsSchema.methods.addItem = function(id) {
    this.items.push(id);
    return this.save();
}

module.exports = mongoose.model('PostDetails', PostDetailsSchema);