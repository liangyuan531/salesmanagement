const homeController = require('../controller/Home.ctrl')

module.exports = (router) => {
    router.route('/all').get(homeController.getTotal)
    router.route('/weekly/:year').get(homeController.getWeeklyTotal)
    router.route('/monthly/:year').get(homeController.getMonthlyTotal)
}