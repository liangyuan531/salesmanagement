import React from 'react'
import { Redirect } from 'react-router-dom'
import AddRecord from './AddRecord'

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

    render() {
        const records = this.props.records;
        console.log("records",records);
        if(this.state.toAddPage === true) {
            return <Redirect to='/addRecord' />
        }
        return(
            <>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary">Delete</button>
                  <button type="button" class="btn btn-primary" onClick={this.addRecord}>Add</button>
                </div>
                <table class="table">
                  <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Receiver</th>
                        <th scope="col">Items</th>
                        <th scope="col">Sale Price</th>
                        <th scope="col">Count</th>
                        <th scope="col">Purchase Price</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Vip</th>
                      </tr>
                    </thead>
                  <tbody>
                    {/* {records.map((record, index) => (
                        <tr>
                            <th scope="row">index</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    ))} */}
                  </tbody>
                </table>
            </>
        )
    }
}


export default RecordsTable;