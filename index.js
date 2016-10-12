var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(8080, function() {

});

app.get('/', function(req,res) {
  res.sendfile('index.html');
});

app.get('/courses', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.sendfile('courses.json');
});
