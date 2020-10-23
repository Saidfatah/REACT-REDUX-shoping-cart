import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {getOrders} from '../../Redux/actions/OrdersActions'
import Order from './Order'

const Admin=({getOrders,orders})=> {
    const [ordersArr, setordersArr] = useState([])
    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        console.log(orders[0])
        if(orders.length) setordersArr(orders[0])
    }, [orders])
    

    return (
        <div>
            Admin 
            <h2>Orders</h2>
            <div className="orders">
                 {ordersArr.map((order,index)=><Order  key={index} {...{...order}} />)}
            </div>
        </div>
    )
}

export default connect(state=>({orders:state.orders.items}),{getOrders})(Admin)
