import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { getRecordById, updatePost } from '../../redux/actions/recordsAction'

class UpdateRecordPostDetails extends React.Component {
    constructor(props) {
        super(props);
        // call getRecordById to get current record
        this.props.getRecordById(this.props.recordId);
        this.postID = React.createRef();
        this._receiver = React.createRef();
        this._phoneNo = React.createRef();
        this._address = React.createRef();
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
          receiver: this.state.receiver ? this.state.receiver : this._receiver.current.value,
          phoneNo: this.state.phoneNo ? this.state.phoneNo : this._phoneNo.current.value,
          address: this.state.address ? this.state.address : this._address.current.value,
          postId: this.postID.current.value
        }
        //console.log(`post2: ${post}`);
        this.props.updatePost(this.props.recordId, post);
        {/* <Redirect to="records" /> */}
        this.props.history.push('records');
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
                  <input type="hidden" name="postId" value={post._id} ref={this.postID}/>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Receiver Name</label>
                    <div className="col-sm-10">
                      <input type="text" name="receiver" className="form-control" id="receiver" 
                              onChange={this.handleInputChange}
                              defaultValue={post.receiver}
                              ref={this._receiver}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Phone Number</label>
                    <div className="col-sm-10">
                      <input type="text" name="phoneNo" className="form-control" id="phoneNo"
                              onChange={this.handleInputChange}
                              defaultValue={post.phoneNo}
                              ref={this._phoneNo}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                      <input type="text" name="address" className="form-control" id="address" 
                              onChange={this.handleInputChange}
                              defaultValue={post.address}
                              ref={this._address}/>
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

export default withRouter( connect(mapStateToProps, {getRecordById, updatePost})(UpdateRecordPostDetails) );