import React from 'react'
import { Redirect } from 'react-router-dom'

class RecordsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toAddPage: false
        }
    }

    addRecord = () => {
        this.setState({
            toAddPage: true
        })
    }

    dateFormat = (date) => {
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        return day + '/' + monthNames[monthIndex] + '/' + year;
    }

    render() {
        const records = this.props.records;
        console.log("records from props: ",records);
        if(this.state.toAddPage === true) {
            return <Redirect to='/addRecord' />
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
                        <th scope="col">Receiver</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Vip</th>
                        <th scope="col">Items</th>
                        <th scope="col">Sale Price</th>
                        <th scope="col">Count</th>
                        <th scope="col">Purchase Price</th>
                      </tr>
                    </thead>
                  <tbody>
                    {records ? records.map(record => (
                        <tr>
                            <td scope="col">{this.dateFormat(record.date)}</td>
                            <td scope="col">{record.username}</td>
                            <td scope="col">{record.receiver}</td>
                            <td scope="col">{record.phone}</td>
                            <td scope="col">{record.address}</td>
                            <td scope="col">{record.isVip}</td>
                            <td scope="col" colspan="4">
                            {record.items.map(item => {
                                <tr>
                                    <td scope="col">{item.itemName}</td>
                                    <td scope="col">{item.salePrice}</td>
                                    <td scope="col">{item.amount}</td>
                                    <td scope="col">{item.purchasePrice}</td>
                                </tr>
                            })}
                            </td>
                        </tr>
                    )) : 'No Records'}
                  </tbody>
                </table>
            </>
        )
    }
}


export default RecordsTable;