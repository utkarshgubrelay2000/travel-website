const express=require('express')
const router =express.Router()
const verifyAdmin = require('../middleware/verifyAdmin');
const homeBannerController=require("../controller/homeBannerController")

router.get('/allBanners',homeBannerController.getAllBanner)
router.get('/bannerById/:bannerId',homeBannerController.gethomeBannerById)
router.post('/home-page-banner',verifyAdmin,homeBannerController.homePageBanner,(err)=>{
    console.log('something went wrong')
})
router.put('/update-banner/:bannerId',verifyAdmin,homeBannerController.updateBanner)
router.delete('/deletebanner/:bannerId',verifyAdmin,homeBannerController.deleteHomeBanner )
module.exports=router