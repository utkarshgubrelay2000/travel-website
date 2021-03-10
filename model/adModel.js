const mongoose=require('mongoose');
const Schema= new mongoose.Schema({
         tourPlace : {type:String,required:true},
         tourDuration :{type:String},
         tourId:{type:String},
         price :{type:Number},
         thumbnailImage : {type:String},
         categoryId : {type:mongoose.Schema.Types.ObjectId,ref:'Category'},
         description : {type:String},
         images:[],
         videos:[],
         includes:[],
         keywords:[],
         generalInfo:{type:String},
         testimonials:[
             {
            reviewBy:{type:String},
            rating:{type:Number},
            reviewContent:{type:String},
            replies:[{_id:false,reply:{type:String}}]
            }
         ]
             
    })

const Course = mongoose.model( "Ad" , Schema);
module.exports = Course;
