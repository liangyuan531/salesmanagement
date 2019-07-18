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
        console.log("update id: ", this.state.id);
        return(
            <div className="update-record">
                <UpdateRecordItems recordId={this.state.id}/>
                <br/>
                <UpdateRecordPostDetails recordId={this.state.id}/>
            </div>
        )
    }
    // let id = props.location.state.recordId;
    // return(
    //     <div className="update-record">
    //         {console.log('id: ', id)
    //         }
    //         <div className="update-btn">
    //             <button type="button" className="btn btn-primary" onClick={() => props.history.push({pathname: '/updateRecordItems', state: {recordId: id}})}>Update Record Items</button><br/>
    //             <button type="button" className="btn btn-primary" onClick={() => props.history.push({pathname: '/updateRecordPostDetails', state: {recordId: id}})}>Update Record Post Details</button>
    //         </div>
    //     </div>
    // )
}

export default UpdateRecord;