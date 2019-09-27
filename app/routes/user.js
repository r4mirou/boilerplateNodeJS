var auth = require('../../config/auth').auth;

module.exports = function(app){   
    
    var controller = app.controllers.user;

    app.get('/user', auth.authenticate, controller.index);    
    app.post('/user', auth.authenticate, controller.newUser);
    app.delete('/remove/:id', auth.authenticate, controller.remove);
}