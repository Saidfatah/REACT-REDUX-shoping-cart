import {FETCH_PRODUCTS} from '../Types'

export const productsReducer=(state=[],action)=>{
    switch (action.type) {
        case FETCH_PRODUCTS : return [...action.payload]
        default: return state
    }
}