import React from 'react'
import {Link} from "react-router-dom";

const Header=()=> {
    return (
        <div className="header ">
            <div className="container">
                <Link to="/" >Shop</Link>
                <Link to="/about" >About</Link>
            </div>
        </div>
    )
}

export default Header
