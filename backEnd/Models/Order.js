const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
         sizes:[],
         fullName:String,
         address:String,
         description:String,
         total:Number,
         date:date,
         items:[],
    }
)
module.exports = mongoose.model('Order', OrderSchema);