import React from 'react'
import { connect } from 'react-redux'
import { getRecordById, updatePost } from '../../redux/actions/recordsAction'

class UpdateRecordPostDetails extends React.Component {
    constructor(props) {
        super(props);
        // call getRecordById to get current record
        this.props.getRecordById(this.props.recordId);
        this.state = {
          //record: this.props.getRecordById(this.props.recordId),
          receiver: '',
          phoneNo: '',
          address: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const data = new FormData(e.target);
        // const post = [...data.entries()];
        // console.log(`post: ${post}`);
        const post = {
          receiver: this.state.receiver,
          phoneNo: this.state.phoneNo,
          address: this.state.address,
          postId: e.target.value
        }
        //console.log(`post2: ${post}`);
        this.props.updatePost(post);
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
                  <input type="hidden" name="postId" value={post._id}/>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Receiver Name</label>
                    <div className="col-sm-10">
                      <input type="text" name="receiver" className="form-control" id="receiver" 
                              onChange={this.handleInputChange}
                              defaultValue={post.receiver}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Phone Number</label>
                    <div className="col-sm-10">
                      <input type="text" name="phoneNo" className="form-control" id="phoneNo"
                              onChange={this.handleInputChange}
                              defaultValue={post.phoneNo}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                      <input type="text" name="address" className="form-control" id="address" 
                              onChange={this.handleInputChange}
                              defaultValue={post.address}/>
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

export default connect(mapStateToProps, {getRecordById, updatePost})(UpdateRecordPostDetails);