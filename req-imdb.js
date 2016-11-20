var fetch = require('node-fetch');

fetch('http://app.imdb.com/title/maindetails?tconst=tt3748528')
    .then(function(response) {
        return response.json()
    }).then(function(json) {
    console.log(json)
}).catch(function(ex) {
    console.log(ex)
});