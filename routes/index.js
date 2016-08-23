var express = require('express');
var Authorize = require('../public/javascript/Authorize');
var router = express.Router();
var controller = require('../public/javascript/MainController');

/* GET home page. */
router.post('/', function (req, res, next) {
    var eventName = req.body.name;
    //if (!Authorize.authorize(req.header('x-flock-validation-token'))) return null;

    console.log(eventName);
    switch (eventName) {
        case 'client.slashCommand':
            console.log('handling slash command', req.body);
            controller.handleSlashCommand(req.body);
            break;
        case 'app.install':
            console.log('IN app .install');
            controller.handleAppInstall(req.body);
            console.log('After app.install');
            break;

        case 'app.uninstall':
            controller.handleAppUnInstall(req.body);
            break;

        default:
            break;

    }
    res.send('respond with a resource');
});


module.exports = router;
