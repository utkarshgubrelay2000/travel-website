var express = require('express');
var router = express.Router();
var userController=require('../controller/userController');
var profileController=require('../controller/profileController');
var requireLogin=require('../middleware/requireLogin')
var paymentController=require('../controller/paymentController')
/* GET home page. */
router.get('/get-home-page-banner',userController.getAllBanner)
router.get('/get-all-courses-by-all-category',userController.getAllCourseByCategory)
router.get('/get-course-by-classId?',userController.getCoursByCourseId)
router.get('/isCouponApplicable?',userController.isCouponApplicable)

//// Profile settings
router.post('/add-course-to-my-cart',requireLogin,profileController.addToMyCart);
router.get('/getMyCart',requireLogin,profileController.getMyCart)
router.get('/getMyProfile',requireLogin,profileController.getMyProfile)
router.get('/getMyCourseById',requireLogin,profileController.getMyCourseById)


/// Payment Apis
router.post('/create-order',requireLogin,paymentController.createOrder)
router.post('/confirm-order',requireLogin,paymentController.confirmOrder)
module.exports=router;