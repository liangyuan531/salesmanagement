const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, trim: true},
    isVip: Boolean,
    postDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostDetails'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Records'
    }]
})

UserSchema.methods.postDetails = function(postDetails) {
    this.userDetails.push(postDetails);
    return this.save()
}

UserSchema.methods.addOrders = function(order) {
    this.orders.push(order);
    return this.save()
}


module.export = mongoose.model('User', UserSchema);