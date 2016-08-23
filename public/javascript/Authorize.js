var APP_ID = '5b657a91-6860-49ad-9fa1-b6ba89a26e16';
var APP_SECRET= 'c5a2288d-5454-4bb5-9f6c-4106c5c22391';

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

        userData[data.userId] = data.userToken;
    },
    getUserToken: function(userId){
        return userData[userId];
    }
};
module.exports = Authorize;