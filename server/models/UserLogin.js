const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true},
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

UserLoginSchema.methods.addInfo = function(id) {
    this.info = id;
    return this.save();
}

module.exports = mongoose.model('UserLogin', UserLoginSchema);