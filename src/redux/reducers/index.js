import { combineReducers } from 'redux'
import recordsReducer from './recordsReducer'
import homeReducer from './homeReducer'


export default combineReducers({
    records: recordsReducer,
    total: homeReducer
})