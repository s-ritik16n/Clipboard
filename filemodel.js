const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)

var schema = mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  file:{
    type: Buffer,
    required:true
  }
})

module.exports = mongoose.model("fileSchema",schema);
