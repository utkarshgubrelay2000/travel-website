var express = require('express');
var router = express.Router();
var ImageController=require('../controller/imageController')
/* GET home page. */
router.post('/addImage',ImageController.addImage,err=>{
  console.log('error while signup user')
})
router.post('/postImage',ImageController.postImages,err=>{
  console.log('error while signup user')
})

module.exports=router