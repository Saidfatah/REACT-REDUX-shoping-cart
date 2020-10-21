import React,{useState} from 'react'
import { connect } from 'react-redux'
import {filterProductsBySize,orderProductsByPrice} from '../../Redux/actions/ProductActions' 

const FilterBar=({products,filterProductsBySize,orderProductsByPrice})=> {

    return (
    <div className="products__filter">
        <p className="products__count"><span>{products.length}</span> products</p> 
        <div className="products__filter__group">
            <p>order :</p>
            <select onChange={e=>orderProductsByPrice(products,e.target.value)}>
                <option value="LOWEST">Lowest </option>
                <option value="HIGHEST">Highest </option>
            </select>
        </div>
        <div className="products__filter__group">
            <p>filter :</p>
            <select  onChange={e=>filterProductsBySize(products,e.target.value)}>
                <option value="">ALL </option>
                <option value="X">X </option>
                <option value="S">S </option>
                <option value="M">M </option>
                <option value="XL">XL </option>
                <option value="XXL">XXL </option>
            </select>
        </div>
    </div>
    )
}

export default connect((state)=>({ products : state.products.items }),{filterProductsBySize,orderProductsByPrice})(FilterBar)
