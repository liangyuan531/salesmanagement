import { GET_ALL_RECORDS, ADD_RECORDS } from '../actions/actionType'

const initialState = {
    records: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_RECORDS: 
            return {
                ...state,
                records: action.payload
            }
        case ADD_RECORDS:
            return {
                records: [...state.records, action.payload]
            }
        default:
            return state;
    }
}