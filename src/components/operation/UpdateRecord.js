import React from 'react'
// import { withRouter } from 'react-router-dom'

const UpdateRecord = (props) => {
    let id = props.location.state.recordId;
    return(
        <div className="update-record">
            {console.log('id: ', id)
            }
            {/* <div className="update-btn">
                <button type="button" className="btn btn-primary" onClick={() => props.history.push({pathname: '/updateRecordItems', state: {recordId: id}})}>Update Record Items</button><br/>
                <button type="button" className="btn btn-primary" onClick={() => props.history.push({pathname: '/updateRecordPostDetails', state: {recordId: id}})}>Update Record Post Details</button>
            </div> */}
        </div>
    )
}

export default UpdateRecord;