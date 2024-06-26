const express = require("express");
const Ground = require("../models/Ground");
const Admin = require("../models/Admin");
const cloudinary = require("cloudinary").v2;
const { validationResult } = require("express-validator");
const ActiveGround = require("../models/ActiveGround");
require("dotenv").config();

function generateFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const addGround = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, description, address, timeSlot } = req.body;
    console.log("request", req);
    const file = req.files.image;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const ground = new Ground({
        name,
        description,
        address,
        timeSlot: JSON.parse(timeSlot),
        image: result.url,
        admin: req.user.id,
      });

      const savedGround = await ground.save();
      return res
        .status(200)
        .json({ savedGround, message: "Ground Posted Successfully" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchAllGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find();

    res.send({
      message: "All grounds listed successfully",
      status: 200,
      grounds,
    });
  } catch (err) {
    res.status(500).send("Internal server error occured");
  }
};

const bookGround = async (req, res) => {
  try {
    const { adminId, groundId, timeSlot,userName,groundName,image } = req.body;
    const activeGround = new ActiveGround({
      userId: req.user.id,
      adminId: adminId,
      groundId: groundId,
      timeSlot: JSON.parse(timeSlot),
      userName : userName,
      groundName : groundName,
      image : image,
      code: generateFourDigitNumber(),
    });
    const bookedGround = await activeGround.save();
    return res
      .status(200)
      .json({ bookedGround, message: "Ground Booked Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error occured");
  }
};

const myGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find({ admin: req.user.id });
    res
      .status(200)
      .json({ message: "Your Grounds Listed Successfully", grounds });
  } catch (err) {
    res.status(500).send("Internal server error occured");
  }
};

const bookedGrounds = async (req, res) => {
  try {
    const grounds = await ActiveGround.find({ adminId: req.user.id });
    res
      .status(200)
      .json({ message: "Your Booked Grounds Listed Successfully", grounds });
  } catch (err) {
    res.status(500).send("Internal server error occured");
  }
};
const myBookings = async (req, res) => {
    try {
      const grounds = await ActiveGround.find({ userId: req.user.id });
      res
        .status(200)
        .json({ message: "Your Booked Grounds Listed Successfully", grounds });
    } catch (err) {
      res.status(500).send("Internal server error occured");
    }
  };
module.exports = {
  addGround,
  fetchAllGrounds,
  bookGround,
  myGrounds,
  bookedGrounds,
  myBookings
};
