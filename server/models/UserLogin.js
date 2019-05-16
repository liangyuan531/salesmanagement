const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true},
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.export = mongoose.model('UserLogin', UserLoginSchema);