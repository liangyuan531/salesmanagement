const recordsController = require('../controller/Records.ctrl')

module.exports = (router) => {
    router.route('/records/admin').get(recordsController.getAllRecords),
    router.route('/records/add').post(recordsController.addRecord),
    router.route('/records/:id').put(recordsController.updateRecord),
    router.route('/records/:id').delete(recordsController.deleteRecord),
    router.route('/records/user/:id').get(recordsController.getUserRecords)
}