const router = require('express').Router();
const OderModel = require('../Models/Order')
const verifyToken = require('../config/jwt')


router.get('/',verifyToken,async (req,res)=>{
    try {      
        const orderGetResponse = await  OderModel.find({})
        if(orderGetResponse == undefined) throw new Error('NO_ORDERS')
        res.json(orderGetResponse)
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
         const OderSave= new OderModel({fullName,address,total,email,date,items,user_id,state:'PENDING'}).save()
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

router.post('/update',async(req,res)=>{
    try {
         const {state,_id} = req.body 
         if (!_id || state =="") throw new Error('SOMTHING_WENT_WRONG')
       
         const existingOrder = await OderModel.findOne({ _id});
         if (!existingOrder) throw new Error('INVALID_ID')
         console.log(existingOrder)
         console.log(state)
        
         const update = { state};
         const updateResponse = await existingOrder.updateOne(update);
         const updatedDoc = await OderModel.findOne({_id});
         res.json(updatedDoc)
    }catch(error) {
         res.statusMessage='UPDATE_FAILED';
         res.sendStatus(403) 
          console.log(error)
    } 
})


module.exports = router