import React,{useState,useEffect} from 'react'
import Error from '../layout/Error'
import {register} from '../../Redux/actions/AuthActions'
import {clearErrors} from '../../Redux/actions/ErrorsActions'
import { connect } from 'react-redux'

const Regester=(props)=> {
    const [userInfo, setuserInfo] = useState({
        password:'',
        email:'',
        address:'',
        firstName:'',
        lastName:''
    })
    const [errs,setErr]=useState({
         passwordReq:false ,
         addressReq:false ,
         emailReq:false,
         firstnameReq:false,
         lastnameReq:false,
         REGISTER:false,
         emailUsed:false,
    })
    const [registerSucces, setregisterSucces] = useState(false)
    const [canSubmit, setcanSubmit] = useState(true)

    const {isAuthenticated,error,register,setauthToggle} = props
    
    useEffect(() => {
       if(error.id == "EMAIL_USED")setErr({...errs,emailUsed:true})
       if(error.id == "REGISTER_FAIL")setErr({...errs,REGISTER:true}) 

       return ()=>{
          clearErrors()
       }
    }, [error])

    const resetValidaton = e =>{
        if(e.target.tagName.toLowerCase()=='input') setErr({
            passwordReq:false ,
            emailReq:false,
            firstnameReq:false,
            lastnameReq:false,
            emailUsed:false,
            REGISTER:false
       })
    }
    const validate=()=>{
        const {firstName,lastName,email,password,address}=userInfo
        const errsObjTemp ={...errs}

        let errsCount = 0 ; 
        if(firstName== ''){
             errsObjTemp.firstnameReq=true
             errsCount++
        }
        if(lastName== ''){
             errsObjTemp.lastnameReq=true
             errsCount++
        }
        if(email== ''){
             errsObjTemp.emailReq=true
             errsCount++
        }
        if(password== ''){
             errsObjTemp.passwordReq=true
             errsCount++
        }
        if(password== ''){
             errsObjTemp.addressReq=true
             errsCount++
        }
 
        setErr({...errsObjTemp})
        return errsCount>0 ? false :true
    }
    const submitUser=(e)=>{
         e.preventDefault()
         if(!validate()) return ;
         register(userInfo)
    }
    const handleChange=(field)=>(e)=>setuserInfo({...userInfo,[field]:e.target.value})
    
    if(registerSucces)
    return  <div><p> registerd with succes </p></div> 


    return (
     <form  onSubmit={submitUser} onClick={resetValidaton} className="form" >
         
         <input 
          type="text" 
          name="firstname"
          placeholder="First Name" 
          onChange={handleChange('firstName')} 
          value={userInfo.firstName}/>
         <Error trigger={errs.firstnameReq} message="First name is required" />  
        
         <input 
          type="text" 
          name="lastname"
          placeholder="Last Name" 
          onChange={handleChange('lastName')} 
          value={userInfo.lastName}
          />
         <Error trigger={errs.lastnameReq} message="Last name is required" />

         <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange('email')} 
          value={userInfo.email}
         />
         <Error trigger={errs.emailReq} message="Email is required" />
         <Error trigger={errs.emailUsed} message="Email is already used " />

         <input 
          type="tes" 
          name="address" 
          placeholder="Address" 
          onChange={handleChange('address')} 
          value={userInfo.address}
         />
         <Error trigger={errs.addresReq} message="Address is required" />

         

         <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange('password')} 
          value={userInfo.password}
         />
         <Error trigger={errs.passwordReq} message="Password is required " />

         <button className="btn" type='submit' disabled={!canSubmit}>CREATE MY ACCOUNT</button>
         <p>already have an account  <a onClick={e=>setauthToggle(true)}>Logging</a></p>
         <Error trigger={errs.REGISTER} message="Register failed please try again later ! " />
     </form>
  
    )
}

export default connect(state=>({
      isAuthenticated:state.auth.isAuthenticated,
      error:state.error
}),{register,clearErrors})(Regester)
