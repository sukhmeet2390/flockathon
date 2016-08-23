var express = require('express');
var router = express.Router();
var controller = require('../public/javascript/MainController');

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log('Received an event ', req.body);
    var eventName = req.body.name;
    switch (eventName){
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
  res.render('index', { title: 'Express' });
});

router.get('/help', function(req, res){
   controller.handleHelp().then(function(data){
       res.send(data);
   });
});

module.exports = router;
