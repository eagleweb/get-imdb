var mongoose = require('mongoose');
var mongodbUri = 'mongodb://eagleweb:751803orel@ds159377.mlab.com:59377/imdb';

mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {});