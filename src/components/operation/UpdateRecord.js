import React from 'react'
// import { withRouter } from 'react-router-dom'

const UpdateRecord = (props) => {
    // let id = this.props.location.recordId;
    return(
        <div className="update-record">
            {console.log('id: ', props.location.recordId)
            }
            <button type="button" className="btn btn-primary" onClick={() => props.history.push('/updateRecord/items')}>Update Record Items</button>
            <button type="button" className="btn btn-primary" onClick={() => props.history.push('/updateRecord/postDetails')}>Update Record Post Details</button>
        </div>
    )
}

export default UpdateRecord;