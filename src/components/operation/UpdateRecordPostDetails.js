import React from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../../redux/actions/recordsAction'

class UpdateRecordPostDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          record: this.props.getRecordById(this.props.recordId)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
    change = (e) => {

    }
    render() {
        let post = this.props.record.postDetail;
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                  {post ? 
                  <>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Receiver Name</label>
                    <div className="col-sm-10">
                      <input type="text" name="receiver" className="form-control" 
                              id="receiver" value={post.receiver}
                              onChange={this.change}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Phone Number</label>
                    <div className="col-sm-10">
                      <input type="text" name="phoneNo" className="form-control" 
                              id="phoneNo" value={post.phoneNo}
                              onChange={this.change}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                      <input type="text" name="address" className="form-control" 
                              id="address" value={post.address}
                              onChange={this.change}/>
                    </div>
                  </div>    
                  <button type="submit" className="btn btn-primary">Update Details</button>
                  </>
                  : <></>}
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    record: state.records.record
})

export default connect(mapStateToProps, {getRecordById})(UpdateRecordPostDetails);