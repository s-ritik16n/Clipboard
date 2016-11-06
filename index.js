  var express = require('express');
  var db = require('./models.js');
  var bodyParser = require('body-parser');
  var app = express();

  app.use(express.static(__dirname+"/public"))
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(bodyParser.json())

  app.set('port',(process.env.PORT||5000));

  app.get('/',function(req,res){
    res.sendFile(__dirname+'public/index.html')
  })

app.route('/:url')
.get(function(req,res){
  res.setHeader('Content-Type','application/json');
  db.find({url:req.params.url},function(err,data){
    if(data.length == 0){
      res.json({
        exists:false
      })
    }
    else {
      // TO-DO: delete from database
      res.json({
        exists:true,
        data:data[0].content
      })
    }
  })
})

app.listen(app.get('port'),function(){
  console.log("Magic happens at port "+app.get('port'));
});
