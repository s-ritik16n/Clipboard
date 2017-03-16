var express = require('express');
var db = require('./models.js');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');
const multipart = require('connect-multiparty');
var middleWare = multipart()

app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set('port',(process.env.PORT||5000));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})

app.route('/:url').
get(function(req,res){
  res.sendFile(__dirname+'/public/index.html');
})

app.route('/find/:url')
.get(function(req,res){
  res.setHeader('Content-Type','application/json');
  console.log("inside index");
  db.find({url:req.params.url},function(err,data){
    console.log("inside find");
    if(data[0].file.data == 0 && data.length == 0){
      res.json({
        exist:false
      })
    }
    else {
      console.log("content is: "+data[0].content);
      db.remove({url:req.params.url},function(err,result) {
        console.log(result);
      })
      if(data[0].fileType === false){
        res.json({
          exist:true,
          file:false,
          data:data[0].content
        })
      } else if (data[0].fileType === true) {
        //res.contentType(data[0].file.contentType)
        res.json({
          exist:true,
          file:true,
          data:data[0].file.data
        })
      }
    }
  })
}).
post(function(req,res){
  var clip = new db();
  clip.url = req.params.url;
  clip.content = req.body.content;
  clip.fileType = false;
  clip.save(function(err,res){
    console.log(res);
  });
  res.json({
    done:true
  })
})

app.post('/findfile/:url',function(req,res){
  var clip = new db();
  console.log(req.body);
  clip.url = req.params.url;
  clip.file.data = req.body.data;
  clip.file.contentType = req.body.name.split('.')[1];
  clip.fileType = true;
    res.json({
      done:true
    })
})

app.listen(app.get('port'),function(){
  console.log("Magic happens at port "+app.get('port'));
});
