const Records = require('../models/Records')
const User = require('../models/User')
const PostDetails = require('../models/PostDetails')
const Item = require('../models/Item')

const validateInput = require('../validation/order.validation')

const crateNewRecords = (data, user, record, postDetail, res) => {
    // add purchased items to post detail
    for(let i=0;i<data.itemName.length;i++){
        const item = new Item({
            itemName: data.itemName[i],
            purchasePrice: data.purchasePrice[i],
            salePrice: data.salePrice[i],
            amount: data.amount[i],
        })
        item.save();
        postDetail.addItem(mongoose.Types.ObjectId(item._id));
        // add items to record
        record.addItem(mongoose.Types.ObjectId(item._id));
    }
    user.addPostDetails(mongoose.Types.ObjectId(postDetail._id));
    // add user to record
    record.applyUser(mongoose.Types.ObjectId(user._id));
    return res.send(record);
}

module.exports = {
    getAllRecords: (req, res) => {
        console.log(req.body);
        Records.find({})
                .populate({path: 'user', populate: {path: 'postDetails'}})
                .populate('items')
                .exec(function(err, records) {
                    console.log('records: ', records);
                    if(err) res.send('cannot find records');
                    res.send(records);
                });
    },

    addRecord: (req, res) => {
        console.log(req.body);
        // here, data should have 3 parts infomation:
        // 1. user (username, isVip)
        // 2. post details (receiver, phone number, address)
        // 3. record's items (itemName, price, amount)
        let data = req.body;
        //let {orderErr, isValid} = validateInput(data);

        // if validation not passing, return error
        // if(!isValid) {
        //     return res.status(400).send(orderErr);
        // }
        const postDetail = new PostDetails({
            receiver: data.receiver,
            phoneNo: data.phoneNo,
            address: data.address
        })
        postDetail.save();

        const record = new Records({
            date: new Date()
        })
        record.save();
        
        /**
         * save record
         */
        User.findOne({
            username: date.username
        }).then(user => {
            // if the user exists, add order and post details
            if(user) {
                crateNewRecords(data, user, record, postDetail, res);
            }else { 
                new User({
                    username: data.username,
                    isVip: data.isVip
                }).save((err, user) => {
                    if(err) res.send('cannot create user');
                    crateNewRecords(data, user, record, postDetail, res);
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
            .exec((err, record) => {
                console.log('delete record: ', record);
                Item.findByIdAndRemove(record.items.map(item => item._id));
            })
            //.populate('items')
        // delele record
        Records.findByIdAndRemove(recordId)
    },
    /** 
     * users view their own orders
     * implement later
     * */ 
    getUserRecords: (req, res) => {

    }
}