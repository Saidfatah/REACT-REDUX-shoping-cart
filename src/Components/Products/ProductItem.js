import React,{useState} from 'react'
import PorductModal from './PorductModal'

const ProductItem=({product,addToCart})=> {
    const [modalIsOpen,setIsOpen] = useState(false);
    const {title,image,price}=product


    return (
        <div onClick={e=> {
            if(e.target.tagName != 'BUTTON')setIsOpen(true)
            }} className="productItem">
            <PorductModal  {...{addToCart,modalIsOpen,setIsOpen,product}}/>
            <div className="productItem__image">
              <img  src={image}  />
            </div>
            <p className="productItem__title">{title} </p>
            <div className="productItem__bottom">
                 <p>${price}</p>
                 <button onClick={()=>addToCart(product)} className="btn">Add to cart</button>
            </div>
        </div>
    )
}

export default ProductItem
