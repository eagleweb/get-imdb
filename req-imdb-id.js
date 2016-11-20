var fetch = require('node-fetch');
var mongoose = require('mongoose');
var IMDBid = require('./models/IMDBid');
var mongodbUri = 'mongodb://eagleweb:751803orel@ds159377.mlab.com:59377/imdb';

var reg_exp = /tt\d\d\d\d\d\d\d/g;

function readTT(cb) {
    fetch('http://www.imdb.com/sitemap_US_01547.xml.gz')
        .then(function (res) {
            return res.text();
        }).then(function (body) {
        cb(body.match(reg_exp), writeDB);
    });
}

function unique(arr, cb) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
    }

    cb(Object.keys(obj));
}

function writeDB(arr){
    mongoose.connect(mongodbUri);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function callback () {

        arr.forEach(function(item, i , arr){
            var temp = new IMDBid ({
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

readTT(unique);