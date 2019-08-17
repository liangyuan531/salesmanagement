const Validator = require('validator')
const isEmpty = require('./isEmpty')

/**
 * order input fields:
 *  - buyer's name
 *  - sales price
 *  - purchase price (not compulsory)
 *  - amount
 *  - phone number
 *  - address
 */
module.exports = function validateOrderInput(data) {
    let orderErr = {};
    data.username = !isEmpty(data.username) ? data.username : '';
    data.purchasePrice = !isEmpty(data.purchasePrice) ? data.purchasePrice : '';
    data.amount = !isEmpty(data.amount) ? data.amount : '';
    data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : '';
    data.address = !isEmpty(data.address) ? data.address : '';

    if(Validator.isEmpty(data.username)) {
        orderErr.username = `Buyer's name is required`;
    }

    if(Validator.isEmpty(data.purchasePrice)) {
        orderErr.purchasePrice = 'Purchase price is required';
    }

    if(Validator.isEmpty(data.amount)) {
        orderErr.amount = 'Purchase price is required';
    }

    if(Validator.isEmpty(data.phoneNo)) {
        orderErr.phoneNo = 'Phone number is required';
    }

    if(Validator.isEmpty(data.address)) {
        orderErr.address = 'Address is required';
    }

    return {
        orderErr,
        isValid: isEmpty(orderErr)
    }
}