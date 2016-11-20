var mongoose = require('mongoose');
var IMDBxmlSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    }
});
var IMDBxml = module.exports = mongoose.model('IMDBxml', IMDBxmlSchema);