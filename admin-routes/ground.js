const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const { addGround, fetchAllGrounds ,bookGround,myGrounds} = require('../controllers/GroundControllers');
const fetchuser = require('../middleware/fetchuser');

//Add a new Ground in dataBase: POST "/api/ground/addnew" 
router.post('/addground',fetchuser,addGround)
router.get('/mygrounds',fetchuser,myGrounds)
router.get('/fetchallgrounds',fetchAllGrounds)
router.post('/bookground',fetchuser, bookGround)




module.exports = router