import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import Customer from './Customer'
import Admin from './Admin'
const Account =({user})=> {

    useEffect(() => {
       console.log(user)
    }, [])

    return (
        <div>
             <p>Well come back {user.firstName} </p>
             {
                 user.rule =="admin"
                 ?<Admin />
                 :<Customer />
             }
        </div>
    )
}

export default connect(state=>({user:state.auth.user}))(Account)
