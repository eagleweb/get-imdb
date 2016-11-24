var mongoose = require('mongoose');
var IMDBxml = require('./models/IMDBxml');
var mongodbUri = 'mongodb://eagleweb:751803orel@ds159377.mlab.com:59377/imdb';
mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {});




// function go() {
//     var i = 0;
//     IMDBxml.find(function (err, imdbxml) {
//         if (err) return console.error(err);
//         var timerid = setInterval(function () {
//             console.log(imdbxml[i].url);
//             i++;
//             if (i===imdbxml.length) clearInterval(timerid);
//         }, 6000);
//     });
// }
//
// go();



