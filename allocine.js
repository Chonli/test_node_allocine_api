var http = require("http");
var express = require('express');
var allocine = require('allocine-api');
var json2html = require('node-json2html');
var srvHttp = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// Running Server Details.
srvHttp.listen(4040, function () {

});


srvHttp.get('/', function (req, res) {
  var html = '';
  html += "<body>";
  html += "<form action='/result'  method='post' name='formSearch'>";
  html += "Film:</p><input type= 'text' name='searchInput'></p>";
  html += "<input type='submit' value='submit'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

srvHttp.post('/result', urlencodedParser, function (req, res) {
  var replyHtml = '';
  allocine.api('search', { q: req.body.searchInput, filter: 'movie' }, function (error, results) {
    if (error) {
      replyHtml += 'Error : ' + error;
      res.send(replyHtml);
      return;
    }

    replyHtml += '<div>Film trouvé pour ' + req.body.searchInput + ' : </div>';

    if (results.feed.totalResults == '0') {
      replyHtml += "<p> Film non trouvé </p>"
    } else {
      var transform = {
        '<>': 'div', 'class': 'movie','style': 'border:1px solid black;', 'html': [
          { '<>': 'h3', 'html': '${originalTitle}' },
          { '<>': 'div', 'html': 'producteur : ${directors}' },
          { '<>': 'div', 'html': 'année : ${productionYear}' }
        ]
      };

      replyHtml += json2html.transform(results.feed.movie, transform);
    }
    res.send(replyHtml);
  });

});


// {
//     "feed": {
//         "page": 1,
//         "count": 10,
//         "results": [
//             {
//                 "type": "movie",
//                 "$": 27
//             }
//         ],
//         "totalResults": 27,
//         "movie": [
//             {
//                 "code": 198849,
//                 "originalTitle": "Hello, Hello, Hello",
//                 "productionYear": 1995,
//                 "castingShort": {
//                     "directors": "David Thewlis",
//                     "actors": "Kathy Burke, Robert Pugh"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=198849.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 190763,
//                 "originalTitle": "Hello Ghost",
//                 "productionYear": 2019,
//                 "castingShort": {
//                     "directors": "Chris Columbus",
//                     "actors": "Adam Sandler"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=190763.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 239155,
//                 "originalTitle": "Hello Kitty",
//                 "productionYear": 2019,
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=239155.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 257028,
//                 "originalTitle": "Hello Again",
//                 "productionYear": 2017,
//                 "castingShort": {
//                     "directors": "Tom Gustafson",
//                     "actors": "Sam Underwood, Nolan Gerard Funk, Jenna Ushkowitz, Rumer Willis, T.R. Knight"
//                 },
//                 "poster": {
//                     "path": "/pictures/17/09/30/02/38/1739923.jpg",
//                     "href": "http://images.allocine.fr/pictures/17/09/30/02/38/1739923.jpg"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=257028.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 133029,
//                 "originalTitle": "Hello Goodbye",
//                 "productionYear": 2008,
//                 "release": {
//                     "releaseDate": "2008-11-26"
//                 },
//                 "castingShort": {
//                     "directors": "Graham Guit",
//                     "actors": "Fanny Ardant, Gérard Depardieu, Jean Benguigui, Manu Payet, Gilles Gaston-Dreyfus"
//                 },
//                 "statistics": {
//                     "pressRating": 1.5,
//                     "userRating": 1.98375
//                 },
//                 "poster": {
//                     "path": "/medias/nmedia/18/67/64/91/18991504.jpg",
//                     "href": "http://images.allocine.fr/medias/nmedia/18/67/64/91/18991504.jpg"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=133029.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 169709,
//                 "originalTitle": "Hello Mary Lou : Prom Night II",
//                 "title": "Le Bal de L'Horreur 2 : HelloMary Lou",
//                 "productionYear": 1987,
//                 "castingShort": {
//                     "directors": "Bruce Pittman",
//                     "actors": "Richard Monette, Michael Ironside, Brock Simpson, Beverley Hendry, Louis Ferreira"
//                 },
//                 "statistics": {
//                     "userRating": 3.26923
//                 },
//                 "poster": {
//                     "path": "/medias/nmedia/18/71/46/59/19135423.jpg",
//                     "href": "http://images.allocine.fr/medias/nmedia/18/71/46/59/19135423.jpg"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=169709.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 249519,
//                 "originalTitle": "Hello Destroyer",
//                 "productionYear": 2016,
//                 "castingShort": {
//                     "actors": "Sara Canning, Ian Tracey, Paul McGillion, Ben Cotton, Michael Kopsa"
//                 },
//                 "poster": {
//                     "path": "/pictures/16/09/16/10/16/333106.jpg",
//                     "href": "http://images.allocine.fr/pictures/16/09/16/10/16/333106.jpg"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=249519.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 236505,
//                 "originalTitle": "Hello, My Name Is Doris",
//                 "productionYear": 2015,
//                 "castingShort": {
//                     "directors": "Michael Showalter",
//                     "actors": "Sally Field, Max Greenfield, Wendi McLendon-Covey, Beth Behrs, Stephen Root"
//                 },
//                 "statistics": {
//                     "userRating": 2.9259
//                 },
//                 "poster": {
//                     "path": "/pictures/16/04/29/16/53/232505.jpg",
//                     "href": "http://images.allocine.fr/pictures/16/04/29/16/53/232505.jpg"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=236505.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 218222,
//                 "originalTitle": "Hello, I am David - Eine Reise mit David Helfgott",
//                 "productionYear": 2015,
//                 "castingShort": {
//                     "directors": "Cosima Lange"
//                 },
//                 "statistics": {
//                     "userRating": 3.03226
//                 },
//                 "poster": {
//                     "path": "/pictures/15/10/28/16/52/446172.jpg",
//                     "href": "http://images.allocine.fr/pictures/15/10/28/16/52/446172.jpg"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=218222.html"
//                     }
//                 ]
//             },
//             {
//                 "code": 233185,
//                 "originalTitle": "Hello Carter",
//                 "productionYear": 2013,
//                 "castingShort": {
//                     "directors": "Anthony Wilcox",
//                     "actors": "Annabelle Wallis, Antonia Thomas, Charlie Cox, Jodie Whittaker, Christian Cooke"
//                 },
//                 "poster": {
//                     "path": "/pictures/16/12/01/18/14/201682.jpg",
//                     "href": "http://images.allocine.fr/pictures/16/12/01/18/14/201682.jpg"
//                 },
//                 "link": [
//                     {
//                         "rel": "aco:web",
//                         "href": "http://www.allocine.fr/film/fichefilm_gen_cfilm=233185.html"
//                     }
//                 ]
//             }
//         ]
//     }
// }