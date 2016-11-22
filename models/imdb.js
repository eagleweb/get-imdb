var mongoose = require('mongoose');
var IMDBSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});
var IMDB = module.exports = mongoose.model('IMDB', IMDBSchema);
