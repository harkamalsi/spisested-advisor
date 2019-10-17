const express = require('express');
const router = express.Router();

const Company = require('../models/company.model');

// @route     GET companies
// @desc      Get all companies with possible sorts on postnr and poststed
// @access    Public
router.route('/').get((req, res) => {
  let postnr = req.body.postnr;
  let poststed = req.body.poststed;

  Company.find({
    $or: [{ poststed }, { postnr }]
  })
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

// @route     GET companies/postnr/:postnr
// @desc      Get all companies with same postnummer
// @access    Public
router.route('/postnr/:postnr').get((req, res) => {
  Company.find({ postnr: req.params.postnr })
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
