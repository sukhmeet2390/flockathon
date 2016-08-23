var express = require('express');
var Authorize = require('../public/javascript/Authorize');
var router = express.Router();
var controller = require('../public/javascript/MainController');

/* GET home page. */
router.post('/', function (req, res, next) {
    var eventName = req.body.name;
    console.log('req.body', req);
    //if (!Authorize.authorize(req.header('x-flock-validation-token'))) return null;

    switch (eventName) {
        case 'client.slashCommand':
            controller.handleSlashCommand(req.body);
            break;
        case 'app.install':
            controller.handleAppInstall(req.body);
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
