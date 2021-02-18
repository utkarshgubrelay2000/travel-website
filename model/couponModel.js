const mongoose = require("mongoose");
const CouponSchema = new mongoose.Schema({
couponCode:{type:String}, discount:{type:Number}, maxDiscount:{type:Number}

});

const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;
