var mongoose = require('mongoose');
var IMDBidSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    }
});
var IMDBid = module.exports = mongoose.model('IMDBid', IMDBidSchema);