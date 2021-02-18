const mongoose=require('mongoose');
const Schema= new mongoose.Schema({
         courseName : {type:String,required:true},
         courseDuration :{type:Number},
         courseId:{type:String},
         price :{type:Number},
         thumbnailImage : {type:String},
         categoryId : {type:mongoose.Schema.Types.ObjectId,ref:'Category'},
         description : {type:String},
              topics :[
           { _id:false,
               topicName : {type:String},
               topicDuration :{type:String},
               subTopics :[
                 { _id:false,
                     subTopicName : {type:String},
                     duration :{type:String},
                     videoLink : {type:String} ,
                     previewLink : {type:String} 
                 }
              ]}],
         instructors :[
           {
            _id:false,
               name : {type:String},
               position : {type:String},
               company : {type:String},
               imageLink : {type:String}     },
        ]
    })

const Course = mongoose.model( "Course" , Schema);
module.exports = Course;
