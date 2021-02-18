const mongoose=require('mongoose');
const Schema= new mongoose.Schema({
         tourPlace : {type:String,required:true},
         tourDuration :{type:String},
         tourId:{type:String},
         price :{type:Number},
         thumbnailImage : {type:String},
         categoryId : {type:mongoose.Schema.Types.ObjectId,ref:'Category'},
         description : {type:String},
         images:[],videos:[],
         includes:[]
         ,testimonial:[{
             content:{type:String},
             user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
             rating:{type:Number,
                enum:[1,2,3,4,5,6,7,8,9,10]}
         }]
             
    })

const Course = mongoose.model( "Ad" , Schema);
module.exports = Course;
