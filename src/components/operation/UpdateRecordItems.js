import React from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../../redux/actions/recordsAction'

class UpdateRecordItems extends React.Component {
    constructor(props) {
        super(props);
        // get history parms (recordId)
        // let recordId = this.props.location.state.recordId
        // find record based on id
        // this.props.getRecordById(recordId)
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        //let items = this.props.record.items
        return(
            <div className="update-record">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Item Name</label>
                    <div className="col-sm-10">
                      <input type="text" name="itemName" className="form-control" id="itemName" value="User name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Purchase Price</label>
                    <div className="col-sm-10">
                      <input type="text" name="purchasePrice" className="form-control" id="purchasePrice" value="Receiver name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Sale Price</label>
                    <div className="col-sm-10">
                      <input type="text" name="salePrice" className="form-control" id="salePrice" value="Phone Number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Amount</label>
                    <div className="col-sm-10">
                      <input type="text" name="amount" className="form-control" id="amount" value="Address" />
                    </div>
                  </div>     
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    record: state.records.record
})


export default connect(mapStateToProps, {getRecordById})(UpdateRecordItems);