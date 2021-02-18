const adModel = require("../model/adModel")

exports.addNewAd=(req,res)=>{
const {tourPlace,tourDuration, price,thumbnailImage 
    ,description,categoryId,images,includes,videos}=req.body

let tourId=tourPlace.replace(/\s/g,"-")
    let newadModel=new adModel({
    tourPlace:tourPlace,
    price :price,
    tourDuration:tourDuration,
    thumbnailImage:thumbnailImage,
    description:description,
  images:images,includes:includes,
    categoryId:categoryId,
    tourId:tourId
    ,videos:videos
})
newadModel.save().then(saved=>{
    res.json("Successfully Created Ad")

}).catch(err=>{
    res.status(503).json(err)
})


//     let String="123 hd 89"
//   let l=  String.replace(/\s/g,"-")
//     res.json(l)
}
exports.updateAd=(req,res)=>{
    const {tourPlace,tourDuration,price,thumbnailImage ,description,categoryId,images,includes,videos}=req.body
    
    let tourId=tourPlace.replace(/\s/g,"-")
    
    console.log(tourId)
    adModel.findByIdAndUpdate(req.params.tourId,{
        tourPlace:tourPlace,
        price :price,
        tourDuration:tourDuration,
        thumbnailImage:thumbnailImage,
        description:description,
      images:images,includes:includes,
        categoryId:categoryId,
        tourId:tourId
        ,videos:videos
    }).then(foundCourse=>{
        res.json("SuccessFully Updated")
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
    
    
    //     let String="123 hd 89"
    //   let l=  String.replace(/\s/g,"-")
    //     res.json(l)
    }
    exports.getAllAds=(req,res)=>{
        adModel.find({}).populate('categoryId').sort({_id:-1}).then(Courses=>{
            res.json(Courses)
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }
    exports.getAdById=(req,res)=>{
        adModel.findById(req.params.tourId).populate('categoryId').then(Courses=>{
            res.json(Courses)
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }
    exports.deleteAd=(req,res)=>{
        adModel.findByIdAndDelete(req.params.tourId).populate('categoryId').then(Courses=>{
            res.json("Delete Course")
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }