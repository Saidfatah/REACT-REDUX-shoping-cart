const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../Models/User')
const axios = require('axios')



router.get('/:id',(req,res)=>{

})

router.post('/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
  
    try {      
        const userGetPromise = await  UserModel.findOne({email})
        if(userGetPromise == undefined) throw new Error('no user with this email')

        const passCheck =await bcrypt.compare(password, userGetPromise.password)
        if(!passCheck) throw new Error('wrong password')

        jwt.sign(
        {userGetPromise},
        'secretKey',
        {expiresIn:'10h'},
        (err,token)=>res.json({
            token,
            rule:userGetPromise.rule,
            user:{
                id:userGetPromise._id,
                firstname:userGetPromise.firstname,
                lastname:userGetPromise.lastname,
                email:userGetPromise.email,
                rule:userGetPromise.rule,
                addresses:userGetPromise.addresses,
            }
        }))
  
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send('no user ')
    }

})

router.post('/register',async(req,res)=>{
    try {
        const {email,password,firstname,lastname}=  req.body

        const passHash=await bcrypt.hash(password,1);
        if(passHash == undefined) throw new Error('erro hassing password'); 
        
        const checkEmailExistsResponse= await UserModel.findOne({email:email})
        if( checkEmailExistsResponse !== null) throw new Error('EMAIL')

       
        const userDoc= new UserModel({ password:passHash,email,firstname,lastname,addresses:[],rule:'costumer'}).save()
        const userSave = await userDoc
        if(userSave._id == undefined) throw new Error('REGISTER')

        jwt.sign(
            {userSave},
            'secretKey',
            {expiresIn:'10h'},
            (err,token)=>res.json({
                token,
                rule:userSave.rule,
                user:{
                    id:userSave._id ,
                    firstname:userSave.firstname,
                    lastname:userSave.lastname,
                    email:userSave.email,
                    rule:userSave.rule,
                    addresses:userSave.addresses,
                }
        }))

    } catch (error) {
        if(error.message=="EMAIL"){
             res.statusMessage='EMAIL';
             res.sendStatus(403)
        }
        if(error.message=="REGISTER"){
             res.statusMessage='REGISTER';
             res.sendStatus(403)
        }
        if(error.message=="ROBOT"){
            res.statusMessage='ROBOT';
            res.sendStatus(403)
        }
       console.log(error)
    }
})

// router.post('/update',async(req,res)=>{
//     try {      
//         const {id,addresses}=  req.body
//         if (!id || addresses.lenght>0) throw new Error('SOMTHING_WENT_WRONG')
      
//         const existingUser = await UserModel.findOne({ _id: id });
//         if (!existingUser) throw new Error('INVALID_ID')


//         const update = { addresses};
//         const updateResponse = await existingUser.updateOne(update);
//         const updatedDoc = await UserModel.findOne({_id:id});

//         jwt.sign(
//             {updatedDoc},
//             'secretKey',
//             {expiresIn:'10h'},
//             (err,token)=>res.json({
//                 token,
//                 rule:updatedDoc.rule,
//                 user:{
//                     id:updatedDoc._id ,
//                     firstname:updatedDoc.firstname,
//                     lastname:updatedDoc.lastname,
//                     email:updatedDoc.email,
//                     rule:updatedDoc.rule,
//                     addresses:updatedDoc.addresses,
//                 }
//         }))

//     } catch (error) {
//        console.log(error)
//         if(error.message=="SOMTHING_WENT_WRONG"){
//          res.statusMessage='SOMTHING_WENT_WRONG';
//          res.sendStatus(403) 
//         }
//         if(error.message=="INVALID_ID"){
//          res.statusMessage='INVALID_ID';
//          res.sendStatus(403)  
//         }
//     }
// })


module.exports = router