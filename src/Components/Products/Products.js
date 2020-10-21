import React,{useState,useEffect} from 'react'
import ProductItem from './ProductItem'
import productsData from '../../data.json'
import Cart from './Cart'
import FilterBar from './FilterBar'
import {connect} from 'react-redux'
import {fetchProducts} from '../../Redux/actions/ProductActions'


const Products=(props)=>{
    const [productsToDisplay, setproductsToDisplay] = useState([])
    const {addToCart,fetchProducts,products}=props

    useEffect(() => {
        setproductsToDisplay(products)
    }, [products])

    useEffect(() => {
        fetchProducts()
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

export default connect((state)=>({products:state.products}),{fetchProducts})(Products)
