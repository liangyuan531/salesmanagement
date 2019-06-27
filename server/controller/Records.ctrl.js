const Records = require('../models/Records')
const User = require('../models/User')
const PostDetails = require('../models/PostDetails')
const Item = require('../models/Item')

const validateInput = require('../validation/order.validation')

const crateNewRecords = (data, user, record, postDetail, res) => {
    // add purchased items to post detail
    for(let i=0;i<data.items.length;i++){
        const item = new Item({
            itemName: data.items[i].itemName,
            purchasePrice: data.items[i].purchasePrice,
            salePrice: data.items[i].salePrice,
            amount: data.items[i].amount,
        })
        item.save();
        console.log('item saved');
        postDetail.addItem(item._id);
        // add items to record
        record.addItem(item._id);
    }
    user.addPostDetails(postDetail._id);
    // add user to record
    record.applyUser(user._id);
    console.log('record: ', record);
    
    return res.send(record);
}

module.exports = {
    getAllRecords: (req, res) => {
        console.log("records controller ========================");
        Records.find()
                .populate({path: 'user', populate: {path: 'postDetails'}})
                .populate('items')
                .exec((err, records) => {
                    console.log('records: ', records);
                    if(err) res.send('cannot find records');
                    res.send(records);
                });
    },
    /*
        { username: 'admin',
          receiver: 'jack',
          phone: '0413607664',
          address: '1/4 Oliver St, ',
          isVip: 'no',
          items:
           [ { itemName: 'vc',
               salePrice: '100',
               purchasePrice: '90',
               amount: '1' },
             { itemName: 'vd',
               salePrice: '100',
               purchasePrice: '90',
               amount: '1' } ] 
        }
    */
    addRecord: (req, res) => {
        //console.log("server data: ",req.body);
        // here, data should have 3 parts infomation:
        // 1. user (username, isVip)
        // 2. post details (receiver, phone number, address)
        // 3. record's items (itemName, price, amount)
        let data = req.body;
        let record = {};
        // process input data, extract data except items
        for(let i=0;i<5;i++) {
            record[data[i][0]] = data[i][1];
        }
        //console.log('1st proceed record: ', record);
        let items = [];
        let item = {};
        // process items, add them into an array
        for(let i=5;i<data.length;i++) {
            item[data[i][0]] = data[i][1];
            //console.log('item: ', item);
            if(data[i][0] === 'amount'){
                items.push(item);
                item = {}
            }
        }
        //console.log('proceed items: ', items);
        // add items to record
        record['items'] = items;
        //console.log('2nd proceed record: ', record);
        //let {orderErr, isValid} = validateOrderInput(data);

        // if validation not passing, return error
        // if(!isValid) {
        //     return res.status(400).send(orderErr);
        // }
        const postDetail = new PostDetails({
            receiver: record.receiver,
            phoneNo: record.phone,
            address: record.address
        })
        postDetail.save();

        const newRecord = new Records({
            date: new Date()
        })
        newRecord.save();
        
        /**
         * save record
         */
        User.findOne({
            username: record.username
        }).then(user => {
            // if the user exists, add order and post details
            if(user) {
                console.log('exist user \n');
                crateNewRecords(record, user, newRecord, postDetail, res);
            }else { 
                console.log('create user \n');
                new User({
                    username: record.username,
                    isVip: record.isVip
                }).save((err, user) => {
                    if(err) res.send('cannot create user');
                    crateNewRecords(record, user, newRecord, postDetail, res);
                });
            }
        })
    },

    updateRecord: (req, res) => {
        console.log(req.params.id);
        console.log(req.body);
        let recordId = mongoose.Types.ObjectId(req.params.id);
        Records.findById(recordId)
    },

    deleteRecord: (req, res) => {
        console.log(req.params.id);
        // delete record items
        Records.findById(recordId)
                .populate('items')
                .exec((err, record) => {
                    console.log('delete record: ', record);
                    record.items.map(item => {
                        Item.findByIdAndRemove(item._id);
                    })
                })
        // delele record
        Records.findByIdAndRemove(recordId, err => {
            if(err) res.json({'message': '0'});
            res.json({'message': '1'})
        });
    },
    /** 
     * users view their own orders
     * implement later
     * */ 
    getUserRecords: (req, res) => {

    }
}