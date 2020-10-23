const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
         fullName:String,
         address:String,
         total:Number,
         date:date,
         email:String,
         items:[],
         state:String,
         user_id:Schema.Types.ObjectId
    }
)
module.exports = mongoose.model('Order', OrderSchema);