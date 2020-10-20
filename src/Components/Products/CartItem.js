import React from 'react'

const CartItem=({item,deleteCartItem})=> {
    const {title,image,price,description,quanitity,sizes,_id}=item
    return (
        <div className="cartItem">
             <div>
                 <div className="cartItem__image"> <img  src={image} /></div>
             </div>
             <div >
                <p  className="cartItem__title">{title}</p>
                <p  className="cartItem__price"> <span>{quanitity}</span> x {price}</p>
                <button className="btn-grey" onClick={e=>deleteCartItem(_id)}>remove</button>
             </div>
        </div>
    )
}

export default CartItem
