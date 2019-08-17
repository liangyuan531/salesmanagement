const record = require('./records.route')
const home = require('./home.route')

module.exports = (router) => {
    record(router)
    home(router)
}