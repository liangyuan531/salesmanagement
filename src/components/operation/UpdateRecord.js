import React from 'react'
// import { withRouter } from 'react-router-dom'

const UpdateRecord = ({history}) => {
    let id = this.props.location.recordId;
    return(
        <div className="update-record">
            {id}
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary" onClick={() => history.push('/updateRecord/items')}>Update Record Items</button>
                <button type="button" className="btn btn-primary" onClick={() => history.push('/updateRecord/postDetails')}>Update Record Post Details</button>
            </div>
        </div>
    )
}

export default UpdateRecord;