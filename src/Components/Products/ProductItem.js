import React from 'react'

const ProductItem=({product,addToCart})=> {
    const {title,image,price,description,sizes,id}=product
    return (
        <div className="productItem">
            <div className="productItem__image">
              <img  src={image}  />
            </div>
            <p className="productItem__title">{title} </p>
            {/* <p className="productItem__description">{description}</p> */}
            {/* <div className="productItem__sizes">
                <p>sizes</p>
                <ul> {sizes.map(s=><li>{s}</li>)}</ul>
            </div> */}
            <div className="productItem__bottom">
                 <p>${price}</p>
                 <button onClick={()=>addToCart(product)} className="btn">Add to cart</button>
            </div>
        </div>
    )
}

export default ProductItem
