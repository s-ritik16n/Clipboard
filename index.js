var express = require('express');
var db = require('./models.js');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
  res.sendFile('index.html')
})

app.route('/:url')
.get(function(req,res){
  db.find({url:req.params.url},function(err,data){
    if(data.length == 0){
      res.send({
        exists:false
      })
    }
    else {
      // TO-DO: delete from database
      res.send({
        exists:true,
        data:data[0].content
      })
    }
  })
})

app.listen('3000');
console.log("Magic happens at port 3000");
