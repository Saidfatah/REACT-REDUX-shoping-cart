import React,{useEffect,useState,useRef} from 'react'
import Error from '../layout/Error'

const defaultErrsObj= {
    fullNameReq:false,
    emailReq:false,
    addressReq:false
}
const defaultUserInfo= {
    fullName:'',
    email:'',
    address:'',
}
const Checkout=({isCheckoutFormVisible,setisCheckoutFormVisible,cartItems,createOrder})=> {
    const [userInfo, setuserInfo] = useState({...defaultUserInfo})
    const [errs, seterrs] = useState({...defaultErrsObj})


    const formRef= useRef()

    useEffect(() => {
         setuserInfo({...defaultUserInfo})
    }, [isCheckoutFormVisible])

    const handleChange=(field)=>(e)=>setuserInfo({...userInfo,[field]:e.target.value})

    const submit=(e)=>{
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
        //submit to db here 
        const order ={cartItems, email,fullName,address}
        createOrder(order)
        setisCheckoutFormVisible(false)
    }
 
    return (
        <form onSubmit={submit} style={{display:isCheckoutFormVisible?'block':'none'}} className="form" ref={formRef}>
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
            
            <button type="submit" className="btn"  >Submit</button>
        </form>
    )

}

export default Checkout