import React,{useState,useEffect} from 'react'
import ProductItem from './ProductItem'
import productsData from '../../data.json'
import Cart from './Cart'
import FilterBar from './FilterBar'
import axios from 'axios'

const Products=({addToCart})=>{
    const [products, setproducts] = useState([])
    const [productsToDisplay, setproductsToDisplay] = useState([])


    useEffect(() => {
        let source = axios.CancelToken.source();
        (async ()=>{
            try {
                axios.get('http://localhost:4000/products',{cancelToken:source.token})
                .then(res=>{
                    setproducts(res.data)
                    setproductsToDisplay(res.data)
                })
                .catch(err=>console.log(err))
            } catch (error) {
                 if(axios.isCancel(error)) console.log('canceld request')
                 else throw error
            }
        })()

        return ()=>{ source.cancel()}

  
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
