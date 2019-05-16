const mongoose = require('mongoose');

const PostDetailsSchema = new mongoose.Schema({
    receiver: {type: String, required: true},
    phone: {type: String, required: true, trim: true},
    address: {type: String, required: true}
})

module.export = mongoose.model('PostDetails', PostDetailsSchema);