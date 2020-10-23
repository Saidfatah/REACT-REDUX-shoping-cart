import {GET_ORDERS,POST_ORDER_BEGUN,POST_ORDER_FAIL,POST_ORDER_SUCCESS} from "../Types";

const initialState= {
    items:[],
    canOrder:true,
}

export const ordersReducer=(state=initialState,action)=>{
    if(state == undefined) return state 
    switch (action.type) {
        case GET_ORDERS         : return {...state, items : action.payload }
        case POST_ORDER_SUCCESS : return {...state, items : [...state.items,action.payload] }
        case POST_ORDER_BEGUN   : return {...state, canOrder:false}
        case POST_ORDER_FAIL    : return {...state,items:[],canOrder:true,}
        default                 : return state
    }
}