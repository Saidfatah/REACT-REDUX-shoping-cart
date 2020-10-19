import React,{useState} from 'react'

const FilterBar=({setproductsToDisplay,products})=> {
    const [size, setsize] = useState("")
    const [sort, setsort] = useState("")

    const orderByPrice =(e)=>{
        const sortOrder =e.target.value
        let orderProducts ;

        orderProducts = products.slice().sort((a,b)=>(
            sortOrder =="LOWEST" 
            ?((a.price > b.price) ?1:-1)
            :((a.price < b.price) ?1:-1)
        ))

        setproductsToDisplay(orderProducts)
    } 
    const orderBySize =(e)=>{
        const size =e.target.value
        let filterdProducts
        if(size == "")
          filterdProducts = [...products]
        else
          filterdProducts = products.filter(product=> product.sizes.indexOf(size) != -1)
        setproductsToDisplay(filterdProducts)
    } 

    return (
    <div className="products__filter">
        <p className="products__count"><span>{products.length}</span> products</p> 
        <div className="products__filter__group">
            <p>order :</p>
            <select onChange={orderByPrice}>
                <option value="LOWEST">Lowest </option>
                <option value="HIGHEST">Highest </option>
            </select>
        </div>
        <div className="products__filter__group">
            <p>filter :</p>
            <select onChange={orderBySize}>
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

export default FilterBar
