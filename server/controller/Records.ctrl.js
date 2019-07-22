const Records = require('../models/Records')
const User = require('../models/User')
const PostDetails = require('../models/PostDetails')
const Item = require('../models/Item')
const validateInput = require('../validation/order.validation')



module.exports = {
    getAllRecords: (req, res) => {
        console.log("records controller ========================");
        Records.find()
                //.populate({path: 'user', populate: {path: 'postDetails'}})
                .populate('user')
                .populate('items')
                .populate('postDetail')
                .exec((err, records) => {
                    console.log('records: ', records);
                    if(err) res.send('cannot find records');
                    res.send(records);
                });
    },
    getRecordById: (req, res) => {
        let recordId = req.params.id;
        Records.findById(recordId)
                .populate('user')
                .populate('items')
                .populate('postDetail')
                .exec((err, record) => {
                    console.log("find record by id: ", record);
                    if(err) res.send('cannot find record with id: ', recordId);
                    res.send(record)
                })
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
        /** 
            here, data should have 3 parts infomation:
            1. user (username, isVip)
            2. post details (receiver, phone number, address)
            3. record's items (itemName, salePrice, purchasePrice, amount)
        */
        let data = req.body;
        let record = {};
        // process input data, extract data except items
        for(let i=0;i<5;i++) {
            record[data[i][0]] = data[i][1];
        }
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
        // add items to record
        record['items'] = items;
        //console.log('proceed record: ', record);
        //let {orderErr, isValid} = validateOrderInput(record);
        // if validation not passing, return error
        // if(!isValid) {
        //     return res.status(400).send(orderErr);
        // }
        
        /**
         * save record
         */
        User.findOne({
            username: record.username
        }).then(user => {
            // if the user exists, add order and post details
            if(user) {
                console.log(`exist user ${user} \n`);
                crateNewRecords(user, record);
            }else { 
                console.log('create user \n');
                new User({
                    username: record.username,
                    isVip: record.isVip
                }).save((err, user) => {
                    if(err) res.send('cannot create user');
                    crateNewRecords(user, record);
                });
            }
        })

        function crateNewRecords(user, record) {
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
            // add purchased items to post detail
            for(let i=0;i<record.items.length;i++){
                const item = new Item({
                    itemName: record.items[i].itemName,
                    purchasePrice: record.items[i].purchasePrice,
                    salePrice: record.items[i].salePrice,
                    amount: record.items[i].amount,
                })
                item.save();
                console.log('item saved');
                postDetail.addItem(item._id);
                // add items to record
                newRecord.addItem(item._id);
            }
            user.addPostDetails(postDetail._id);
            // add user to record
            newRecord.applyUser(user._id);
            // record add postdetails
            newRecord.addPostDetail(postDetail._id)
            console.log('record: ', newRecord);
            return res.send(newRecord);
        }
    },

    updateRecordItems: (req, res) => {
        // let recordId = req.params.id;
        // let postData = req.body
        // console.log(recordId);
        // console.log(postData);
        // Records.findById(recordId)
    },

    updateRecordPostDetail: (req, res) => {
        let recordId = req.params.id;
        let postData = req.body
        console.log(recordId);
        console.log(postData);
        // Records.findById(recordId)
        // update post details
        PostDetails.findOneAndUpdate(
                postData._id, 
                {
                    receiver: postData.receiver,
                    phoneNo: postData.phoneNo,
                    address: postData.address
                }).exec((err, post) => res.send(post));
        // get updated record
        // Records.findById(recordId)
        //     .populate('user')
        //     .populate('items')
        //     .populate('postDetail')
        //     .exec((err, record) => {
        //         console.log("updated record: ", record);
        //         if(err) res.send('cannot update record: ', recordId);
        //         res.send(record)
        //     })
    },

    deleteRecord: (req, res) => {
        let recordId = req.params.id;
        // delete record items
        Records.findById(recordId)
                .exec((err, record) => {
                    record.items.map(item => {
                        Item.findByIdAndRemove(item._id, err => {
                            if(err) res.send({'message': '-1'})
                        });
                    })
                })
        // delete post details
        Records.findById(recordId)
                .exec((err, record) => {
                    PostDetails.findByIdAndRemove(record.postDetail._id, err => {
                        if(err) res.send({'message' : '-1'})
                    });
                })
        // delele record
        Records.findByIdAndRemove(recordId, err => {
            if(err) res.send({'message': '-1'});
        });
        res.send(recordId);
    },
    /** 
     * users view their own orders
     * implement later
     * */ 
    getUserRecords: (req, res) => {

    }
}