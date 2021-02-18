const adModel=require('../model/adModel')
const category = require('../model/categoryModel')
const coupon=require('../model/couponModel')


exports.getAllTour=(req,res)=>{
    adModel.find({}).sort({_id:-1}).then(tours=>{
        res.json(tours)
    }).catch(err=>{
        res.status(503).json(err)
    })
}

exports.getTourBytourId=(req,res)=>{
   const {tourId}=req.query

    adModel.findOne({tourId:tourId}).populate('categoryId').then(foundCourse=>{
        if(foundCourse){
            res.json(foundCourse)
        }else{
        res.status(404).json('No Such Tour exits')

        }
    }).catch(err=>{
        res.status(503).json('Something went wrong')
    })
}
exports.isCouponApplicable=(req,res)=>{
    coupon.findOne({couponCode:req.query.code}).then(foundCoupon=>{
        if(foundCoupon){

            res.json({applicable:true,coupon:foundCoupon  })
        }else{
        res.json({applicable:false})

        }
    }).catch(err=>{
        res.status(503).json('Something went wrong')
    })
}