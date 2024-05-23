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
const activeGroundSchema = new mongoose.Schema({
   userId:{
    type:String,
    required:true
   },
   adminId:{
    type:String,
    required:true
   },
   groundId:{
    type:String,
    required:true
   },
   code:{
    type:String,
    required:true
   },
   timeSlot :[timeslotSchema],
   userName:{
      type:String,
      required:true
   },
   groundName:{
      type:String,
      required:true
   },
   image: {
      type: String,
      required: true
  },
})
const activeGround = mongoose.model("ActiveGround", activeGroundSchema)
activeGround.createIndexes
module.exports = activeGround