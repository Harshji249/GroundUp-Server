const express = require('express')
const Ground = require('../models/Ground')
const Admin = require('../models/Admin')
const cloudinary = require('cloudinary').v2
const { validationResult } = require('express-validator');
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})
const addGround = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const {name, description,address,timeSlot} = req.body;
        const file = req.files.image;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
       await cloudinary.uploader.upload(file.tempFilePath,async (err,result)=>{
        const ground = new Ground({
            name,
            description,
            address,
            timeSlot,
            image: result.url,
            admin: req.user.id,
        });

        const savedGround = await ground.save();
        return res.status(200).json({savedGround, message:'Ground Posted Successfully'});
    }) 
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}




module.exports ={
    addGround, 
}