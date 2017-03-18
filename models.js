var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
//var conn = mongoose.connect('mongodb://localhost/clipboard')

//mongodb://localhost/clipboard

var schema = mongoose.Schema({
  url: {
    type: String,
    required : true
  },
  content:{
    type: String
  },
  fileType:Boolean,
  file:String
})

module.exports = mongoose.model('Schema',schema);
