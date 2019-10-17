const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  orgnummer: {
    type: Number
  },
  navn: {
    type: String
  },
  adrlinje: {
    type: String
  },
  postnr: {
    type: Number
  },
  poststed: {
    type: String
  },
  smileys: {
    type: String
  },
  numberOfRatings: {
    type: Number
  },
  sumStars: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Company', companySchema, 'mattilsyn');
