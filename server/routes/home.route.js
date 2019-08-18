const salesController = require('../controller/Sales.ctrl')

module.exports = (router) => {
    router.route('/all').get(salesController.getTotal)
    router.route('/weekly/:year').get(salesController.getWeeklyTotal)
    router.route('/monthly/:year').get(salesController.getMonthlyTotal)
}