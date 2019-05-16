const Records = require('../models/Records');

module.exports = {
    getAllRecords: (req, res) => {
        console.log(req.body);
    },

    addRecord: (req, res) => {
        console.log(req.body);
    },

    updateRecord: (req, res) => {
        console.log(req.params.id);
    },

    deleteRecord: (req, res) => {
        console.log(req.params.id);
    },
    /** 
     * users view their own orders
     * implement later
     * */ 
    getUserRecords: (req, res) => {

    }
}