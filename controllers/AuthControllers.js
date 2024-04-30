const express = require('express')
const User = require('../models/User')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const twilio = require('twilio')
const { generateOTP } = require('../utility')

const JWT_SECRET = "secretjwtstring"

const sendOTP = async (req,res)=>{
    const {phone} = req.body; 
    const otp = generateOTP();
    const accountSid = "AC94ebeb0fb991e18d794ecc92ae6691ea";
    const authToken = "eabd78aee43b65b19bd8f8efe2fc7d0f";
    const client = new twilio(accountSid, authToken);
    
    try {
        const twilioRes = await client.messages.create({ 
            body: `Your OTP for GroundUp is ${otp}`, 
            to: `+91${phone}`, 
            from: "+1 833 322 5144" 
        });
        return res.status(200).json({ message: `OTP ${otp} sent successfully` });
    } catch (err) {
        console.error("Error sending OTP:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const validuser = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const {phone} = req.body;
        const user = User.findOne({phone});
        if(user){
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({message:"User with these credentials already exists", authToken});
        }
        else{
            return res.status(201).json({message:'New User'});
        }
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const registeruser = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try{
        const {name,address,city,state,pincode,email, phone} = req.body;
        let user = new User({ name, address, city,state, pincode,phone,email,phone });
        user = await user.save()
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({ authToken })
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const signup =  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const { email } = req.body; 
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User with these credentials already exists"})
        }
       else{
        return res.status(201).json({message:'New User'})
       }
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
}

module.exports ={
    sendOTP,
    validuser,
    signup,
    registeruser
}