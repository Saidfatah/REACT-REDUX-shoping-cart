import React from 'react'
import { connect } from 'react-redux'
import {updateOrder} from '../../Redux/actions/OrdersActions'

const Order=({_id,fullName,date,items,updateOrder})=>{
    
    return <div className="order">
         <div className="order__items">
            {
            [...items].map((item,index)=><div key={index} className="orderItem">
                  <div>
                      <div className="orderItem__image"> <img  src={item.image} /></div>
                  </div>
                  <div >
                     <p  className="orderItem__title">{item.title}</p>
                     <p  className="orderItem__price"> <span>{item.quanitity}</span> x {item.price}</p>
                  </div>
              </div>)
              }
         </div>
         <div className="order_info">
             <p>{fullName}</p>
             <p>{date}</p>
         </div>
         <button onClick={e=>updateOrder(_id,'FULLFILED')}>Fullfill Order</button>
    </div>
}

export default connect(null,{updateOrder})(Order)