var unirest = require('unirest');
var Deferred = require('deferred');

var Client = {
    doGet: function (token , url) {
        var def = Deferred();
        console.log('--- Making GET call for URL ---' + url);
        unirest.get(url)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json','X-Flock-Validation-Token': token})
            .end(function (response) {
                console.log('received response for GET URL ---' + url);
                console.log(response.body);
                def.resolve(response.body);
            });
        return def.promise;
    },
    doPost: function (token, url, bodyObject) {
        var def = Deferred();
        console.log('--- Making POST call for URL ---' + url);
        unirest.post(url)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .send(bodyObject)
            .end(function (response) {
                console.log('received response for POST URL ---' + url);
                console.log(response.body);
                def.resolve(response.body);
            });
        return def.promise;
    }
};
module.exports = Client;