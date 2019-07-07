import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteRecord } from '../redux/actions/recordsAction'

class RecordsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toAddPage: false,
            toUpdateItem: false,
            toUpdatePostDetails: false,
            recordId: ''
        }
    }

    addRecord = () => {
        this.setState({
            toAddPage: true
        })
    }

    dateFormat = (date) => {
        return date.slice(0,10);
    }

    updateRecordItems = (id) => {
        this.setState({
            toUpdateItem: true,
            recordId: id
        })
    }

    updateRecordPost = (id) => {
        this.setState({
            toUpdatePostDetails: true,
            recordId: id
        })
    }

    deleteRecord = (id) => {
        this.props.deleteRecord(id);
    }
    render() {
        const records = this.props.records;
        console.log("records from props: ",records);
        if(this.state.toAddPage === true) {
            return <Redirect to='/addRecord' />
        }
        if(this.state.toUpdateItem === true) {
            return <Redirect to={{
                        pathname: "/updateRecordItems",
                        state: this.state.recordId
                    }} />
        }
        if(this.state.toUpdatePostDetails === true) {
            return <Redirect to={{
                        pathname: "/updateRecordPostDetails",
                        state: this.state.recordId
                    }} />
        }
        return(
            <>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-danger">Delete</button>
                  <button type="button" className="btn btn-primary" onClick={this.addRecord}>Add</button>
                </div>
                <table className="table">
                  <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Vip</th>
                        <th scope="col">Receiver</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Items</th>
                        <th scope="col">Sale Price</th>
                        <th scope="col">Count</th>
                        <th scope="col">Purchase Price</th>
                        <th></th>
                      </tr>
                    </thead>
                  <tbody>
                    {records ? records.map(record => (
                        <tr key={record._id}>
                            <td>{this.dateFormat(record.date)}</td>
                            <td>{record.user.username}</td>
                            <td>{record.user.isVip ? 'Yes' : 'No'}</td>
                            <td>{record.postDetail.receiver}</td>
                            <td>{record.postDetail.phoneNo}</td>
                            <td>{record.postDetail.address}</td> 
                            <td colSpan="4">
                                <table className="table">
                                    <tbody>
                                        {record.items.map(item =>(
                                            <tr key={item._id}>
                                                <td align="left">{item.itemName}</td>
                                                <td align="left">{item.salePrice}</td>
                                                <td align="left">{item.amount}</td>
                                                <td align="left">{item.purchasePrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <div className="btn-group-vertical" role="group">
                                    <button type="button" className="btn btn-success" onClick={() => this.updateRecordItems(record._id)}>Update Items</button>
                                    <button type="button" className="btn btn-success" onClick={() => this.updateRecordPost(record._id)}>Update Post</button>
                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(record._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    )) : 'No Records'}
                  </tbody>
                </table>
            </>
        )
    }
}


export default withRouter( connect(null, { deleteRecord })(RecordsTable) );