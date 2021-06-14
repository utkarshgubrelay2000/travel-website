const adModel = require("../model/adModel");
const category = require("../model/categoryModel");

exports.addNewAd = (req, res) => {
  const {
    tourPlace,
    tourDuration,
    price,
    thumbnailImage,
    description,
    Accommodation,
    thingsToCarry,
    termsandConditions,
    categoryId,
    images,
    includes,
    Exclusion,
    videos,
    keyword,
    generalInfo,location,cardImage,dates
  } = req.body;
console.log(req.body)

  let tourId = tourPlace.replace(/\s/g, "-");
  let newadModel = new adModel({
    tourPlace: tourPlace,
    price: price,
    tourDuration: tourDuration,
    thumbnailImage: thumbnailImage,
    cardImage:cardImage,
    description: description,
    images: images,
    includes: includes,
    categoryId: categoryId,
    tourId: tourId,
    videos: videos,
    location:location,
    keywords: keyword,
    generalInfo: generalInfo,
    Accommodation:Accommodation,termsandConditions:termsandConditions,
    Exclusion:Exclusion,thingsToCarry:thingsToCarry,dates:dates
  });
  newadModel
    .save()
    .then((saved) => {
      res.json("Successfully Created Ad");
    })
    .catch((err) => {
      res.status(503).json(err);
    });

  //     let String="123 hd 89"
  //   let l=  String.replace(/\s/g,"-")
  //     res.json(l)
};
exports.updateAd = (req, res) => {
  const {
    tourPlace, Accommodation,
    thingsToCarry,dates,
    termsandConditions,Exclusion,
    tourDuration,
    price,
    thumbnailImage,
    description,
    categoryId,
    images,
    includes,
    videos,location,cardImage,generalInfo
  } = req.body;

  let tourId = tourPlace.replace(/\s/g, "-");

  console.log(tourId);
  adModel
    .findByIdAndUpdate(req.params.tourId, {
      tourPlace: tourPlace,
      price: price,
      tourDuration: tourDuration,
      thumbnailImage: thumbnailImage,
      description: description,
      images: images,
      includes: includes,
      categoryId: categoryId,
      tourId: tourId,
      location:location,
      dates:dates,
      cardImage:cardImage,
      generalInfo: generalInfo,
      Accommodation:Accommodation,termsandConditions:termsandConditions,
      Exclusion:Exclusion,thingsToCarry:thingsToCarry
    })
    .then((foundCourse) => {
      res.json("SuccessFully Updated");
    })
    .catch((err) => {
      res.status(503).json("Something Went Wrong");
      console.log(err)
    });

  //     let String="123 hd 89"
  //   let l=  String.replace(/\s/g,"-")
  //     res.json(l)
};
exports.getAllAds = (req, res) => {
  adModel
    .find({})
    .populate("categoryId")
    .sort({ _id: -1 })
    .then((Courses) => {
      res.json(Courses);
    })
    .catch((err) => {
      res.status(503).json("Something Went Wrong");
    });
};
exports.getAdById = (req, res) => {
  try {
    

  adModel
    .findById(req.params.tourId)
    .populate({path:'testimonial.reviewBy',model:"Customer"}).populate('categoryId')
    .then((Courses) => {
      res.json(Courses);
    })
    ;} catch (error) {
    console.log(error)
  }
};
exports.deleteAd = (req, res) => {
  adModel
    .findByIdAndDelete(req.params.tourId)
    .populate("categoryId")
    .then((Courses) => {
      res.json("Delete Course");
    })
    .catch((err) => {
      res.status(503).json("Something Went Wrong");
    });
};
exports.getTopRatedAd = (req, res) => {
  adModel
    .aggregate([
      {
        $project: { avgRating: { $avg: "$testimonial.rating" },
      data:"$$ROOT"   },
      },
      {$sort:{"avgRating":-1}}
    ])

    .then((topRated) => {
      res.json(topRated);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
exports.getAllTrending=(req,res)=>{
  adModel
    .find({trending:true})
    .populate("categoryId")
    .sort({ _id: -1 })
    .then((Courses) => {
      res.json(Courses);
    })
    .catch((err) => {
      res.status(503).json("Something Went Wrong");
    });
}
exports.setTrending=(req,res)=>{
  adModel.findById(req.params.id).then(found=>{
    found.trending=req.body.trending
    found.save()
  }).catch(err=>{
    res.statu(503).json('error')
  })
}
exports.getAllTourByCategory=(req,res)=>{
  try {  
      category.aggregate([
          {
          $lookup: {
            from: "ads",
            localField: "_id",
            foreignField: "categoryId",
            as: "CategoryWise",
          },
        },
        {$limit:3}
  ]).then(allCourse=>{
    let array=[]
    allCourse.map(item=>{
      if(item.CategoryWise.length!==0){
array.push(item)
      }
    })
res.json(array)
  }).catch(err=>{
      res.status(503).json({message:'Something went wrong',err:err})
  }) } catch (error) {
      console.log(error)
  }
}