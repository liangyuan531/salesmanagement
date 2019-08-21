import { GET_TOTAL, GET_MONTHLY_TOTAL, GET_WEEKLY_TOTAL} from '../actions/actionType'

const initialState = {
    total: {},
    monthlyTotal: [],
    weeklyTotal: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TOTAL: 
            return {
                ...state,
                total: action.payload
            }
        case GET_MONTHLY_TOTAL:
            return {
                ...state,
                monthlyTotal: action.payload
            }
        case GET_WEEKLY_TOTAL:
            return {
                ...state,
                weeklyTotal: action.payload
            }
        default:
            return state;
    }
}