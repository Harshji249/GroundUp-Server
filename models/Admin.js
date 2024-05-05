const mongoose = require('mongoose');

const activeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    groundId:{
        type:String,
        required:true
    },
    code: {
        type: String,
        required: true
    },
});

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
    activeGround:{activeSchema},
    totalEarnings: {
        type:Number
    }
})
const admin = mongoose.model("Admin", adminSchema)
admin.createIndexes
module.exports = admin