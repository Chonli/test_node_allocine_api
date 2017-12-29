var http = require("http");
var express = require('express');
var allocine = require('allocine-api');
var srvHttp = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// Running Server Details.
srvHttp.listen(4040, function () {

});


srvHttp.get('/', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/result'  method='post' name='formSearch'>";
  html += "Film:</p><input type= 'text' name='searchInput'>";
  html += "<input type='submit' value='submit'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

srvHttp.post('/result', urlencodedParser, function (req, res){
  var reply='';
  reply += "La recherche est " + req.body.searchInput;
  allocine.api('search', {q: req.body.searchInput, filter: 'movie'}, function(error, results) {
    if(error) {
        reply += 'Error : '+ error;
        console.log('Error : '+ error);
        return;
    }

    reply +='Voici les données retournées par l\'API Allociné:';
    reply += '<pre>' + JSON.stringify(results) + '</pre>';
    console.log('Voici les données retournées par l\'API Allociné:');
    console.log(JSON.stringify(results));
    res.send(reply);
  });

 });
