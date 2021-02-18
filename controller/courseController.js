const Course = require("../model/courseModel")

exports.addNewCourse=(req,res)=>{
const {courseName,courseDuration, price,thumbnailImage ,description,instructors,categoryId ,topics}=req.body

let courseId=courseName.replace(/\s/g,"-")

console.log(courseId)
Course.findOne({courseName:courseName}).then(foundCourse=>{
    if(foundCourse){
        res.status(409).json('Already Exist same name Conflict')
    }
    else{
        let courseId=courseName.replace(/\s/g,"-")
    let newCourse=new Course({
    courseName:courseName,
    price :price,
    courseDuration:courseDuration,
    thumbnailImage:thumbnailImage,
    description:description,
    instructors:instructors,
    categoryId:categoryId,
    topics:topics,
    courseId:courseId
})
newCourse.save().then(saved=>{
    res.json("Successfully Created A Course")
})
    }
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
    Course.findByIdAndUpdate(req.params.courseId,{courseName:courseName,
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
        Course.find({}).populate('categoryId').sort({_id:-1}).then(Courses=>{
            res.json(Courses)
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }
    exports.getCourseById=(req,res)=>{
        Course.findById(req.params.courseId).populate('categoryId').then(Courses=>{
            res.json(Courses)
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }
    exports.deleteCourse=(req,res)=>{
        Course.findByIdAndDelete(req.params.courseId).populate('categoryId').then(Courses=>{
            res.json("Delete Course")
        }).catch(err=>{
            res.status(503).json('Something Went Wrong')
        })
    }