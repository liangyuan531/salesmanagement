const Records = require('../models/Records')
const User = require('../models/User')
const PostDetails = require('../models/PostDetails')
const Item = require('../models/Item')
const validateInput = require('../validation/order.validation')

module.exports = {
    getAllRecords: (req, res) => {
        Records.find()
                .populate('user')
                .populate('items')
                .populate('postDetail')
                .exec((err, records) => {
                    if(err) {
                        res.status(400).send({
                            "succsss": false,
                            "message": `cannot find record with id: ${recordId}`
                        });
                        return 0;
                    }
                    res.status(200).send({
                        "success": true,
                        "records": records
                    });
                });
    },
    getRecordById: (req, res) => {
        let recordId = req.params.id;
        Records.findById(recordId)
                .populate('user')
                .populate('items')
                .populate('postDetail')
                .exec((err, record) => {
                    if(err) {
                        res.status(400).send({
                            "succsss": false,
                            "message": `cannot find record with id: ${recordId}`
                        });
                        return 0;
                    }
                    res.status(200).send({
                        "success": true,
                        "record": record
                    })
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
        let record = req.body;
        //console.log("data: ", record);
        /* validate input */
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
                    if(err) {
                        res.status(400).send({
                            "success": false,
                            "message": 'cannot create user'
                        });
                        return 0;
                    }
                    crateNewRecords(user, record);
                });
            }
        })

        function crateNewRecords(user, record) {
            new Records({
                date: new Date()
            }).save((err, newRecord) => {
                if(err) {
                    res.status(400).send({
                        "success": false,
                        "record": "cannot create record"
                    });
                    return 0;
                }
                new PostDetails({
                    receiver: record.receiver,
                    phoneNo: record.phone,
                    address: record.address
                }).save((err, postDetail) => {
                    if(err) {
                        res.status(400).send({
                            "success": false,
                            "record": "cannot create post details"
                        });
                        return 0;
                    }
                    user.addPostDetails(postDetail._id).then((user)=>{
                        // add user to record
                        newRecord.applyUser(user._id).then(newRecord=>{
                            // record add postdetails
                            newRecord.addPostDetail(postDetail._id).then(newRecord=>{
                                // add purchased items to post detail
                                let itemsTemp = [];
                                for(let i=0;i<record.items.length;i++){ 
                                    new Item({
                                        itemName: record.items[i].itemName,
                                        purchasePrice: record.items[i].purchasePrice,
                                        salePrice: record.items[i].salePrice,
                                        amount: record.items[i].amount,
                                    }).save((err, item)=>{
                                        // add items to record
                                        itemsTemp.push(item); 
                                        if(itemsTemp.length === record.items.length){
                                            newRecord.addItems(itemsTemp).then(newRecord=>{
                                                res.status(200).send({
                                                    "success": true,
                                                    "record": newRecord
                                                });
                                            })
                                        }
                                    });
                                }     
                            })
                        })
                    })
                })
            })
        }   
    },

    updateRecordItems: (req, res) => {
        let recordId = req.params.id;
        let itemsData = req.body
        // dealing itemsData
        let items = [];
        for(let i=0;i<itemsData.length;i+=5) {
            let temp = {};
            temp['itemId'] = itemsData[i][1];
            temp['itemName'] = itemsData[i+1][1];
            temp['purchasePrice'] = itemsData[i+2][1];
            temp['salePrice'] = itemsData[i+3][1];
            temp['amount'] = itemsData[i+4][1];
            items.push(temp);
        }
        
        let promise = items.map(item=>(
            Item.findOneAndUpdate(
                {_id: item.itemId},
                {
                    itemName: item.itemName,
                    purchasePrice: item.purchasePrice,
                    salePrice: item.salePrice,
                    amount: Number(item.amount)
                }
            ).exec()
        ))
        if(promise.length === items.length){
            res.status(200).send({
                "success": true,
                "items": items
            })
        }else{
            res.status(400).send({
                "success": false,
                "message": "update items failed"
            })
        }
    },

    updateRecordPostDetail: (req, res) => {
        // let recordId = req.params.id;
        let postData = req.body
        // update post details
        PostDetails.findOneAndUpdate(
                {_id: postData.postId}, 
                {
                    receiver: postData.receiver,
                    phoneNo: postData.phoneNo,
                    address: postData.address
                },
                {new: true})
                .exec((err, post)=>{
                    if(err) res.status(400).send({
                        "success": false,
                        "message": "update post details failed"
                    })
                    res.status(200).send({
                        "success": true,
                        "post_details": post
                    });
                });
    },

    deleteRecord: (req, res) => {
        let recordId = req.params.id;
        // delete record items
        Records.findById(recordId)
                .exec((err, record) => {
                    record.items.map(item => {
                        Item.findByIdAndRemove(item._id, err => {
                            if(err) res.status(400).send({
                                "success": false,
                                "message": `delete item: ${item._id} failed`
                            })
                        });
                    })
                })
        // delete post details
        Records.findById(recordId)
                .exec((err, record) => {
                    console.log("record: ",record);
                    
                    PostDetails.findByIdAndRemove(record.postDetail._id, err => {
                        if(err) res.status(400).send({
                            "success": false,
                            "message": `delete post detail: ${record.postDetail._id} failed`
                        })
                    });
                    // delele record
                    Records.findByIdAndRemove(recordId, err => {
                        if(err) res.status(400).send({
                            "success": false,
                            "message": `delete record: ${recordId} failed`
                        });
                        res.status(200).send({
                            "success": true,
                            "recordId": recordId
                        });
                    });
                })
    },
    /** 
     * users view their own orders
     * implement later
     * */ 
    getUserRecords: (req, res) => {

    }
}