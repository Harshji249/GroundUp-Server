const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const { loginuser, registeruser, signupuser } = require('../controllers/AuthControllers');

//Send OPT using Twilio : POST "/api/auth/sendotp" 
router.post('/loginuser',[
    body('phone').isLength({ min: 10, max:10 }),
], loginuser)

//Check if user already exists in the db POST "/api/auth/validuser" 

//Add a new user in the dataBase: POST "/api/auth/registeruser" 
router.put('/registeruser/:id',[
    body('name').isLength({ min: 3 }),
    body('address').isLength({ min: 3 }),
    body('city').isLength({ min: 3 }),
    body('state').isLength({ min: 3 }),
    body('pincode').isLength({ min: 5 }),
    body('email').isEmail(),
], registeruser)

// Signup a new user via mail  : POST "/api/auth/signup"
router.post('/signup',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], signupuser)


module.exports = router