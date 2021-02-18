var express = require('express');
var router = express.Router();
var userAuthentication=require('../controller/authController')


/* GET home page. */
router.post('/signup',userAuthentication.Signup,err=>{
  console.log('error while signup user')
})
router.post('/signin',userAuthentication.Signin,err=>{
  console.log('error while signup user')
})

/// FORGOT PASSWORD APIS  //////
router.post('/forgot', userAuthentication.ForgetPassword)
router.post('/verify-otp', userAuthentication.verifyOTP)
router.post('/reset-password', userAuthentication.newPassword)


module.exports=router