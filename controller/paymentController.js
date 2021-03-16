const Course = require("../model/adModel");
const order = require("../model/orderModel");
const paymentSuccess = require("../model/paymentSuccess");
const User = require("../model/customerModel");

const Coupon =require('../model/couponModel')
exports.createOrder = (req, res) => {
  const { course, userId,coupon } = req.body;

  let totalAmount = 0;
  course.map((element) => {
    Course.findOne({ _id: element.courseId }).then((foundCourse) => {
      totalAmount = foundCourse.price + totalAmount;
    });
   
  }
  
  );
  Coupon.findOne({couponCode:coupon}).then(foundCoupon=>{
    if(foundCoupon){
      let promo = totalAmount * foundCoupon.discount / 100
    if(promo>foundCoupon.maxDiscount){
        totalAmount -= foundCoupon.maxDiscount
    }else{
        totalAmount -= promo}
        console.log(totalAmount,promo)
      }
  })
  let newOrder = new order({
    confirmPayment: false,
    course: course,
    userId: userId,
  });
  newOrder
    .save()
    .then((saved) => {
        Course.findById(course[0].courseId).then(foundCourse=>{
            var jsSHA = require("jssha");
            const salt = "YBTXxvtOYC"; // Secure this on server
            const merchantKey = "u27hTjPi"; // Secure this on server
            User.findById(userId).then((foundUser) => {
              let name=foundUser.name.split(' ')
            //  console.log(name[0])
                var hashString =    merchantKey +    "|" +    saved._id +    "|" + totalAmount +     "|" +foundCourse.courseName + '|'  + name[0] + "|" + foundUser.email + "|" +
                "||||||||||" +
                salt;
                var sha = new jsSHA("SHA-512", "TEXT");
                sha.update(hashString);
                var hash = sha.getHash("HEX");
                console.log(hashString);
                console.log(hash);
              res.json({hash:hash,orderId:saved._id});
            })
      });
    })
    .catch((err) => {
      res.status(503).json(err);
    });
};

exports.confirmOrder = (req, res) => {
  const { paymentCallback, orderId, userId } = req.body;
  order
    .findOne({ _id: orderId, userId: userId })
    .then((foundOrder) => {
      if (foundOrder) {
        foundOrder.confirmPayment = true;
        foundOrder.save();
        let newPayment = new paymentSuccess({
          orderDetails: paymentCallback,
          orderId: orderId,
        });
        newPayment.save().then((saved) => {
          res.json("success");
foundOrder.course.map(courses=>{
  Course.findById(courses.courseId).then(foundCourse=>{
    if(foundCourse){
User.findById(req.body.userId).then(foundUser=>{
let newCart=foundUser.myCart;
newCart.push({date:new Date(),courseId:courses.courseId})
foundUser.myCart=newCart
foundUser.save()
console.log('added')


})
}
})
})

        });
      } else {
        res.status(503).then("Not Found");
      }
    })
    .catch((err) => {
      res.status(503).then("Something went wrong");
    });
};
