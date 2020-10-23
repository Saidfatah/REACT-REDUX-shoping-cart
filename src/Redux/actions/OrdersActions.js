import {
    GETING_ORDERS,
    POST_ORDER_BEGUN,
    POST_ORDER_FAIL,
    POST_ORDER_SUCCESS,
    GET_ORDERS_FAIL,
    UPDATING_ORDER,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS
} from "../Types"
import {returnErrors} from '../actions/ErrorsActions'
import axios from 'axios'

export const order=(order)=>async (dispatch,getState)=>{
    try {
         dispatch({type:POST_ORDER_BEGUN})
         const token = getState().auth.token
         const headers = {Authorization: "Bearer " + token }
         const orderResponse=  await axios.post('http://localhost:4000/orders',{...order},{headers: headers})
      
         if(orderResponse.status != 200) throw new Error('ORDER_FAIL') 
         console.log(orderResponse.data)
         dispatch({type:POST_ORDER_SUCCESS,payload:orderResponse.data})
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

export const getOrders=()=>async (dispatch,getState)=>{
    try {
         dispatch({type:GETING_ORDERS})
         const token = getState().auth.token
         const headers = {Authorization: "Bearer " + token }
         const getOrdersResponse=  await axios.get('http://localhost:4000/orders',{headers: headers})
      
         if(getOrdersResponse.status != 200) throw new Error('GET_ORDERS_FAIL') 
         console.log(getOrdersResponse.data)

         dispatch({type:POST_ORDER_SUCCESS,payload:getOrdersResponse.data})
    } catch (error) {
         if(error.response)
         {
              if(error.response.statusText == "NO_ORDERS")
              { 
                   dispatch(returnErrors(error.response.statusText ,error.response.status,'NO_ORDERS'))
              }
         }
         if(error.message == "GET_ORDERS_FAIL")
         {
              dispatch(returnErrors(error.response.data ,error.response.status,"GET_ORDERS_FAIL"))
         }
         dispatch({type:GET_ORDERS_FAIL})
         console.log(error)
    }
}

export const updateOrder=(_id,state)=>async (dispatch,getState)=>{
    try {
         dispatch({type:UPDATING_ORDER})
         const token = getState().auth.token
         const headers = {Authorization: "Bearer " + token }
         const orderUpdate=  await axios.post('http://localhost:4000/orders/update',{_id,state},{headers: headers})
      
         if(orderUpdate.status != 200) throw new Error('UPDATE_FAILED') 
         console.log(orderUpdate.data)

         dispatch({type:UPDATE_ORDER_SUCCESS,payload:orderUpdate.data})
    } catch (error) {
         if(error.response)
         {
              if(error.response.statusText == "UPDATE_FAILED"){ 
                   dispatch(returnErrors(error.response.statusText ,error.response.status,'UPDATE_FAILED'))
              }
         }
         if(error.message == "UPDATE_FAILED"){
              dispatch(returnErrors(error.response.data ,error.response.status,"UPDATE_FAILED"))
         }
         dispatch({type:UPDATE_ORDER_FAIL})
         console.log(error)
    }
}