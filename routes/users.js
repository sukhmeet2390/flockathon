var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req);
    res.send('respond with a resource');
    // KEEP IT FOR APP INSTALL 200 OK


    //res.render('index', {title: 'Express'});
});
router.get('/test', function (req, res, next) {

    res.send('respond with a resource');
    // KEEP IT FOR APP INSTALL 200 OK


    //res.render('index', {title: 'Express'});
});


module.exports = router;
