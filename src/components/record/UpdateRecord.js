import React from 'react'
import UpdateRecordItems from './UpdateRecordItems'
import UpdateRecordPostDetails from './UpdateRecordPostDetails'
// import { withRouter } from 'react-router-dom'

class UpdateRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.recordId
        }
    }
    render() {
        console.log("update record id: ", this.state.id);
        return(
            <div className="update-record">
                <UpdateRecordItems recordId={this.state.id}/>
                <br/>
                <UpdateRecordPostDetails recordId={this.state.id}/>
            </div>
        )
    }
}

export default UpdateRecord;