import {ADD_PRODUCT_TO_CART , FETCH_CART_ITEMS , DELETE_CART_ITEM} from '../Types'


const initialState= {
    items:[]
}

export const cartReducer=(state=initialState,action)=>{
    if(state == undefined) return state 
    switch (action.type) {
        case FETCH_CART_ITEMS    : return {...state, items : action.payload }
        case ADD_PRODUCT_TO_CART : return {...state, items : action.payload.products}
        case DELETE_CART_ITEM    : return {...state, items : action.payload.products}
        default: return state
    }
}