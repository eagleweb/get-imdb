var mongoose = require('mongoose');
var IMDBxmlSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    }
});
var IMDBxml = module.exports = mongoose.model('IMDBxml', IMDBxmlSchema);