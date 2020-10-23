module.exports =(req,res,next)=>{
   const bearerHeader = req.headers['authorization']
   if( bearerHeader  !== undefined){
       const token = bearerHeader.split(' ')[1]
       if(token =='null' ){
           res.statusMessage='INVALID_TOKEN'
           res.status(403)
           return res.send('No token auth is denied ')
       }
       req.token=token
       next()
   }else
   {
       res.status(403).send('INVALID_TOKEN')
   }
}