import { GET_ALL_RECORDS, ADD_RECORDS, DELETE_RECORDS, GET_RECORD, UPDATE_POST } from './actionType'
import axios from 'axios'
import { URL } from './reqURL'

export const getAllRecords = () => dispatch => {
    axios.get(`${URL}/records/admin`)
        .then(res => {
            if(res.data.success === true){
                dispatch({
                    type: GET_ALL_RECORDS,
                    payload: res.data.records
                })
            }
        }).catch(err => {
            console.log(err);
        })
}

export const getRecordById = (id) => dispatch => {
    axios.get(`${URL}/record/${id}`)
        .then(res => {
            if(res.data.success === true){
                dispatch({
                    type: GET_RECORD,
                    payload: res.data.record
                })
            }
        }).catch(err => {
            console.log(err);
        })
}

export const addRecord = (record) => dispatch => {
    console.log('adding record: ', record);
    return axios.post(`${URL}/records/add`, record)
        .then(res=>{
            console.log("action: add record res: ", res);
            if(res.data.success === true){
                dispatch({
                    type: ADD_RECORDS,
                    payload: res.data.record
                })
                //alert('add record successfully');
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        })
}

export const deleteRecord = (id) => dispatch => {
    console.log('delete record id: ', id);
    return axios.delete(`${URL}/records/${id}`)
        .then(res=>{
            console.log('action delete res data: ', res.data);
            if(res.data.success === true){
                dispatch({
                    type: DELETE_RECORDS,
                    payload: res.data.recordId
                })
                return res.data
            }
        }).catch(err=>{
            console.log(err);
        })
}

export const updatePost = (recordId, post) => dispatch =>{
    return axios.put(`${URL}/records/update/postDetail/${recordId}`, post)
        .then(res=>{
            console.log("action update data: ", res.data);
            return res.data;
            // if(res.data.success === true){
            //     alert('Update post details successfully');
            //     // dispatch({
            //     //     type: UPDATE_POST,
            //     //     payload: res.data
            //     // })
            // }else{
            //     alert('Update failed');
            // }
        })
        .catch(err=>{
            console.log(err);
        })
}

export const updateItems = (recordId, post) => dispatch =>{
    return axios.put(`${URL}/records/update/items/${recordId}`, post)
        .then(res=>{
            return res.data
            // if(res.data.success === true){
            //     alert('Update items successfully');
            // }else{
            //     alert('Update failed');
            // }   
        })
        .catch(err=>{
            console.log(err);
        })
}