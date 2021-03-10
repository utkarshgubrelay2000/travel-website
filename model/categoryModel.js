const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  thumbImage:{type:String},
  description:{type:String}
});

const category = mongoose.model("Category", categorySchema);
module.exports = category;
