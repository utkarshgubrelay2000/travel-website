const adModel = require("../model/adModel");
const userModel = require("../model/userModel");

exports.getMyProfile = (req, res) => {
  userModel
    .findById(req.body.userId, {
      myCart: 0,
      otp: 0,
      ResetToken: 0,
      expireToken: 0,
      __v: 0,
    })
    .then((foundUser) => {
      if (foundUser) {
        res.json(foundUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(503).json({ message: "something went wrong", err: err });
    });
};
exports.postTestimonial = (req, res) => {
  adModel
    .findById(req.params.tourId)
    .then((foundAd) => {
      if (foundAd) {
        userModel
          .findById(req.body.userId)
          .then((foundUser) => {
            let testimonial = {
              reviewContent: req.body.reviewContent,
              reviewBy: req.body.userId,
              rating: req.body.rating,
            };
            foundAd.testimonial.push(testimonial);
            foundAd.save().then((saved) => {
              res.json("success");

            }).catch(err=>{
              res.status(404).json(err)
            });

          })
          .catch((err) => {
            res.status(404).json(err);
          });
      } else {
        res.status(404).json("not found");
      }
    })
    .catch((err) => {
      res.status(503).json(err);
    });
};
