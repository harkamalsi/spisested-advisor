const express = require('express');
const router = express.Router();

const Company = require('../models/company.model');

// @route     GET companies
// @desc      Get all companies with possible sorts on postnr and poststed
// @access    Public
router.route('/').get((req, res) => {
  let postnr = req.body.postnr;
  let poststed = req.body.poststed;
  let navn = req.body.navn;
  let orderby = req.body.orderby;
  let cities = req.body.cities;
  let smileys = req.body.smileys;

  let query = {};
  if (postnr || poststed || navn || orderby || cities || smileys) {
    query = {
      $or: [{ poststed }, { postnr }]
    };
  }

  Company.find(query)
    .limit(5)
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     PUT companies/:id
// @desc      Give rating and increment numberOfRatings automatically
// @access    Public
router.route('/:id').put((req, res) => {
  const sumStars = req.body.sumStars;

  Company.findByIdAndUpdate(
    req.params.id,
    { $inc: { numberOfRatings: 1, sumStars } },
    { new: true }
    // { new: true } makes sure to return an obejct so it can be passed as a response
  )
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/cities
// @desc      Get all cities
// @access    Public
router.route('/cities').get((req, res) => {
  Company.aggregate([{ $project: { _id: 0, city: 1 } }])
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/postnr/:postnr
// @desc      Get all companies with same postnummer
// @access    Public
router.route('/postnr/:postnr').get((req, res) => {
  Company.find({ postnr: req.params.postnr })
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/name
// @desc      Get all companies with same name or name that includes
// @access    Public
router.route('/navn').get((req, res) => {
  console.log(req.body.navn);
  Company.find({ navn: req.body.navn })
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/smilies
// @desc      Get smilies of companies
// @access    Public
router.route('/smileys').get((req, res) => {
  /* let query = {
    {$arrayElemAt: [smileys, 0]}, { $elemMatch: { grade: req.body.grade } }]
  }; */

  let query2 = {
    'smileys.0': { $elemMatch: { grade: req.body.grade } }
  };

  let query3 = { first: { $arrayElemAt: ['$smileys', 0] } };

  let query = {};

  console.log(query2);

  Company.find({}, { smileys: { $slice: req.body.slice } })
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
