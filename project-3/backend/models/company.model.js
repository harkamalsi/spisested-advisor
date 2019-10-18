const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  zipcode: {
    type: Number
  },
  city: {
    type: String
  },
  coordinates: {
    type: Array
  },
  smileys: {
    type: Array
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
