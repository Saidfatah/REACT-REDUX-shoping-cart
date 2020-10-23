import React,{useState,useEffect} from 'react'
import Error from '../layout/Error'
import { connect } from 'react-redux'
import {loging} from '../../Redux/actions/AuthActions'

const Login=(props)=> {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState('')
    const {setauthToggle,error,loging}=props

    useEffect(() => {
        if(error.id=="LOGING_FAIL")setErr('Email or password are wrong !')
    }, [error])

    const submitLogin =  e=>{
           e.preventDefault()
           if(email  == '' || password  =='')return setErr('please enter email and password')
           loging(email,password)
    }

    return (
         <form onSubmit={submitLogin} className="form">
             <Error trigger={err!=''} message={err} />
             <input 
                  type="email"
                  name="email" 
                  placeholder="Email" 
                  onClick={e=>setErr('')} 
                  onChange={e=>setEmail(e.target.value)}
             />
             <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  onClick={e=>setErr('')}
                  onChange={e=>setPassword(e.target.value)}
             />
             <button  className="btn" >LOGIN</button>
             <p>dont have an account <a onClick={e=>setauthToggle(false)}>create One </a></p>
         </form>
    )
}

export default connect(state=>({error:state.error}),{loging})(Login)
