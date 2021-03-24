var express = require('express');
const categoryController = require('../controller/categoryController');
var router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
/* GET home page. */
router.get('/checking', verifyAdmin, (req, res) => {
  res.json('ok')
}, err => {
  console.log('error while signup user')
})
router.get('/getAllCategories',categoryController.getAllCategories)
router.get('/getCategoryById/:id',categoryController.getCategoryById)

router.post('/postCategory', verifyAdmin, categoryController.postCategory, err => {
  console.log('error while signup user')
})

router.put('/updateCategory', verifyAdmin, categoryController.updateCategory, err => {
  console.log('error while signup user')
})
router.delete('/deleteCategory/:categoryId', verifyAdmin, categoryController.deleteCategory, err => {
  console.log('error while signup user')
})
module.exports = router