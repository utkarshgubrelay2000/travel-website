const mongoose = require("mongoose");
const paymentSuccessSchema = new mongoose.Schema({
orderDetails:{type:Object},
orderId:{type:mongoose.Schema.Types.ObjectId,ref:'Order'}
});

const paymentSucces = mongoose.model("paymentSucces", paymentSuccessSchema);
module.exports = paymentSucces;
