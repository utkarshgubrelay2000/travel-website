const express=require('express')
const router =express.Router()
const verifyAdmin = require('../middleware/verifyAdmin');
const userController=require('../controller/userController')
router.get('/get-Orders',verifyAdmin,userController.getOrders)
module.exports=router