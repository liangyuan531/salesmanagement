import { GET_ALL_RECORDS, ADD_RECORDS, DELETE_RECORDS, GET_RECORD, UPDATE_POST } from '../actions/actionType'

const initialState = {
    records: [],
    record: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_RECORDS: 
            return {
                ...state,
                records: action.payload
            }
        case GET_RECORD: 
            return {
                ...state,
                record: action.payload
            }
        case ADD_RECORDS:
            return {
                records: [...state.records, action.payload]
            }
        case DELETE_RECORDS: 
            return {
                records: [...state.records].filter(record => record._id !== action.payload)
            }
        case UPDATE_POST:
            return {
                ...state,
                // update post details of related record
                records: [...state.records].map(record=>{                               
                    if(record.postDetail._id === action.payload.postId){
                        record.postDetail = action.payload
                    }             
                    return record
                })
            }
        default:
            return state;
    }
}