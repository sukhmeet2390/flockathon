var jwt = require('json-web-token');
var SECRET ;
var userData = {};
function decode(token) {
    jwt.decode(SECRET, token, function (err, decode) {
        if (err) {
            console.error(err.name, err.message);
            return false;
        } else {
            console.log('decoded to : ' , decode);
            return decode;
        }
    });
}

//{
//    name: "app.install",
//        userId: "u:cfc76545-3400-4864-892a-513a9f4ae409",
//    userToken: "4458f0a9-eca7-4efb-8560-2a0fd3ac858d"
//}
var Authorize = {
    authorize: function (token) {
        var payload = decode(token);
        if(!decode){
            return false;
        }else{
            var data = decode(token);
            userData[data.userId] = data.userToken;
        }
    },
    setSecretKey: function(secret){
        SECRET = secret;
        return true
    }
};
module.exports = Authorize;