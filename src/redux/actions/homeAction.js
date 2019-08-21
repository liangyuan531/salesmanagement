import axios from 'axios'
import { URL } from './reqURL'
import { GET_TOTAL, GET_MONTHLY_TOTAL, GET_WEEKLY_TOTAL } from './actionType'

export const getTotalSales = () => dispatch => {
    axios.get(`${URL}/all`)
        .then(res => {
            if(res.data.success === true){
                dispatch({
                    type: GET_TOTAL,
                    payload: res.data.data
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getWeeklyTotal = (year) => dispatch => {
    axios.get(`${URL}/weekly/${year}`)
        .then(res=>{
            if(res.data.success === true){
                dispatch({
                    type: GET_WEEKLY_TOTAL,
                    payload: res.data.data
                })
            }
        })
}

export const getMonthlyTotal = (year) => dispatch => {
    axios.get(`${URL}/monthly/${year}`)
        .then(res=>{
            if(res.data.success === true){
                dispatch({
                    type: GET_MONTHLY_TOTAL,
                    payload: res.data.data
                }) 
            }
        })
}