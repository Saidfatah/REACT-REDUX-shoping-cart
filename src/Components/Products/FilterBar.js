import React from 'react'

const FilterBar=()=> {
    return (
        <div className="products__filter">
        <div className="products__filter__group">
            <p>Order</p>
            <select>
                <option value="lowest">Lowest </option>
                <option value="lowest">Highest </option>
            </select>
        </div>
    </div>
    )
}

export default FilterBar
