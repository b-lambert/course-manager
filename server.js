var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

var listener = app.listen(8080, function() {
  console.log('Server listening on port ' + listener.address().port);
});

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/courses', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(__dirname + '/courses.json');
});
