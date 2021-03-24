const mongoose = require("mongoose");
const ImagesSchema = new mongoose.Schema({
  Images: [{
      url:{type:String},rating:{type:Number},tourPlace:{type:String}
  }]
});

const Images = mongoose.model("Images", ImagesSchema);
module.exports = Images;
