var fetch = require('node-fetch');
var mongoose = require('mongoose');
var IMDBid = require('./models/IMDBid');
var IMDBxml = require('./models/IMDBxml');

var mongodbUri = 'mongodb://eagleweb:751803orel@ds159377.mlab.com:59377/imdb';
mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {});

var reg_exp = /tt\d\d\d\d\d\d\d/g;

function readTT(url, cb) {
    fetch(url)
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
}
function go() {
    var i = 0;
    IMDBxml.find(function (err, imdbxml) {
        if (err) return console.error(err);
        var timerid = setInterval(function () {
            readTT(imdbxml[i].url, unique);
            i++;
            if (i===imdbxml.length) clearInterval(timerid);
        }, 6000);
    });
}

go();