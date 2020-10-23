import {GET_ORDERS,POST_ORDER_BEGUN,POST_ORDER_FAIL,POST_ORDER_SUCCESS } from "../Types"
import {returnErrors} from '../actions/ErrorsActions'
import axios from 'axios'

export const order=(order)=>async (dispatch,getState)=>{
    try {
         dispatch({type:POST_ORDER_BEGUN})
         const token = getState().auth.token
         const headers = {Authorization: "Bearer " + token }
         const userResponse=  await axios.post('http://localhost:4000/orders',{...order},{headers: headers})
      
         if(userResponse.status != 200) throw new Error('ORDER_FAIL') 
         console.log(userResponse.data)
         dispatch({type:POST_ORDER_SUCCESS,payload:userResponse.data})
    } catch (error) {
         if(error.response)
         {
              if(error.response.statusText == "ORDER_FAIL")
              { 
                   dispatch(returnErrors(error.response.statusText ,error.response.status))
              }

         }
         if(error.message == "ORDER_FAIL")
         {
              dispatch(returnErrors(error.response.data ,error.response.status))
         }
         dispatch({type:POST_ORDER_FAIL})
         console.log(error)
    }
}

export const getOrders=(order)=>async (dispatch,getState)=>{
    try {
         dispatch({type:POST_ORDER_BEGUN})
         const token = getState().auth.token
         const headers = {Authorization: "Bearer " + token }
         const userResponse=  await axios.post('http://localhost:4000/orders',{...order},{headers: headers})
      
         if(userResponse.status != 200) throw new Error('ORDER_FAIL') 
         console.log(userResponse.data)
         dispatch({type:POST_ORDER_SUCCESS,payload:userResponse.data})
    } catch (error) {
         if(error.response)
         {
              if(error.response.statusText == "ORDER_FAIL")
              { 
                   dispatch(returnErrors(error.response.statusText ,error.response.status))
              }

         }
         if(error.message == "ORDER_FAIL")
         {
              dispatch(returnErrors(error.response.data ,error.response.status))
         }
         dispatch({type:POST_ORDER_FAIL})
         console.log(error)
    }
}