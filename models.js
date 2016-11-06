var mongoose = require('mongoose');
var database = require('./confidential.js');
mongoose.connect(database);
//var conn = mongoose.createConnection('mongodb://localhost/clipboard')

//mongodb://localhost/clipboard

var schema = mongoose.Schema({
  url: {
    type: String,
    required : true
  },
  content:{
    type: String
  }
})

module.exports = mongoose.model('Schema',schema);
