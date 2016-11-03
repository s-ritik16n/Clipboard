var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://localhost/clipboard')

var schema = mongoose.Schema({
  url: {
    type: String,
    required : true
  },
  content:{
    type: String
  }
})

module.exports = conn.model('Schema',schema);
