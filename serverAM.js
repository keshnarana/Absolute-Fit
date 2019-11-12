const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/AbsoluteFit',
  { useNewUrlParser: true }
);
const Users = require('./routes/Users')
app.use('/users',Users)
app.use(morgan('dev'));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
