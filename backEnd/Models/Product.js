const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
         sizes:[],
         description:String,
         price:Number,
         images:String,
         title:String,
    }
)
module.exports = mongoose.model('Product', ProductSchema);