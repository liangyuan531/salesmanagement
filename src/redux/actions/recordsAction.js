import { GET_ALL_RECORDS, /*ADD_RECORDS*/ } from './actionType'
import axios from 'axios'
import { URL } from './reqURL'

export const getAllRecords = () => dispatch => {
    axios.get(`${URL}/records/admin`)
        .then(res => {
            console.log("action: get all records: ", res.data);
            dispatch({
                type: GET_ALL_RECORDS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err);
        })
}

export const addRecord = (record) => dispatch => {
    axios.post(`${URL}/records/add`, record)
        .then(res=>{
            console.log("res: ", res);
            // dispatch({
            //     type: ADD_RECORDS,
            //     payload: res.data
            // })
        }).catch(err => {
            console.log(err);
        })
}