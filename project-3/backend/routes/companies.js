const express = require("express");
const router = express.Router();

const Company = require("../models/company.model");

// @route     GET companies
// @desc      Get all companies with possible sorts and filters on zipcode and city
// @access    Public
router.route("/:orderby").get((req, res) => {
  let orderInt;

  let orderby = req.params.orderby;

  console.log(orderby);

  // 1 = ASC, -1 = DESC
  if (orderby.includes("NAME")) {
    if (orderby.includes("NAME_AZ")) {
      orderInt = 1;
    } else if (orderby.includes("NAME_ZA")) {
      orderInt = -1;
    }
  } else if (orderby.includes("SMILEY")) {
    if (orderby.includes("SMILEY_ASC")) {
      orderInt = 1;
    } else if (orderby.includes("SMILEY_DESC")) {
      orderInt = -1;
    }
  }

  Company.find({ name: { $exists: true } })
    .sort({ name: orderInt })
    .limit(5)
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route     PUT companies/:id
// @desc      Give rating and increment numberOfRatings automatically
// @access    Public
router.route("/:id/:stars").put((req, res) => {
  let stars = parseInt(req.params.stars);

  Company.findByIdAndUpdate(
    req.params.id,
    { $inc: { numberOfRatings: 1, sumStars: stars } },
    { new: true }
    // { new: true } makes sure to return an obejct so it can be passed as a response
  )
    .then(company => res.json(company))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route     GET companies/cities
// @desc      Get all cities
// @access    Public
router.route("/cities").get((req, res) => {
  Company.aggregate([{ $group: { _id: null, cities: { $addToSet: "$city" } } }])
    .then(company => res.json(company))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route     GET companies/name
// @desc      Get all companies with same name or name that includes a substring
// @access    Public
router.route("/name").get((req, res) => {
  let name = req.body.name;

  Company.find({ name: new RegExp(name, "i") })
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route     GET companies/smilies
// @desc      Get companies with given smiley grade(s) given at last review
// @access    Public
router.route("/smileys").get((req, res) => {
  let smileysArr = req.body.smileys;

  Company.find({ "smileys.0.grade": { $in: smileysArr } })
    .then(company => res.json(company))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
