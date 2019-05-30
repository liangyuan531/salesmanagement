import { GET_ALL_RECORDS } from './actionType'
import axios from 'axios'
import { URL } from './reqURL'

export const getAllRecords = () => dispatch => {
    axios.get(`${URL}/records/admin`)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_ALL_RECORDS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err);
        })
}