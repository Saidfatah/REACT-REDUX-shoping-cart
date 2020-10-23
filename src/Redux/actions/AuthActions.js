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
import {returnErrors} from '../actions/ErrorsActions'
import axios from 'axios'



export const loadUser=(user)=>async (dispatch,getState)=>{
     try {
          dispatch({type:USER_LOADING})
          const token = getState().auth.token
          const user = getState().auth.user
       
          const headers = {Authorization: "Bearer " + token }
          const userResponse=  await axios.post('http://localhost:4000/users/user',{user:user},{headers: headers})
       
          if(userResponse.status != 200) throw new Error('USER_LOAD_FAILED') 

          dispatch({type:USER_LOADED,payload:userResponse.data})
     } catch (error) {
          if(error.response)
          {
               if(error.response.statusText == "Forbidden")
               { 
                    dispatch(returnErrors(error.response.statusText ,error.response.status))
               }
               if(error.response.statusText == "INVALID_TOKEN"  )
               { 
                    dispatch(returnErrors(error.response.statusText ,error.response.status))
               }
               if(error.response.statusText == "Not Found"  )
               { 
                    dispatch(returnErrors(error.response.statusText ,error.response.status))
               }
          }
          if(error.message == "USER_LOAD_FAILED")
          {
               dispatch(returnErrors(error.response.data ,error.response.status))
          }
          dispatch({type:AUTH_ERROR})
     }
}
export const logout =()=>({type:LOGOUT_SUCCES})
export const register=({firstName,lastName,email,password})=>async(dispatch)=>{
     //can submit toggle 
     //set regsiter succes 
     try {
           const regsterUserResponse= await axios.post('http://localhost:4000/users/register',{...firstName,lastName,email,password,rule:"admin"})
           if(regsterUserResponse.data.user == undefined) throw new Error('REGISTER') ; 
           dispatch({type:USER_REGESTER_SUCCESS ,payload:regsterUserResponse.data})
     } catch (error) {
           if(error.response.statusText == "EMAIL" )
           { 
                dispatch(returnErrors(error.response.data,error.response.status,'EMAIL_USED'))
           }else{
                dispatch({type:USER_REGESTER_FAIL})
                dispatch(returnErrors(error.response.data,error.response.status,'REGISTER_FAIL'))
           }
     }
}
export const loging=(email,password)=>async(dispatch)=>{
     try {
          
           const loginUserResponse= await axios.post('http://localhost:4000/users/login',{password,email})
           if(loginUserResponse.data.user == undefined) throw new Error('LOGING_FAIL') ; 
           dispatch({type:USER_LOGGIN_SUCCES ,payload:loginUserResponse.data})
     } catch (error) {
           dispatch({type:USER_LOGGIN_FAIL})
           dispatch(returnErrors(error.response.data,error.response.status,'LOGING_FAIL'))
     }
}
