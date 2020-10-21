import axios from "axios"
import {FETCH_PRODUCTS} from '../Types'


export const fetchProducts=()=>async (dispatch)=>{
    try {
         const productsResponse = await axios.get('http://localhost:4000/products')
         console.log(productsResponse.data)
         dispatch({type:FETCH_PRODUCTS,payload:productsResponse.data})
    } catch (error) {
        console.log(error)
    }
}