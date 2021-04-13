const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
tripId:{type:mongoose.Schema.Types.ObjectId,ref:'Ad'},
userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
 totalAmount:{type:Number},
 people:{type:Number},dateOn:{type:String}
 ,dateTill:{type:String}
 ,note:{type:String}
 ,email:{type:String}
 ,mobile:{type:String},
 paymentId:{type:String}

});

const order = mongoose.model("Order", orderSchema);
module.exports = order;
