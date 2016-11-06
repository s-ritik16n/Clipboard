var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://heroku_ggg8csx9:nqmddapnap0mpj0u4oj2lsq8hj@ds057806.mlab.com:57806/heroku_ggg8csx9')

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
