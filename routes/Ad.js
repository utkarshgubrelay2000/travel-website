const express=require('express')
const router =express.Router()
const adController=require("../controller/adController")
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/get-all-ad',adController.getAllAds)
router.get('/adById/:adId',adController.getAdById)
router.post('/add-new-ad',verifyAdmin,adController.addNewAd,(err)=>{
    console.log('something went wrong')
})
router.put('/update-ad/:adId',verifyAdmin,adController.updateAd)
router.delete('/delete-ad/:adId',verifyAdmin,adController.deleteAd )
module.exports=router