import { GET_TOTAL } from '../actions/actionType'

const initialState = {
    total: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TOTAL: 
            return {
                ...state,
                total: action.payload
            }
        default:
            return state;
    }
}