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
         generalInfo:[{
             _id:false,
             time:{type:String},
    activities:{type:String},
    title:{type:String},
         }],
         tripType:[],
         testimonial:[
             {
            reviewBy:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'},
            rating:{type:Number,enum:[0,1,2,3,4,5,6,7,8,9],default:0},
            reviewContent:{type:String},
            replies:[{_id:false,reply:{type:String},replyBy:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'}}]
            }
         ]
             
    })

const Course = mongoose.model( "Ad" , Schema);
module.exports = Course;
