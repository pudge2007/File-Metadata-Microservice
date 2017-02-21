var express = require('express');
var app = express();
var http = require('http');


var server = http.createServer(app).listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});