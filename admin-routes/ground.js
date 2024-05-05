const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const { addGround } = require('../controllers/GroundControllers');
const fetchuser = require('../middleware/fetchuser');

//Add a new Ground in dataBase: POST "/api/ground/addnew" 
router.post('/addground',fetchuser,addGround)



module.exports = router