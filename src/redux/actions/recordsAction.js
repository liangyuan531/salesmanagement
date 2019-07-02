import { GET_ALL_RECORDS, ADD_RECORDS, DELETE_RECORDS } from './actionType'
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
    console.log('adding record: ', record);
    axios.post(`${URL}/records/add`, record)
        .then(res=>{
            console.log("action: add record res: ", res);
            dispatch({
                type: ADD_RECORDS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err);
        })
}

export const deleteRecord = (id) => dispatch => {
    console.log('delete record id: ', id);
    axios.delete(`${URL}/records/${id}`)
        .then(res=>{
            console.log('action delete res: ', res.data);
            // if(!res.data.message){
            //     dispatch({
            //         type: DELETE_RECORDS,
            //         payload: res.data
            //     })
            // }
        }).catch(err=>{
            console.log(err);
        })
}