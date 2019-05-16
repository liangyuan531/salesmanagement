const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    phone: {type: String, required: true, trim: true},
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }]
})

UserDetailsSchema.methods.addAddress = function(address) {
    this.address.push(address);
    return this.save()
}

module.export = mongoose.model('UserDetails', UserDetailsSchema);