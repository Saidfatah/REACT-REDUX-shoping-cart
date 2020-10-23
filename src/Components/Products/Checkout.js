import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import Error from '../layout/Error'
import {order} from '../../Redux/actions/OrdersActions'
const defaultErrsObj= {
    fullNameReq:false,
    emailReq:false,
    addressReq:false,
    ORDER_FAIL:false
}
const defaultUserInfo= {
    fullName:'',
    email:'',
    address:'',
}

const Checkout=(props)=> {
    const [userInfo, setuserInfo] = useState({...defaultUserInfo})
    const [errs, seterrs] = useState({...defaultErrsObj})
    const {
        isCheckoutFormVisible,
        setisCheckoutFormVisible,
        cartItems,
        order,
        isAuthenticated,
        user,
        error,
        canOrder
    }=props

    useEffect(() => {
        if(error.id=="ORDER_FAIL")seterrs({...errs,ORDER_FAIL:true})
    },[error])

    useEffect(() => {
        if(cartItems && cartItems.length == 0){
            setisCheckoutFormVisible(false)
        }
        if(isAuthenticated ){
            console.log('set now')
            setuserInfo({...defaultUserInfo,
                fullName:user.firstName + ' ' + user.lastName,
                email:user.email,
                address:user.address,
            })
        }else{
            setuserInfo({...defaultUserInfo})
        }
    
    }, [isCheckoutFormVisible,cartItems,isAuthenticated])

   

    const handleChange=(field)=>(e)=>setuserInfo({...userInfo,[field]:e.target.value})

    const submit=async (e)=>{
        e.preventDefault()
        const errsTemp = {...errs}
        const {email,fullName,address} = userInfo
        let errsCount = 0 ; 
        if(email == ""){
             errsCount++;
             errsTemp.emailReq=true
         }
        if(fullName == ""){ 
             errsCount++;
             errsTemp.fullNameReq=true
        }
        if(address == ""){ 
             errsCount++;
             errsTemp.addressReq=true
        }
        
        if(errsCount > 0 ) return seterrs(errsTemp)
        order({
            fullName,
            address,
            total:cartItems.map(item=>parseFloat(item.price)*item.quanitity).reduce((a, b)=> a + b , 0).toFixed(2),
            date:new Date(),
            email,
            items:cartItems, 
            user_id:isAuthenticated && user ? user._id : '5f919ff9b5d6651cac54bb07'
        })
        setisCheckoutFormVisible(false)
    }
 
    return (
        <form onSubmit={submit} style={{display:isCheckoutFormVisible?'block':'none'}} className="form" >
            <input 
                  type="text" 
                  placeholder="Full name" 
                  value={userInfo.fullName} 
                  onFocus={e=>seterrs({...defaultErrsObj})} 
                  onChange={handleChange('fullName')}
             /> 
            <Error trigger={errs.fullNameReq} message="full name is required !" />

            <input 
                  type="email" 
                  placeholder="Email" 
                  value={userInfo.email}  
                  onFocus={e=>seterrs({...defaultErrsObj})}  
                  onChange={handleChange('email')} 
            /> 
            <Error trigger={errs.fullNameReq} message="email  is required !" />

            <input 
                  type="text" 
                  placeholder="Address" 
                  value={userInfo.address}  
                  onFocus={e=>seterrs({...defaultErrsObj})}  
                  onChange={handleChange('address')} 
            /> 
            <Error trigger={errs.addressReq} message="address is reqauired " />
            
            <button type="submit" className="btn" disabled={!canOrder} >Submit</button>
            <Error trigger={errs.ORDER_FAIL} message="Something went wrong try later " />
        </form>
    )

}

export default connect(state=>({
    isAuthenticated : state.auth.isAuthenticated ,
    user            : state.auth.user,
    canOrder        : state.orders.canOrder,
    error           : state.error,
    cartItems       : state.cart.items,

}),{order})(Checkout)