var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
 
var upload = multer({ storage: storage })
var uploadFile = upload.single('file');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});


app.post('/filesize', function (req, res, next) {
    uploadFile(req, res, function(err) {
        if (err) throw err;
        var result = {fileSize: req.file.size};
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        fs.unlinkSync("./uploads/" + req.file.filename);
    })
})


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("App now running on port", port);
});