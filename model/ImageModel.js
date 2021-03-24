const mongoose = require("mongoose");
const ImagesSchema = new mongoose.Schema({
  Images: []
});

const Images = mongoose.model("Images", ImagesSchema);
module.exports = Images;
