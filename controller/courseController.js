const adModel = require("../model/adModel")

exports.addNewCourse=(req,res)=>{
const {tourName,tourDuration, price,thumbnailImage ,description,categoryId,images,includes}=req.body

let tourId=tourName.replace(/\s/g,"-")

console.log(tourId)
        let courseId=courseName.replace(/\s/g,"-")
    let newCourse=new adModel({
    tourName:tourName,
    price :price,
    tourDuration:tourDuration,
    thumbnailImage:thumbnailImage,
    description:description,
  images:images,includes:includes,
    categoryId:categoryId,
    tourId:tourId
})
newadModel.save().then(saved=>{
    res.json("Successfully Created A Course")

}).catch(err=>{
    res.status(503).json('Something Went Wrong')
})


//     let String="123 hd 89"
//   let l=  String.replace(/\s/g,"-")
//     res.json(l)
}
exports.updateCourse=(req,res)=>{
    const {courseName,courseDuration, price,thumbnailImage ,description,instructors,categoryId ,topics}=req.body
    
    let courseId=courseName.replace(/\s/g,"-")
    
    console.log(courseId)
    adModel.findByIdAndUpdate(req.params.courseId,{courseName:courseName,
        price :price,
        courseDuration:courseDuration,
        thumbnailImage:thumbnailImage,
        description:description,
        instructors:instructors,
        categoryId:categoryId,
        topics:topics,
        courseId:courseId
    }).then(foundCourse=>{
        res.json("SuccessFully Updated")
    }).catch(err=>{
        res.status(503).json('Something Went Wrong')
    })
    
    
    //     let String="123 hd 89"
    //   let l=  String.replace(/\s/g,"-")
    //     res.json(l)
    }
    exports.getAllCourses=(req,res)=>{
        adModel.find({}).populate('categoryId').sort({_id:-1}).then(Courses=>{
            res.json(Courses)
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }
    exports.getCourseById=(req,res)=>{
        adModel.findById(req.params.courseId).populate('categoryId').then(Courses=>{
            res.json(Courses)
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }
    exports.deleteCourse=(req,res)=>{
        adModel.findByIdAndDelete(req.params.courseId).populate('categoryId').then(Courses=>{
            res.json("Delete Course")
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }