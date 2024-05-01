const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const { registeradmin, loginadmin } = require('../controllers/AuthControllers');

//Add a new Admin in the dataBase: POST "/api/auth/registeradmin" 
router.post('/registeradmin',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({min: 5})
], registeradmin)

// login via mail  : POST "/api/auth/login"
router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], loginadmin)


module.exports = router