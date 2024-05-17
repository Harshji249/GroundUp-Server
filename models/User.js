const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    pincode: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const user = mongoose.model("User", userSchema)
user.createIndexes
module.exports = user