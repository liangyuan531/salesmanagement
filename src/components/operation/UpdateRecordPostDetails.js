import React from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../../redux/actions/recordsAction'

class UpdateRecordPostDetails extends React.Component {
    constructor(props) {
        super(props);
        // get history parms (recordId)
        // let recordId = this.props.location.state.recordId
        // console.log("update post detail: ", recordId);
        this.state = {
         
        }
        // find record based on id
        // this.props.getRecordById(recordId)
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        //console.log("update post detail: ", this.state.recordId);
        // let postDetail = this.props.record.postDetail
        return(
            <>
              post details
                {/* <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Receiver Name</label>
                    <div className="col-sm-10">
                      <input type="text" name="receiver" className="form-control" id="receiver" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Phone Number</label>
                    <div className="col-sm-10">
                      <input type="text" name="phoneNo" className="form-control" id="phoneNo" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                      <input type="text" name="address" className="form-control" id="address" />
                    </div>
                  </div>    
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form> */}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    record: state.records.record
})

export default connect(mapStateToProps, {getRecordById})(UpdateRecordPostDetails);