var fetch = require('node-fetch');
var mongoose = require('mongoose');
var IMDBxml = require('./models/IMDBxml');
var mongodbUri = 'mongodb://eagleweb:751803orel@ds159377.mlab.com:59377/imdb';

var reg_exp = /http:.+?.gz/g;

function readxml(cb) {
    fetch('http://www.imdb.com/sitemap_US_index.xml.gz')
        .then(function (res) {
            return res.text();
        }).then(function (body) {
        cb(body.match(reg_exp));
    })
}

function writeDB(arr){
    mongoose.connect(mongodbUri);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function callback () {

        arr.forEach(function(item, i , arr){
            var temp = new IMDBxml ({
                id: item
            });
            temp.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
}

readxml(writeDB);