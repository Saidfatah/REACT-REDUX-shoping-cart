import React from 'react'

const Error=({trigger,message})=> {
   if(trigger) return <p className="err">{message}</p>
   return null
}

export default Error
