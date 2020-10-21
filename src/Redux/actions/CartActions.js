import {ADD_PRODUCT_TO_CART , FETCH_CART_ITEMS , DELETE_CART_ITEM} from '../Types'


export const fetchCartItems=() => (dispatch)=>{
    const cartItemsFromLocalStorage= localStorage.getItem('cart')
    if(cartItemsFromLocalStorage)
    {
        dispatch({type:FETCH_CART_ITEMS, payload : JSON.parse(cartItemsFromLocalStorage) })
    }
}

export const addProductToCart=(product,cartItems)=> (dispatch)=>{
    const cartItemIndex = cartItems.indexOf([...cartItems].filter(cartItem=>cartItem._id == product._id)[0])
    let tempCrtItems=[...cartItems]
    
    if(cartItemIndex != -1)
         tempCrtItems[cartItemIndex].quanitity+= 1 
    else 
         tempCrtItems.push(({...product,quanitity:1}))
    
    localStorage.setItem('cart',JSON.stringify(tempCrtItems))

    dispatch({type:ADD_PRODUCT_TO_CART, payload : tempCrtItems})
}

export const removeCartItem=(_id,cartItems) => (dispatch)=>{
    const tempCrtItems=  [...cartItems].filter(cartItem=>cartItem._id != _id)
    localStorage.setItem('cart',JSON.stringify(tempCrtItems))
    dispatch({type:DELETE_CART_ITEM, payload : tempCrtItems})
}