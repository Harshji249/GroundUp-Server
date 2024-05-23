const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const { addGround, fetchAllGrounds ,bookGround,myGrounds,bookedGrounds,myBookings} = require('../controllers/GroundControllers');
const fetchuser = require('../middleware/fetchuser');

//Add a new Ground in dataBase: POST "/api/ground/addnew" 
router.post('/addground',fetchuser,addGround)
//fetch your listed ground from dataBase: GET "/api/ground/mygrounds" 
router.get('/mygrounds',fetchuser,myGrounds)
//Fetch all ground for user from dataBase: GET "/api/ground/fetchallgrounds" 
router.get('/fetchallgrounds',fetchAllGrounds)
//Book your ground for user: POST "/api/ground/bookground" 
router.post('/bookground',fetchuser, bookGround)
//Fetch booking of admin: GET"/api/ground/bookedground" 
router.get('/bookedground',fetchuser, bookedGrounds)
//Fetch all bookings of user: GET "/api/ground/bookedground" 
router.get('/mybooking',fetchuser, myBookings)




module.exports = router