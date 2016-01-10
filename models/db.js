var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node');

mongoose.connection.on('connected', function () {
  console.log("hello!");
});