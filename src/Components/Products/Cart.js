import React,{useState} from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart=({cartItems,deleteCartItem,proccedeToCheckout,createOrder})=> {
     const [isCheckoutFormVisible, setisCheckoutFormVisible] = useState(false)
     return (
         <div className="cart">
             <div className="products__header">
              <p className="products__count">you have <span>{cartItems.length}</span> items in cart</p>
             </div>
             <div>
                  {cartItems && cartItems.map((item,index)=><CartItem key={index} {...{item,deleteCartItem}} />)} 
                 <div className="cart__checkout">
                     {
                         cartItems.length>0 && <p>Total <span>${cartItems.map(item=>parseFloat(item.price)*item.quanitity).reduce((a, b)=> a + b , 0).toFixed(2)}</span></p>
                     }
                     {
                         cartItems.length > 0
                         ? <button   className="btn" onClick={e=>{
                             proccedeToCheckout(e);
                             setisCheckoutFormVisible(true)
                         }}>Proccede</button>
                         :null
                     }
                 </div>
                 <Checkout {...{isCheckoutFormVisible,cartItems, createOrder,setisCheckoutFormVisible}} />
             </div>
         </div>
     )
}

export default Cart
