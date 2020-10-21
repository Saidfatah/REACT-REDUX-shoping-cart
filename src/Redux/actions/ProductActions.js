import axios from "axios"
import {FETCH_PRODUCTS,FILTER_PRODUCTS_BY_SIZE,ORDER_PRODUCTS_BY_PRICE} from '../Types'


export const fetchProducts=()=>async (dispatch)=>{
    try {
         const productsResponse = await axios.get('http://localhost:4000/products')
         console.log(productsResponse.data)
         dispatch({type:FETCH_PRODUCTS,payload:productsResponse.data})
    } catch (error) {
        console.log(error)
    }
}

export const filterProductsBySize=(products,size)=>async (dispatch)=>{
    dispatch({
        type:FILTER_PRODUCTS_BY_SIZE,
        payload:{
             products:size == "" 
                  ? products 
                  :products.filter(product=> product.sizes.indexOf(size) >= 0),
             size}
        })
}

export const orderProductsByPrice=(products,order)=>async (dispatch)=>{
  
    const orderProducts = products.slice().sort((a,b)=>(
        order =="LOWEST" 
        ?((a.price > b.price) ?1:-1)
        :((a.price < b.price) ?1:-1)
    ))

    dispatch({
        type:ORDER_PRODUCTS_BY_PRICE,
        payload:{
             products:orderProducts,
             order
        }
    })
}