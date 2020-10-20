import React,{useState,useEffect} from 'react'
import Products from '../Products/Products'
import Cart from '../Products/Cart'
const Shop=()=> {
    const [cartItems, setcartItems] = useState([])
    
    useEffect(() => {
        const cartItemsFromLocalStorage= localStorage.getItem('cart')
        if(cartItemsFromLocalStorage)
        {
            setcartItems(JSON.parse(cartItemsFromLocalStorage))
        }
    }, [])


    const addToCart=(product)=>{
         const cartItemIndex = cartItems.indexOf([...cartItems].filter(cartItem=>cartItem._id == product._id)[0])
         let tempCrtItems=[...cartItems]
         
         if(cartItemIndex != -1)
         {
             tempCrtItems[cartItemIndex].quanitity+= 1 
         }
         else{
             tempCrtItems.push(({...product,quanitity:1}))
         }

         localStorage.setItem('cart',JSON.stringify(tempCrtItems))
         setcartItems(tempCrtItems)
    }
    const deleteCartItem = (_id)=>{
        const tempCrtItems=  [...cartItems].filter(cartItem=>cartItem._id != _id)
        localStorage.setItem('cart',JSON.stringify(tempCrtItems))
        setcartItems(tempCrtItems)
    }
    const proccedeToCheckout = ()=>{
        
    }

    return (
        <div className="container page shop">
             <Products addToCart={addToCart}/>
             <Cart {...{cartItems,deleteCartItem,proccedeToCheckout}}  />
        </div>
    )

}

export default Shop
