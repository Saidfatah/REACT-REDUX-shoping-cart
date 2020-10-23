const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
         firstName:String,
         lastName:String,
         email:String,
         password:String,
         rule:String
    }
)
module.exports = mongoose.model('User', UserSchema);