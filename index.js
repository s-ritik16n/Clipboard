var express = require('express');
var db = require('./models.js');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');
const multiparty = require('connect-multiparty')();
const Gridfs = require('gridfs-stream');
const mongoose = require('mongoose');

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

app.route('/getURL/:url')
.get(function(req,res){
  res.setHeader('Content-Type','application/json');
  db.find({url:req.params.url},function(err,data){
    console.log(data);
    if(data.length == 0){
      res.json({
        exist:false
      })
    }
    else {
      if(data[0].fileType === true){
        console.log("inside true type");
        res.json({
          exist: true,
          file:true
        })
      } else if (data[0].fileType === false) {
        db.remove({url:req.params.url},function(err,result) {
          console.log(result);
        })
        res.json({
          exist: true,
          file:false,
          data: data[0].content
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

app.post('/postFile/:url', multiparty, function(req,res){
  var dbs = mongoose.connection.db;
  var mongoDriver = mongoose.mongo;
  var gfs = new Gridfs(dbs,mongoDriver);
  var writeStream = gfs.createWriteStream({
    filename:req.files.file.name,
    mode:'w',
    content_type: req.files.file.mimetype,
    metadata: req.body
  })
  fs.createReadStream(req.files.file.path).pipe(writeStream);

  writeStream.on('close',function(file){
    var clip = new db();
    clip.url = req.params.url;
    clip.content = null;
    clip.fileType = true;
    clip.file = file._id;
    clip.save(function(err,res){
      if(err) return;
      console.log("done");
    })
    res.json({
      done:true
    })
    fs.unlink(req.files.file.path,function(err){
      if(err) return;
      console.log("success!");
    })
  })

})

app.get('/getFile/:url',function(req,res){
  var dbs = mongoose.connection.db;
  var mongoDriver = mongoose.mongo;
  var gfs = new Gridfs(dbs,mongoDriver);
  db.find({url:req.params.url},function(err,data){
    console.log(data);
    try {
      var readstream = gfs.createReadStream({
        _id: data[0].file
      });
    } catch (e) {
      
    }
    res.set({
      'Content-Disposition':'attachment;filename=some.pdf'
    })
    readstream.pipe(res);
    db.remove({url:req.params.url},function(err,result){
      gfs.remove({_id: data[0].file})
    })
  })
})

app.listen(app.get('port'),function(){
  console.log("Magic happens at port "+app.get('port'));
});
