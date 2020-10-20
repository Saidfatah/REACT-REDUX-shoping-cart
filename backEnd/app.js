const express= require('express')
const app = express()
const mongoose = require('mongoose')
const cors =require('cors')
const bodyParser =require('body-parser')
const productRoute = require('./routes/products').router
const ProductModel = require('./Models/Product') 

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://admin:123456Imgamers@saidfatah.sfpyf.mongodb.net/shopingCartRedux?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true },
 async () => {
        try {
           console.log('connected')
        } catch (error) {
            console.log(error)
        }

})



app.use('/products',productRoute)


app.listen(4000,  ()=> {
    console.log('Listening now');
});