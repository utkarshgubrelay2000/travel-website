const mongoose = require("mongoose");
const homeBannerSchema = new mongoose.Schema({

bannerURL:{type:String},
 bannerHeading:{type:String}, 
bannerSubHeading:{type:String}, 
targetURL:{type:String}, 
ctaText: {type:String}

});

const homeBanner = mongoose.model("HomeBanner", homeBannerSchema);
module.exports = homeBanner;
