const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogId:{type:String},
  shortDescription: {
    type: String,
    required: true,
  },
  thumbImage: {
    type: String,
    required: true,
  },
  content: {
    required: true,
    type: Number,
  },
 

});

const admin = mongoose.model("Blog", adminSchema);
module.exports = admin;
