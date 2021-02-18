const homeBanner=require('../model/homeBanner')
const courseModel=require('../model/courseModel')
const category = require('../model/categoryModel')
const coupon=require('../model/couponModel')


exports.getAllBanner=(req,res)=>{
    homeBanner.find({}).sort({_id:-1}).then(allBanner=>{
        res.json(allBanner)
    }).catch(err=>{
        res.status(503).json("Something went wrong")
    })
}
exports.getAllCourseByCategory=(req,res)=>{
    try {  
        category.aggregate([
            {
            $lookup: {
              from: "courses",
              localField: "_id",
              foreignField: "categoryId",
              as: "coursesCategoryWise",
            },
          },
          {$sort:{_id:-1}},
         { $addFields: {
            "coursesCategoryWise.categoryName":"$categoryName" }},
          //{$unwind:"$_id"}
          {$project:{'coursesCategoryWise.topics.subTopics.videoLink':0}}
    ]).then(allCourse=>{
res.json(allCourse)
    }).catch(err=>{
        res.status(503).json({message:'Something went wrong',err:err})
    }) } catch (error) {
        console.log(error)
    }
}

exports.getCoursByCourseId=(req,res)=>{
   const {courseId}=req.query

    courseModel.findOne({courseId:courseId},{'topics.subTopics.videoLink':0}).populate('categoryId').then(foundCourse=>{
        if(foundCourse){
            res.json(foundCourse)
        }else{
        res.status(404).json('No Such COurse exits')

        }
    }).catch(err=>{
        res.status(503).json('Something went wrong')
    })
}
exports.isCouponApplicable=(req,res)=>{
    coupon.findOne({couponCode:req.query.code}).then(foundCoupon=>{
        if(foundCoupon){

            res.json({applicable:true,couponCode:foundCoupon.couponCode,maxDiscount:foundCoupon.maxDiscount
              ,  discount:foundCoupon.discount
            })
        }else{
        res.json({applicable:false})

        }
    }).catch(err=>{
        res.status(503).json('Something went wrong')
    })
}