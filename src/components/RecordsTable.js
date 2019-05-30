import React from 'react';

class RecordsTable extends React.Component {
    render() {
        const records = this.props.records;
        return(
            <div>
                <table class="table">
                  <thead>
                      <tr>
                        <th scope="col">#</th>
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
                    {records.map((record, index) => {
                        <tr>
                            <th scope="row">index</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    })}
                  </tbody>
                </table>
            </div>
        )
    }
}


export default RecordsTable;