const adModel = require("../model/adModel");

exports.addNewAd = (req, res) => {
  const {
    tourPlace,
    tourDuration,
    price,
    thumbnailImage,
    description,
    categoryId,
    images,
    includes,
    videos,
    keywords,
    generalInfo,location
  } = req.body;
//console.log(req.body)

  let tourId = tourPlace.replace(/\s/g, "-");
  let newadModel = new adModel({
    tourPlace: tourPlace,
    price: price,
    tourDuration: tourDuration,
    thumbnailImage: thumbnailImage,
    description: description,
    images: images,
    includes: includes,
    categoryId: categoryId,
    tourId: tourId,
    videos: videos,
    location:location,
    keywords: keywords,
    generalInfo: generalInfo,
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
    tourPlace,
    tourDuration,
    price,
    thumbnailImage,
    description,
    categoryId,
    images,
    includes,
    videos,location
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
