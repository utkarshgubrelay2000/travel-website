const homeBannerModel=require('../model/homeBanner')

exports.homePageBanner=(req,res)=>{
    const {bannerURL,
    bannerHeading ,
   bannerSubHeading ,
   targetURL,
   ctaText}= req.body
    homeBannerModel.findOne({bannerHeading:bannerHeading}).then(foundBanner=>{
        if(foundBanner){
            res.status(409).json('ALready exist name conflict')
        }
        else{
            let newBanner=new homeBannerModel({
                bannerURL:bannerURL,
 bannerHeading:bannerHeading, 
bannerSubHeading:bannerSubHeading, 
targetURL:targetURL, 
ctaText: ctaText
            })
            newBanner.save()
            res.json('Created Banner')

        }
    })
}
exports.getAllBanner=(req,res)=>{
    homeBannerModel.find({}).sort({_id:-1}).then(Courses=>{
        res.json(Courses)
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}

exports.gethomeBannerById=(req,res)=>{
    homeBannerModel.findById(req.params.bannerId).then(homeBanner=>{
        res.json(homeBanner)
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}
exports.deleteHomeBanner=(req,res)=>{
    homeBannerModel.findByIdAndDelete(req.params.courseId).populate('categoryId').then(homeBanners=>{
        res.json("Delete homeBanner")
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}
exports.updateBanner=(req,res)=>{
    const {bannerURL,
        bannerHeading ,
       bannerSubHeading ,
       targetURL,
       ctaText}=req.body
    homeBannerModel.findByIdAndUpdate(req.params.bannerId,{
        ctaText :ctaText,
        bannerURL:bannerURL,
        bannerHeading:bannerHeading,
        targetURL:targetURL,
        bannerSubHeading:bannerSubHeading,

    }).then(foundbanner=>{
        res.json("SuccessFully Updated")
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
    
    
    //     let String="123 hd 89"
    //   let l=  String.replace(/\s/g,"-")
    //     res.json(l)
    }