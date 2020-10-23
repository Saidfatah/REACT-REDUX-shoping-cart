const router = require('express').Router();
const ProductModel = require('../Models/Product') 

router.get('/',async(req,res)=>{
    try {
        const productsResponse = await ProductModel.find({})
        if(productsResponse[0] == undefined) throw new Error('no products')
        res.json(productsResponse)
    } catch (error) {
        res.sendStatus(400).send('no products found ')
    }
})



module.exports = router
