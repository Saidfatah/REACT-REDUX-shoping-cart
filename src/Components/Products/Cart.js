import React from 'react'
import CartItem from './CartItem'


const Cart=({cartItems,deleteCartItem,proccedeToCheckout})=> {
     
    return (
        <div className="cart">
             <p>{cartItems.length>0 ? ('you have '+cartItems.length +' items in cart' ) : 'there are no items in cart '} </p>
             {cartItems && cartItems.map((item,index)=><CartItem key={index} {...{item,deleteCartItem}} />)} 
            <div className="cart__checkout">
                {
                    cartItems.length>0 && <p>Total <span>${cartItems.map(item=>item.price * item.quanitity).reduce((a, b)=> a + b , 0)}</span></p>
                }
                <button className="btn" onClick={proccedeToCheckout}>Proccede</button>
            </div>
        </div>
    )
}

export default Cart
