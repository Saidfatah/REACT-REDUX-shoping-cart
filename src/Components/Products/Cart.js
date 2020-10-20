import React,{useState} from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart=({cartItems,deleteCartItem,proccedeToCheckout,createOrder})=> {
     const [isCheckoutFormVisible, setisCheckoutFormVisible] = useState(false)
     return (
         <div className="cart">
              <p>{cartItems.length>0 ? ('you have '+cartItems.length +' items in cart' ) : 'there are no items in cart '} </p>
              {cartItems && cartItems.map((item,index)=><CartItem key={index} {...{item,deleteCartItem}} />)} 
             <div className="cart__checkout">
                 {
                     cartItems.length>0 && <p>Total <span>${cartItems.map(item=>item.price * item.quanitity).reduce((a, b)=> a + b , 0)}</span></p>
                 }
                 <button  className="btn" onClick={e=>{
                     proccedeToCheckout(e);
                     setisCheckoutFormVisible(true)
                 }}>Proccede</button>
             </div>
             <Checkout {...{isCheckoutFormVisible, createOrder,setisCheckoutFormVisible}} />
         </div>
     )
}

export default Cart
