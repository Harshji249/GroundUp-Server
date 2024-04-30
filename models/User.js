const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const user = mongoose.model("User", userSchema)
user.createIndexes
module.exports = user