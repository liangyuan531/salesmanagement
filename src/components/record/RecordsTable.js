import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteRecord } from '../../redux/actions/recordsAction'

class RecordsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toAddPage: false,
            currentPage: 1,
            recordsPerPage: 5
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

    updateRecord = (id) => {
        this.props.history.push({
                    pathname: '/updateRecord', 
                    state: {recordId: id}
                });
    }

    deleteRecord = (id) => {
        let result = this.props.deleteRecord(id);
        result.then(res=>{
            console.log("res: ", res)
            if(res.success === true)
            alert("delete successfully");  
        });     
    }

    computeTotal = (records) => {
        let total = 0;
        for(let record of records) {
            let subTotal = 0;
            record.items.map(item=>{
                subTotal += item.amount * item.salePrice;
            })
            total += subTotal;
        }
        return total;
    }

    handleClick = (e) => {
        this.setState({
            currentPage: Number(e.target.id)
        })
    }

    btnPrevious = (e) => {
        if(this.state.currentPage > 1) {
            this.setState({currentPage: this.state.currentPage-1})
        }
    }

    btnNext = (e) => {
        if(this.state.currentPage < Math.ceil(this.props.records.length / this.state.recordsPerPage)) {
            this.setState({currentPage: this.state.currentPage+1})
        }
    }

    render() {
        const records = this.props.records;
        const { currentPage, recordsPerPage } = this.state;
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
        const renderRecords = currentRecords.map(record => (
            <tr key={record._id} className="record">
                <td>{this.dateFormat(record.date)}</td>
                <td>{record.user.username}</td>
                <td>{record.user.isVip ? 'Yes' : 'No'}</td>
                <td>{record.postDetail.receiver}</td>
                <td>{record.postDetail.phoneNo}</td>
                <td>{record.postDetail.address}</td> 
                <td colSpan="4">
                    <table className="table">
                        <tbody>
                            {record.items.map((item, index) =>(
                                <tr key={index}>
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
                        <button type="button" className="btn btn-success" onClick={() => this.updateRecord(record._id)}>Update</button>
                        <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(record._id)}>Delete</button>
                    </div>
                </td>
            </tr>
        ))
        const pageNumbers = [];
        for(let i=1;i<=Math.ceil(this.props.records.length / recordsPerPage);i++){
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number=>{
            return(
                <li className="page-item" key={number} >
                    <button className="page-link" id={number} onClick={this.handleClick}>{number}</button>
                </li>
            )
        })
        if(this.state.toAddPage === true) {
            return <Redirect to='/addRecord' />
        }
        let total = this.computeTotal(records);
        let subtotal = this.computeTotal(currentRecords);
        return(
            <>
                <div className="btn-group" role="group">
                  {/* <button type="button" className="btn btn-danger">Delete</button> */}
                  <button type="button" className="btn btn-primary" onClick={this.addRecord}>Add</button>
                </div>
                <table className="table table-sm">
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
                        {renderRecords}
                        <tr className="sub-total">
                          <td>SubTotal</td>
                          <td>${subtotal}</td>
                        </tr> 
                        <tr className="total">
                          <td>Total</td>
                          <td>${total}</td>
                        </tr>      
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {this.state.currentPage === 1 ? 
                            <li className="page-item disabled">
                                <button className="page-link">&laquo;</button>
                            </li>
                            :
                            <li className={`page-item`}>
                              <button className="page-link" onClick={this.btnPrevious}>&laquo;</button>
                            </li>
                        }
                        {renderPageNumbers}
                        {this.state.currentPage === pageNumbers.length ?
                            <li className="page-item disabled">
                              <button className="page-link">&raquo;</button>
                            </li>
                            :
                            <li className="page-item">
                              <button className="page-link" onClick={this.btnNext}>&raquo;</button>
                            </li>
                        }
                    </ul>
                </nav>
            </>
        )
    }
}


export default withRouter( connect(null, { deleteRecord })(RecordsTable) );