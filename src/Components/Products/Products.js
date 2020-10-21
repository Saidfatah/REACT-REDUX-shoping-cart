import React,{useEffect} from 'react'
import ProductItem from './ProductItem'
import FilterBar from './FilterBar'
import {connect} from 'react-redux'
import {fetchProducts} from '../../Redux/actions/ProductActions'


const Products=(props)=>{
    const {addToCart,fetchProducts,products,filteredProducts}=props

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
      <div className="products">
          <div className="products__header"> 
              <FilterBar />   
          </div>
          <div className="products__wrapper">
                 {
                   filteredProducts.length>0 
                   ?filteredProducts.map((product,index)=><ProductItem  key={index} {...{addToCart,product}} />)
                   :'loading products'
                 }
          </div>
      </div>
    )
}

export default connect((state)=>({
    products  : state.products.items,
    filteredProducts :  state.products.filterdProducts
}),{fetchProducts})(Products)
