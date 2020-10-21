import React,{useState} from 'react'
import { connect } from 'react-redux';
import PorductModal from './PorductModal'
import {addProductToCart} from '../../Redux/actions/CartActions'

const ProductItem=({product,cartItems,addProductToCart})=> {
    const [modalIsOpen,setIsOpen] = useState(false);
    const {title,image,price}=product


    return (
        <div onClick={e=> {
            if(e.target.tagName != 'BUTTON')setIsOpen(true)
            }} className="productItem">
            <PorductModal  {...{addProductToCart,modalIsOpen,setIsOpen,product}}/>
            <div className="productItem__image">
              <img  src={image}  />
            </div>
            <p className="productItem__title">{title} </p>
            <div className="productItem__bottom">
                 <p>${price}</p>
                 <button onClick={()=>addProductToCart(product,cartItems)} className="btn">Add to cart</button>
            </div>
        </div>
    )
}

export default connect((state)=>({cartItems:state.cart.items}),{addProductToCart})(ProductItem)
