var login = require('../../config/auth').login;

module.exports = function(app){
    var controller = {
        login: function(req, res){
            var user = req.body.user,
                password = req.body.password;

            login(user,password, function(result){
                if(result)
                    res.json(result);
                else
                    res.status('401').json({message:'Erro de autenticação'});
            });
        }
    }
    return controller;
}