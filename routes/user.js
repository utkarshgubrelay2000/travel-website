const express=require('express')
const router =express.Router()
const verifyAdmin = require('../middleware/verifyAdmin');
const userController=require('../controller/userController')
router.get('/get-Orders',verifyAdmin,userController.getOrders)
router.get('/get-all-users',verifyAdmin,userController.getAllUser)
router.get('/all-data',verifyAdmin,userController.allData)
module.exports=router