const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
course:[
    
    {courseId:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},_id:false}
],
confirmPayment:{type:Boolean},
userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
