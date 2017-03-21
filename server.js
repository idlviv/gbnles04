var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

var templating = require('consolidate');
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views'); // + '/views'

var requestUtils = require('request');
var urlUtils = require('url');

app.get('/', function(req, res) {
  res.render('template', {
    title: 'Введіть слово',
  });

});

app.listen(8080, function(err) {
  if (err) {
    console.err(err);
  } else {
    console.log('server started');
  }
});
