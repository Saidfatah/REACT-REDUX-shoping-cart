const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../Models/User')
const verifyToken = require('../config/jwt')


router.post('/login',async (req,res)=>{
    try {      
        const email = req.body.email
        const password = req.body.password
        
        const userGetResponse = await  UserModel.findOne({email})
        if(userGetResponse == undefined) throw new Error('no user with this email')

        const passCheck =await bcrypt.compare(password, userGetResponse.password)
        if(!passCheck) throw new Error('wrong password')

        jwt.sign(
        {userGetResponse},
        'secretKey',
        {expiresIn:'10h'},
        (err,token)=>res.json({
            token,
            user:{
                _id:userGetResponse._id,
                firstName:userGetResponse.firstName,
                lastName:userGetResponse.lastName,
                email:userGetResponse.email,
                address:userGetResponse.address,
                rule:userGetResponse.rule,
            }
        }))
  
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send('no user ')
    }

})
router.post('/register',async(req,res)=>{
    try {
        const {email,password,address,firstName,lastName}= req.body

        const passHash=await bcrypt.hash(password,1);
        if(passHash == undefined) throw new Error('erro hassing password'); 
        
        const checkEmailExistsResponse= await UserModel.findOne({email:email})
        if( checkEmailExistsResponse !== null) throw new Error('EMAIL')

       
        const userDoc= new UserModel({ password:passHash,email,firstName,address,lastName,rule:'admin'}).save()
        const userSaveResponse = await userDoc
        if(userSaveResponse._id == undefined) throw new Error('REGISTER')

        jwt.sign(
            {userSaveResponse},
            'secretKey',
            {expiresIn:'10h'},
            (err,token)=>res.json({
                token,
                user:{
                    _id:userSaveResponse._id ,
                    fullName:userSaveResponse.firstName,
                    email:userSaveResponse.email,
                    address:userSaveResponse.address,
                    rule:userSaveResponse.rule,
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
       console.log(error)
    }
})

router.post('/user',verifyToken,async(req,res)=>{
    try {
        const usetGetResponse = await UserModel.findById(req.body.user._id).select('-password')
        if(usetGetResponse == undefined) throw new Error('NO_USER_FOUND')
        res.json(usetGetResponse)
     } catch (error) {
        console.log(error)
        res.statusMessage='NO_USER_FOUND';
        res.sendStatus(403)
     }
})

module.exports = router