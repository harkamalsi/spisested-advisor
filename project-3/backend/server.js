const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//var bodyParser = require('body-parser');

// Environment variables
require('dotenv').config();

// Following for creating the express server
const app = express();
const port = 5000;

// Middleware (cors)
app.use(cors());
// Allows to parse json
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connected...');
});

const companiesRouter = require('./routes/companies');
app.use('/companies', companiesRouter);

// Starts the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
