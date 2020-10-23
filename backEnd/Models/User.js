const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
         firstName:String,
         email:String,
         address:String,
         lastName:String,
         password:String,
         rule:String
    }
)
module.exports = mongoose.model('User', UserSchema);