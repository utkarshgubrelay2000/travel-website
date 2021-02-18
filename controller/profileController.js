const { response } = require("express")
const Course = require("../model/adModel")
const userModel=require('../model/userModel')

exports.addToMyCart=(req,res)=>{
   // console.log(req.body.userId)
    Course.findById(req.body.courseId).then(foundCourse=>{
        if(foundCourse){
userModel.findById(req.body.userId).then(foundUser=>{
    let newCart=foundUser.myCart;
    let response=false
foundUser.myCart.map(cartItems=>{
    if(cartItems.courseId==req.body.courseId){
response=true
    }
})
if(!response){
newCart.push({date:new Date(),courseId:req.body.courseId})
foundUser.myCart=newCart
foundUser.save()
    res.json('added')

}
else{
    res.json('already buyed it')
}
})
        }else{
        res.status(404).json({message:'Not Valid'})

        }
    }).catch(err=>{
        
        res.status(503).json({message:'something went wrong',err:err})
    })
    //res.json('ok')
}
exports.getMyCart=(req,res)=>{
    userModel.findById(req.body.userId).populate('myCart.courseId').then(foundUser=>{
        if(foundUser){
res.json(foundUser.myCart)
        }
        else{
            res.status(404).json({message:'User not found'})

        }
    }).catch(err=>{
        
        res.status(503).json({message:'something went wrong',err:err})
    })
}
exports.getMyProfile=(req,res)=>{
    userModel.findById(req.body.userId,{myCart:0,otp:0,ResetToken:0,expireToken:0,__v:0}).then(foundUser=>{
        if(foundUser){
res.json(foundUser)
        }
        else{
            res.status(404).json({message:'User not found'})

        }
    }).catch(err=>{
        
        res.status(503).json({message:'something went wrong',err:err})
    }) 
}
exports.getMyCourseById=(req,res)=>{
    userModel.findById(req.body.userId).then(foundUser=>{
      

    Course.findById(req.body.courseId).then(foundCourse=>{
        if(foundCourse){

            res.json(foundCourse)
        }else{
    res.status(404).json('Course deleted by admin')

        }
    })
        
    }).catch(err=>{
        res.status(404).json('something went wrong')
    })
}