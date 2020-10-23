import React from 'react'
import {Link} from "react-router-dom";
import Logout from '../Auth/Logout'
const Header=()=> {
    return (
        <div className="header ">
            <div className="container">
                <Link to="/" >Shop</Link>
                <Link to="/about" >About</Link>
                <Link to="/auth" >Account</Link>
                <Logout />
            </div>
        </div>
    )
}

export default Header
