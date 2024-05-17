const mongoose = require('mongoose');

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
   }
})
const activeGround = mongoose.model("ActiveGround", activeGroundSchema)
activeGround.createIndexes
module.exports = activeGround