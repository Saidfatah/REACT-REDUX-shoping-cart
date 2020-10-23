import {GET_ERRORS, CLEAR_ERRORS  } from "../Types";


const initialState= {
    msg:null,
    status:null,
    id:null
}

export const errorsReducer=(state=initialState,action)=>{
    if(state == undefined) return state 
    switch (action.type) {
        case GET_ERRORS    : return {...state, ...action.payload}
        case CLEAR_ERRORS : return {...state,  msg:null,  status:null, id:null }
        default: return state
    }
}