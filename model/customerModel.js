const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    required: true,
    type: Number,
  },
 
  // For forgot password purpose
  otp: {
    type: String,
  },
  ResetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },

myOrders:[{
  _id:false,orderId:{type:mongoose.Schema.Types.ObjectId,ref:'Order'}
}
]
});

const customers = mongoose.model("Customer", customerSchema);
module.exports = customers;
