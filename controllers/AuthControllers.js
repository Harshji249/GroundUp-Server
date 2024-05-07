const express = require('express')
const User = require('../models/User')
const Admin = require('../models/Admin')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const JWT_SECRET = "secretjwtstring"

const loginuser = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const {email, password} = req.body;
        let user = await User.findOne({ email });
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
        res.json({ authToken, admin, rejistered:true })
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
        const {name,address,city,state,pincode, phone} = req.body;
        const updateUser = {}
        if(name)updateUser.name= name
        if(address)updateUser.address= address
        if(city)updateUser.city= city
        if(state)updateUser.state= state
        if(pincode)updateUser.pincode= pincode
        if(phone)updateUser.phone= phone

        let user =await User.findById(req.params.id);
        if(!user) res.status(404).send('Not Found');
        user = await User.findByIdAndUpdate(req.params.id,{$set:updateUser}, {new:true})
        res.status(200).json({ data:user, registered: true })
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const signupuser =  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        console.log('request, recieves')
        const { name,email,password } = req.body; 
        const userEmail = await User.findOne({email})
        if (userEmail) {
            return res.status(400).json({ error: "User with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        let user = new User({ name: name, email: email, password: secPass });
        user = await user.save()
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({message:'User created successfuly', authToken, registered:false })
    }
    catch(err){
        console.error(err)
        res.status(500).send("Internal server error occured")
    }
}

const registeradmin = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const {name, email, password} = req.body;
   
        let checkAdmin = await Admin.findOne({ email });

        if (checkAdmin) {
            return res.status(400).json({ error: "User with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        let admin = new Admin({ name: name, email: email, password: secPass });
        admin = await admin.save()
        const data = {
            admin: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({message:'Admin created successfuly', authToken , admin})
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
}

const loginadmin = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { email, password } = req.body;
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: "Loggin with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, admin.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Loggin with correct credentials" })
        }
        const data = {
            admin: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken, admin })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")

    }
}



module.exports ={
    loginuser,
    signupuser,
    registeruser,
    registeradmin,
    loginadmin
}