var passport = require('passport');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');
var mongoose = require('mongoose');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtEstrategy = passportJWT.Strategy;

var jwtOptions = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'minhachavesecreta'
}

module.exports = {
    get auth(){
        var User = mongoose.models.User;
        var strategy = new JwtEstrategy(jwtOptions, function(jwt_payload, next) {
            User.findById(jwt_payload._id).exec().then(user => {
                if(user)
                    next(null,user);
                else
                next(null,false);
            });
        });

        passport.use(strategy);
        return {
            initialize: function(){
                return passport.initialize();
            },
            get authenticate(){
                return passport.authenticate('jwt', {session: false});
            }
        }
    },
    login: function(user, password, callback){
        var User = mongoose.models.User;

        User.findOne({user,password}).exec()
        .then(user => {
            if(user){
                var payload = {_id: user._id}; 
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                callback({'message': 'ok', token});                
            }
            else{
                callback(false);
            }
        });
    }
}