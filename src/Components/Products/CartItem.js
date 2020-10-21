import React from 'react'

const CartItem=({item,removeCartItem,cartItems})=> {
    const {title,image,price,quanitity,_id}=item
    return (
        <div className="cartItem">
             <div>
                 <div className="cartItem__image"> <img  src={image} /></div>
             </div>
             <div >
                <p  className="cartItem__title">{title}</p>
                <p  className="cartItem__price"> <span>{quanitity}</span> x {price}</p>
                <button className="btn-grey" onClick={e=>removeCartItem(_id,cartItems)}>remove</button>
             </div>
        </div>
    )
}

export default CartItem
