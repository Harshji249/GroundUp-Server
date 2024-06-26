const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalEarnings: {
        type:Number
    }
})
const admin = mongoose.model("Admin", adminSchema)
admin.createIndexes
module.exports = admin