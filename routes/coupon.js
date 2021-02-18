const express=require('express')
const router =express.Router()
const couponController=require("../controller/couponController")
const verifyAdmin = require('../middleware/verifyAdmin');
router.get('/coupon',couponController.getAllCoupons)
router.get('/couponById/:couponId',couponController.getCouponById)
router.post('/create-Coupon',verifyAdmin,couponController.createCoupon,(err)=>{
    console.log('something went wrong')
})
router.put('/update-coupon/:couponId',verifyAdmin,couponController.updateCoupon)
router.delete('/deletecoupon/:couponId',verifyAdmin,couponController.deleteCoupon )
module.exports=router