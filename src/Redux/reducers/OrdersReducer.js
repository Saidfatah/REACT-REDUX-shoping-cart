import {
     GETING_ORDERS,
     POST_ORDER_BEGUN,
     POST_ORDER_FAIL,
     GET_ORDER_SUCCESS,
     POST_ORDER_SUCCESS,
     GET_ORDERS_FAIL,
     GET_ERRORS,
     UPDATING_ORDER,
     UPDATE_ORDER_FAIL,
     UPDATE_ORDER_SUCCESS
} from "../Types";

const initialState= {
    items:[],
    canOrder:true,
    loading:false,
    updating:false,
}

export const ordersReducer=(state=initialState,action)=>{
    if(state == undefined) return state 
    switch (action.type) {
        case GET_ORDER_SUCCESS  :
            console.log(action.payload)
        return {...state, items : [...action.payload] ,loading:false}
        case GETING_ORDERS      : return {...state, loading:true}
        case GET_ORDERS_FAIL    : return {...state, loading:false}

        case UPDATE_ORDER_SUCCESS  : return {...state, loading:false}
        case UPDATING_ORDER        : return {...state, updating:true}
        case UPDATE_ORDER_FAIL     : return {...state, updating:false}

        case POST_ORDER_SUCCESS : return {...state, items : [...state.items,action.payload] ,canOrder:true}
        case POST_ORDER_BEGUN   : return {...state, canOrder:false}
        case GET_ERRORS         : return {...state, items:[]}
        case POST_ORDER_FAIL    : return {...state, canOrder:true}
        default                 : return state
    }
}