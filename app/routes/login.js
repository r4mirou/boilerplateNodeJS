module.exports = function(app){   
    
    var controller = app.controllers.login;

    app.post('/login',controller.login);
}