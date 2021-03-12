const express=require('express')
const router =express.Router()
const adController=require("../controller/adController")
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/get-all-ad',adController.getAllAds)
router.get('/get-top-rated-ads',adController.getTopRatedAd)
router.get('/adById/:tourId',adController.getAdById)
router.post('/add-new-ad',verifyAdmin,adController.addNewAd,(err)=>{
    console.log('something went wrong')
})
router.put('/update-ad/:tourId',verifyAdmin,adController.updateAd)
router.delete('/delete-ad/:tourId',verifyAdmin,adController.deleteAd)
module.exports=router;