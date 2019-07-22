const recordsController = require('../controller/Records.ctrl')

module.exports = (router) => {
    router.route('/records/admin').get(recordsController.getAllRecords)
    router.route('/records/add').post(recordsController.addRecord)
    router.route('/records/update/items:id').put(recordsController.updateRecordItems)
    router.route('/records/update/postDetail/:id').put(recordsController.updateRecordPostDetail)
    router.route('/records/:id').delete(recordsController.deleteRecord)
    router.route('/records/user/:id').get(recordsController.getUserRecords)
    router.route('/record/:id').get(recordsController.getRecordById)
}