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
    title: 'Введіть слово'
  });
});

app.post('/', function(req, res){
  if (!req.body.text || req.body.text == "") {
    res.render('template', {
      title: "Введіть слово"
    });
  } else {
    var url = urlUtils.format({
      protocol: 'https',
      hostname: 'translate.yandex.net',
      pathname: 'api/v1.5/tr.json/translate',
      query: {
        key: 'trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4',
        lang: req.body.lang,
        text: req.body.text
      }
    });
    requestUtils.get({
        url: url,
        json: true
      }, function (error, response, json) {
        var data = {};

        if (error || json.code != 200) {
          data = {
            title: "Ошибка при переводе слова " + req.body.text,
            error: json.message
          }
        } else {
          data = {
            title: 'Перевод слова ' + req.body.text + ": " + json.text
          }
        }
        res.render('template', data);
      }
    );
  }
});

app.listen(8080, function(err) {
  if (err) {
    console.err(err);
  } else {
    console.log('server started');
  }
});
