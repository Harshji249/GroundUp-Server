const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    startTime: {
        type: String,
        required: true
    },
    endTime:{
        type:String,
        required:true
    },
    price: {
        type: String,
        required: true
    },
    booked :{
        type:Boolean,
        default : false
    }
});

const groundSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required:true,
    },
    timeSlot: [timeslotSchema],
    date: {
        type: Date,
        default: Date.now
    },
})
const ground = mongoose.model("Ground", groundSchema)
ground.createIndexes
module.exports = ground