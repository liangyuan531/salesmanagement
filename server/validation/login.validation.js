const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput(data) {
    let loginErr = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        loginErr.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        loginErr.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 20})) {
        loginErr.password = 'Password must range from 6 to 20 chars';
    }

    if(Validator.isEmpty(data.password)) {
        loginErr.password = 'Password is required';
    }

    return {
        loginErr,
        isValid: isEmpty(loginErr)
    }
}