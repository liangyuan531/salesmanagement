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
        let year = req.params.year;
        // store records based on month
        getMonthlyOrWeeklyTotal(year, 'weekly', res);  
    },
    getMonthlyTotal: (req, res) =>{
        let year = req.params.year;
        // store records based on month
        getMonthlyOrWeeklyTotal(year, 'monthly', res);  
    }
}

getMonthlyOrWeeklyTotal = (year, unit, res) => {
    let periods = null;
    if(unit === 'monthly'){
        periods = new Array(12);
    }else if(unit === 'weekly'){
        periods = [];
    }else {
        return 0;
    }
    let data = [];
    Records.find({
        "$expr": {                         
            "$eq": [{"$year": "$date"}, parseInt(year)] // $date: date field in document
        }})
        .populate('items')
        .exec((err, records) => {
            if(err) {
                res.status(400).send({
                    "success": false,
                    "message": "cannot find records"
                })
            }
            // classify records by month
            records.map(record=>{
                let period = null;
                if(unit === 'monthly') period = moment(record.date).month();
                if(unit === 'weekly') period = moment(record.date).week();
                // each month can store multiple records
                if(periods[period] === undefined){
                    periods[period] = new Array();
                }
                periods[period].push(record);
            })
            
            for(let recordsByPeriod of periods) {
                // record exist, store 
                if(recordsByPeriod !== undefined){
                    data.push(computeTotal(recordsByPeriod));
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