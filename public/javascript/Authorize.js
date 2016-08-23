var APP_ID = '5b657a91-6860-49ad-9fa1-b6ba89a26e16';
var APP_SECRET= '61842a2c-a843-46ec-be85-f66d1a62d358';

var jwt = require('json-web-token');
var userData = {};
function decode(token) {
    jwt.decode(APP_SECRET, token, function (err, decode) {
        if (err) {
            console.error(err.name, err.message);
            return false;
        } else {
            console.log('decoded to : ' , decode);
            if(decode.appId !== APP_ID) return false;
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
        APP_SECRET = secret;
        return true
    },
    saveUserInfo: function(data){
        // { userToken: 'a2678e86-3408-4417-846f-7d0f0f811c39',
        //name: 'app.install',
          //  userId: 'u:4864gx8v4v8wg4hh' },
        console.log('Saving user info---', data);
        userData[data.userId] = data.userToken;
    },
    getUserToken: function(userId){
        return 'b7a6a7a8-62c5-4a15-b812-6a92fb3dd0f3';
        return userData[userId];
    }
};
module.exports = Authorize;