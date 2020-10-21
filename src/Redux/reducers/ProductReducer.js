import {FETCH_PRODUCTS,FILTER_PRODUCTS_BY_SIZE,ORDER_PRODUCTS_BY_PRICE} from '../Types'

const initialState= {
    items:[],
    filterdProducts:[]
}

export const productsReducer=(state=initialState,action)=>{
    if(state == undefined) return state 
    switch (action.type) {
        case FETCH_PRODUCTS          : return {...state, items : action.payload , filterdProducts : action.payload}
        case FILTER_PRODUCTS_BY_SIZE : return {...state, filterdProducts :action.payload.products}
        case ORDER_PRODUCTS_BY_PRICE : return {...state, filterdProducts :action.payload.products}
        default: return state
    }
}