import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../../Redux/actions/AuthActions'

const Logout=({logout,isAuthenticated})=> {
    if(!isAuthenticated) return null
    return  <Link onClick={e=>logout()} to="/auth">Logout</Link>
}

export default connect(state=>({isAuthenticated:state.auth.isAuthenticated}),{logout})(Logout)
