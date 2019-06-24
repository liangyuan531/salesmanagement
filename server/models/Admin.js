const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    adminName: {type: String, unique: true, required: true, trim: true},
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('Admin', AdminSchema);