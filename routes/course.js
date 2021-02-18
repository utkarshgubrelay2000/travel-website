const express=require('express')
const router =express.Router()
const courseController=require("../controller/courseController")
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/course',courseController.getAllCourses)
router.get('/courseById/:courseId',courseController.getCourseById)
router.post('/add-new-course',verifyAdmin,courseController.addNewCourse,(err)=>{
    console.log('something went wrong')
})
router.put('/update-course/:courseId',verifyAdmin,courseController.updateCourse)
router.delete('/deletecourse/:courseId',verifyAdmin,courseController.deleteCourse )
module.exports=router