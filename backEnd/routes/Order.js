const router = require('express').Router();
const OderModal = require('../Models/Order')
const verifyToken = require('../config/jwt')


router.get('/',verifyToken,async (req,res)=>{
    try {      
        const orderGetResponse = await  OderModal.find({})
        if(orderGetResponse == undefined) throw new Error('NO_ORDERS')
        res.json(productsResponse)
    } catch (error) {
        if(error.message=="NO_ORDERS"){
            res.statusMessage='NO_ORDERS';
            res.sendStatus(403)
        }
        console.log(error)
    }
})

router.post('/',async(req,res)=>{
    try {
         const {fullName,address,total,email,date,items,user_id} = req.body 
         const OderSave= new UserModel({fullName,address,total,email,date,items,user_id}).save()
         const OderSaveResponse = await OderSave
         if(OderSaveResponse._id == undefined) throw new Error('ODER_FAIL')
         res.send(OderSaveResponse)
    }catch(error) {
         if(error.message=="ODER_FAIL"){
              res.statusMessage='ODER_FAIL';
              res.sendStatus(403)
         }
         console.log(error)
    } 
})


module.exports = router