import React,{useState,useEffect} from 'react'
import ProductItem from './ProductItem'
import productsData from '../../data.json'
import Cart from './Cart'
import FilterBar from './FilterBar'


const Products=({addToCart})=>{
    const [products, setproducts] = useState([])
    const [productsToDisplay, setproductsToDisplay] = useState([])


    useEffect(() => {
        setproducts(productsData.products)
        setproductsToDisplay(productsData.products)
    }, [])


    return (
      <div className="products">
          <div className="products__header"> 
              <FilterBar {...{setproductsToDisplay,products}} />   
          </div>
          <div className="products__wrapper">
              {productsToDisplay.map((product,index)=><ProductItem  key={index} {...{addToCart,product}} />)}
          </div>
      </div>
    )
}

export default Products
