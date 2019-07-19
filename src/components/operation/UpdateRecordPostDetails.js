import React from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../../redux/actions/recordsAction'

class UpdateRecordPostDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          record: this.props.getRecordById(this.props.recordId),
          receiver: '',
          phoneNo: '',
          address: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const post = [...data.entries()];
        console.log(`post: ${post}`);
        const post2 = {
          receiver: this.state.receiver,
          phoneNo: this.state.phoneNo,
          address: this.state.address
        }
        console.log(`post2: ${post2}`);
    }
    handleInputChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
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
                              onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Phone Number</label>
                    <div className="col-sm-10">
                      <input type="text" name="phoneNo" className="form-control" 
                              id="phoneNo" value={post.phoneNo}
                              onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                      <input type="text" name="address" className="form-control" 
                              id="address" value={post.address}
                              onChange={this.handleInputChange}/>
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