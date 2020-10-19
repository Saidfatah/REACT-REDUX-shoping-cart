import React,{useState,useEffect} from 'react'
import ProductItem from './ProductItem'
import productsData from '../../data.json'
import Cart from './Cart'

const Products=()=>{
    const [products, setproducts] = useState([])
    const [productsToDisplay, setproductsToDisplay] = useState([])
    const [size, setsize] = useState("")
    const [sort, setsort] = useState("")

    useEffect(() => {
        setproducts(productsData.products)
        setproductsToDisplay(productsData.products)
    }, [])

    const orderByPrice =()=>{
        const orderProducts = products.sort((a,b)=>)
    } 
    return (
             <div className="products">
                 <div className="products__header">
                     <p className="products__count">{productsToDisplay.length}</p>
             
                 </div>
                {products.map((product,index)=><ProductItem  key={index} product={product} />)}
             </div>
    )
}

export default Products
