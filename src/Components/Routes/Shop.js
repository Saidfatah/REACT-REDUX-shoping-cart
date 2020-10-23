import React from 'react'
import Products from '../Products/Products'
import Cart from '../Products/Cart'

const Shop=()=> {
 
    const createOrder =(order)=>{
        //save the order
    }

    return (
        <div className="container page shop">
             <Products />
             <Cart {...{createOrder}}  />
        </div>
    )

}

export default Shop
