const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
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


});

const Student = mongoose.model("User", StudentSchema);
module.exports = Student;
