const Records = require('../models/Records')
const moment = require('moment')

module.exports = {
    getTotal: (req, res) => {
        Records.find()
                .populate('items')
                .exec((err, records) => {
                    if(err) res.status(400).send({
                        "succsss": false,
                        "message": "cannot find records"
                    });
                    let data = computeTotal(records);
                    res.status(200).send({
                        "success": true,
                        "data": data
                    });
                });
    },
    getWeeklyTotal: (req, res) => {

    },
    getMonthlyTotal: (req, res) =>{
        let myear = req.params.year;
        // store records based on month
        let months = new Array(12);
        Records.find({
            "$expr": {                         
                "$eq": [{"$year": "$date"}, parseInt(myear)] // $date: date field in document
            }})
            .populate('items')
            .exec((err, records) => {
                if(err) res.status(400).send({
                    "succsss": false,
                    "message": "cannot find records"
                });
                // classify records by month
                records.map(record=>{
                    let month = moment(record.date).month();
                    // each month can store multiple records
                    if(months[month] === undefined){
                        months[month] = new Array();
                    }
                    months[month].push(record);
                })
                let data = [];
                for(let recordsByMonth of months) {
                    // record exist, store 
                    if(recordsByMonth !== undefined){
                        data.push(computeTotal(recordsByMonth));
                    }else{
                        data.push(null);
                    }
                }
                res.status(200).send({
                    "success": true,
                    "data": data
                });
            });
    }
}

// compute total of records
computeTotal = (records) => {
    let totalSale = 0, totalCost = 0;
    for(let record of records){
        let subSale = 0, subCost = 0;
        record.items.map(item=>{
            subSale += item.salePrice * item.amount;
            subCost += item.purchasePrice * item.amount;
        })
        totalSale += subSale;
        totalCost += subCost;
    }
    return {"totalSale": totalSale, "totalCost": totalCost}
}