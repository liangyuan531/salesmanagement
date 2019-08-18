import axios from 'axios'
import { URL } from './reqURL'
import { GET_TOTAL } from './actionType'

export const getTotalSales = () => dispatch => {
    axios.get(`${URL}/all`)
        .then(res => {
            console.log("home action: ", res.data.data);

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