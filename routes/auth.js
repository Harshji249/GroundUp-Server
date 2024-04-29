const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const twilio = require('twilio')
require('dotenv').config()



const JWT_SECRET = "secretjwtstring"

//Create a User using mail : POST "/api/auth/createuser" 
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let checkUser = await User.findOne({ email: req.body.email });

        if (checkUser) {
            return res.status(400).json({ error: "User with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const { name, email, password } = req.body;
        const secPass = await bcrypt.hash(password, salt)
        let user = new User({ name: name, email: email, password: secPass });
        user = await user.save()
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })

    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

function generateRandom4DigitNumber() {

    return Math.floor(Math.random() * 9000) + 1000;
  }

router.post('/sendotp',[
    body('phone').isLength({ min: 10, max:10 }),
], async (req,res)=>{
    const {phone} = req.body; 
    console.log(phone,'phone')
    const otp = generateRandom4DigitNumber();
    const accountSid = process.env.ACCOUNTSID;
    const authToken = process.env.AUTHTOKEN;
    const client =new twilio(accountSid, authToken);
    
    client.messages
  .create({ body:`Your OTP for GroundUp is${otp}`, to:`+91${phone}`,from: "+1 833 322 5144" }).then((res)=>{
    res.status(200).json({message:`OTP ${otp} send successfully`})
  }).catch((err)=>{
    res.status(500).json({message:"Internal server error"})
  })
})

router.post('/registeruser',[
    body('fname').isLength({ min: 3 }),
    body('lname').isLength({ min: 3 }),
    body('address').isLength({ min: 3 }),
    body('city').isLength({ min: 3 }),
    body('state').isLength({ min: 3 }),
    body('pincode').isLength({ min: 5 }),
    body('email').isLength({ min: 10, max:10 }),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try{
        const {fname, lname, address,city,state,pincode,email} = req.body; 
    }
    catch(err){

    }
})


router.post('/signup',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('phone').isLength({ min: 10, max:10 }),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const {name, email, password, phone} = req.body; 
        const findEmail =await User.findOne({email})
        const findPhone =await User.findOne({phone})
        if(findEmail || findPhone){
            return res.status(400).json({message:"User with these credentials already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)
        let user = new User({ name: name, email: email, password: secPass, phone });
        user = await user.save()
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const { email, password} = req.body; 
        const user =await User.findOne({email})
        if (!user) {
            return res.status(400).json({ error: "Loggin with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Loggin with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken,user })


    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})


module.exports = router