import {
    USER_REGESTER_FAIL,
    USER_REGESTER_SUCCESS,
    USER_LOADING,
    USER_LOADED,
    USER_LOGGIN_FAIL,
    USER_LOGGIN_SUCCES,
    LOGOUT_SUCCES,
    AUTH_ERROR
} from '../Types'


const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false , 
    user:JSON.parse(localStorage.getItem('user')),
}

export const authReducer=(state=initialState,action)=>{
    if(state == undefined) return state 
    switch (action.type) {
        case USER_LOADING          : return {...state, isLoading :true }
        case USER_LOADED           : return {...state, isAuthenticated :true , isLoading :true ,user :action.payload }

        case USER_REGESTER_SUCCESS : 
        case USER_LOGGIN_SUCCES    : 
        console.log(action.payload.user)
        localStorage.setItem('token',action.payload.token);
        localStorage.setItem('user',JSON.stringify(action.payload.user));
        return {...state,...action.payload , isAuthenticated :true , isLoading :true }

        case USER_LOGGIN_FAIL      : 
        case USER_REGESTER_FAIL    : 
        case AUTH_ERROR            : 
        case LOGOUT_SUCCES         : 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return {...state,user:null,isAuthenticated:false,isLoading:false,token:null}
 
        default: return state
    }
}