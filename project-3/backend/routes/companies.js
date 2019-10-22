const express = require("express");
const router = express.Router();

const Company = require("../models/company.model");

// @route     GET companies
// @desc      Get all companies with possible sorts and filters on zipcode and city
// @access    Public
router.route("/").get((req, res) => {
  let orderNameInt;
  let orderSmileyInt;
  let apiquery = req.query;

  let name = apiquery.name;
  let orderby = apiquery.orderby;
  let cities = apiquery.cities;
  let smileys = apiquery.smileys;

  // 1 = ASC, -1 = DESC
  switch (orderby) {
    case "NAME_AZ":
      orderNameInt = 1;
      break;
    case "NAME_ZA":
      orderNameInt = -1;
      break;
    case "SMILEY_ASC":
      // [3, 2, 1, 0] = "Sur, nøytral, smil, smil"
      // Because of how mongoDb works, we must provide with -1
      orderSmileyInt = -1;
      break;
    case "SMILEY_DESC":
      // [0, 1, 2, 3] = "Smil, smil, nøytral, Sur"
      // Because of how mongoDb works, we must provide with 1
      orderSmileyInt = 1;
      break;
    default:
      // Default case is NAME_AZ
      orderNameInt = 1;
  }

  let mongoQuery;

  if (name && !cities && !smileys) {
    mongoQuery = {
      name: new RegExp(name, "i")
    };
  } else if (!cities && !smileys) {
    mongoQuery = {
      name: new RegExp(name, "i")
    };
  } else if (!cities) {
    mongoQuery = {
      name: new RegExp(name, "i"),
      "smileys.0.grade": { $in: smileys.split("-").map(Number) }
    };
  } else if (!smileys) {
    mongoQuery = {
      name: new RegExp(name, "i"),
      city: { $in: cities.split("-") }
    };
  } else {
    //(name || cities || smileys)
    mongoQuery = {
      name: new RegExp(name, "i"),
      city: { $in: cities.split("-") },
      "smileys.0.grade": { $in: smileys.split("-").map(Number) }
    };
  }

  console.log(mongoQuery);

  let mongoSortQuery;

  if (orderSmileyInt) {
    // 1 = ASC, -1 = DESC
    mongoSortQuery = { "smileys.0.grade": orderSmileyInt };
  } else {
    // 1 = ASC, -1 = DESC
    mongoSortQuery = { name: orderNameInt };
  }

  console.log(mongoSortQuery);

  Company.find(mongoQuery)
    .sort(mongoSortQuery)
    .limit(10)
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
