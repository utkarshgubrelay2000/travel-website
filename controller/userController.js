const adModel = require("../model/adModel");
const customerModel = require("../model/customerModel");
const coupon = require("../model/couponModel");
const Razorpay = require("razorpay");
const order = require("../model/orderModel");

exports.getAllTour = (req, res) => {
  adModel
    .find({})
    .populate("testimonial.user")
    .populate({ model: "Category", path: "categoryId" })
    .sort({ _id: -1 })
    .then((tours) => {
      res.json(tours);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
};
exports.getTourBytourId = (req, res) => {
  const { id } = req.params;

  adModel
    .findOne({ _id: id })
    .populate({ model: "Customer", path: "testimonial.reviewBy" })
    .populate("categoryId")
    .then((foundCourse) => {
      if (foundCourse) {
        res.json(foundCourse);
      } else {
        res.status(404).json("No Such Tour exits");
      }
    })
    .catch((err) => {
      res.status(503).json("Something went wrong");
    });
};
exports.isCouponApplicable = (req, res) => {
  coupon
    .findOne({ couponCode: req.query.code })
    .then((foundCoupon) => {
      if (foundCoupon) {
        res.json({ applicable: true, coupon: foundCoupon });
      } else {
        res.json({ applicable: false });
      }
    })
    .catch((err) => {
      res.status(503).json("Something went wrong");
    });
};
exports.postRazorpayOrder = (req, res) => {
  const {
    userId,
    tripId,
    paymentId,
    totalAmount,
    people,
    dateOn,
    dateTill,
    note,
    email,
    mobile,
  } = req.body;
  new Promise((resolveRazorpayOrder, rej) => {
    adModel.findById(tripId).then((foundAd) => {
      if (foundAd) {
        customerModel.findById(userId).then((foundCus) => {
          if (foundCus) {
            let neworder = new order({
              userId: userId,
              tripId: tripId,
              dateOn: dateOn,
              dateTill: dateTill,
              note: note,
              email: email,
              mobile: mobile,
              totalAmount: totalAmount,
              paymentId: paymentId,
              people: people,
            });
            neworder.save().then((amount) => {
              if (amount <= 0)
                return res
                  .status(400)
                  .json({ error: "Amount must be greater than zero" });
              let instance = new Razorpay({
                key_id: "rzp_test_tdnTzNT1KfkDD6",
                key_secret: `AQ9AI251OhAGREhbhLqjTLUW`,
              });
              // console.log(amount,"Talking")
              instance.orders.create(
                {
                  amount: totalAmount,
                  currency: "INR",
                  receipt: "order_reciept" + userId,
                },
                function (err, order) {
                  if (err) {
                    console.log("error in creating order", err);
                  }
                  //console.log(order,'ordef')
                  let orderArray=foundCus.myOrders
                  orderArray.push({orderId:amount._id})
                  foundCus.myOrders=orderArray;
                  foundCus.save()
                  res.json(order);
                }
              );
            });
          }
        });
      } else {
        res.status(404).json("Trip not found");
      }
    });
  });
};
exports.getTourCategoryWise=(req,res)=>{
  adModel.find({categoryId:req.params.id}).then(found=>{
    res.json(found)
  }).catch(err=>{
    res.status(503).json(err)
  })
}