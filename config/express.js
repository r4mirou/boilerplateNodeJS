var express = require('express'); 
var bodyParser = require('body-parser');
var load = require('express-load');

var auth = require('./auth').auth;

//PRODUCTION
//const PORT = process.env.PORT;
//LOCAL
const PORT = 3001;

module.exports = function(){
    var app = express();

    app.set('port', PORT);
    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extend: true}));
    app.use(express.static('./app/views'));  
    app.use(auth.initialize()); 

    load('models',{cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}