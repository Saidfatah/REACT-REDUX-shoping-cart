import React,{useState} from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'
import Checkout from './Checkout'
import {removeCartItem} from '../../Redux/actions/CartActions'

const Cart=({cartItems,removeCartItem})=> {
     const [isCheckoutFormVisible, setisCheckoutFormVisible] = useState(false)

     return (
         <div className="cart">
             <div className="products__header">
              <p className="products__count">you have <span>{cartItems.length}</span> items in cart</p>
             </div>
             
             <div>
                 {cartItems && cartItems.map((item,index)=><CartItem key={index} {...{item,removeCartItem,cartItems}} />)} 
                 <div className="cart__checkout">
                     {
                         cartItems.length>0 && <p>Total <span>${cartItems.map(item=>parseFloat(item.price)*item.quanitity).reduce((a, b)=> a + b , 0).toFixed(2)}</span></p>
                     }
                     {
                         cartItems.length > 0
                         ? <button  className="btn" onClick={e=>setisCheckoutFormVisible(true)}>Proccede</button>
                         :null
                     }
                 </div>
                 <Checkout {...{isCheckoutFormVisible,setisCheckoutFormVisible}} />
             </div>
         </div>
     )
}

export default connect((state)=>({cartItems:state.cart.items}),{removeCartItem})(Cart)
