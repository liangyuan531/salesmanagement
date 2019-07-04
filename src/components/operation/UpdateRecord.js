import React from 'react'
// import { withRouter } from 'react-router-dom'

const UpdateRecord = (props) => {
    // let id = this.props.location.recordId;
    return(
        <div className="update-record">
            {console.log('id: ', props.location.state.recordId)
            }
            <div className="update-btn">
                <button type="button" className="btn btn-primary" onClick={() => props.history.push('/updateRecord/items')}>Update Record Items</button><br/>
                <button type="button" className="btn btn-primary" onClick={() => props.history.push('/updateRecord/postDetails')}>Update Record Post Details</button>
            </div>
        </div>
    )
}

export default UpdateRecord;