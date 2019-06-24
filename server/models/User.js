const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, trim: true},
    isVip: Boolean,
    postDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostDetails'
    }]
})

UserSchema.methods.addPostDetails = function(id) {
    this.userDetails.push(id);
    return this.save()
}

module.exports = mongoose.model('User', UserSchema);