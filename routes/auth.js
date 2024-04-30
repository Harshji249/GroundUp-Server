const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const { sendOTP, validuser, registeruser, signup } = require('../controllers/AuthControllers');

//Send OPT using Twilio : POST "/api/auth/sendotp" 
router.post('/sendotp',[
    body('phone').isLength({ min: 10, max:10 }),
], sendOTP)

//Check if user already exists in the db POST "/api/auth/validuser" 
router.post('/validuser',[
    body('phone').isLength({ min: 10, max:10 }),
], validuser)

//Add a new user in the dataBase: POST "/api/auth/registeruser" 
router.post('/registeruser',[
    body('name').isLength({ min: 3 }),
    body('address').isLength({ min: 3 }),
    body('city').isLength({ min: 3 }),
    body('state').isLength({ min: 3 }),
    body('pincode').isLength({ min: 5 }),
    body('email').isLength({ min: 10, max:10 }),
], registeruser)

// Signup a new user via mail  : POST "/api/auth/signup"
router.post('/signup',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], signup)


module.exports = router