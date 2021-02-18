const couponModel=require('../model/couponModel')

exports.createCoupon=(req,res)=>{
    const {couponCode, discount, maxDiscount}= req.body
    couponModel.findOne({couponCode:couponCode}).then(foundCoupon=>{
        if(foundCoupon){
            res.status(409).json('ALready exist name conflict')
        }
        else{
            let newCoupon=new couponModel({
                couponCode:couponCode,
                discount:discount,
                maxDiscount:maxDiscount
            })
            newCoupon.save()
            res.json('Created Coupon')

        }
    })
}
exports.getAllCoupons=(req,res)=>{
    couponModel.find({}).sort({_id:-1}).then(Coupons=>{
        res.json(Coupons)
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}

exports.getCouponById=(req,res)=>{
    couponModel.findById(req.params.couponId).then(coupon=>{
        res.json(coupon)
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}
exports.deleteCoupon=(req,res)=>{
    couponModel.findByIdAndDelete(req.params.couponId).populate('categoryId').then(coupons=>{
        res.json("Delete coupon")
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
}
exports.updateCoupon=(req,res)=>{
    const {maxDiscount,discount,couponCode}=req.body
    couponModel.findByIdAndUpdate(req.params.couponId,{
        couponCode:couponCode,
        discount:discount,
        maxDiscount:maxDiscount

    }).then(foundCoupon=>{
        res.json("SuccessFully Updated")
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
    
    
    //     let String="123 hd 89"
    //   let l=  String.replace(/\s/g,"-")
    //     res.json(l)
    }