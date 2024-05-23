const generateOTP =()=>{
    return Math.floor(Math.random() * 9000) + 1000;
}
function generateFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  
module.exports ={
   generateOTP,
   generateFourDigitNumber
}