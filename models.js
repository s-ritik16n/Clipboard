var mongoose = require('mongoose');
mongoose.connect(MONGODB_URI);
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
