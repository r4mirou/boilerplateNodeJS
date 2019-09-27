module.exports = function(app){
    var User = app.models.user;

    var controller = {
        index: function(req,res){
            User.find({},[],{sort: {user:1} }).exec().then((users) => {
                res.send(users);
            })
            
        },
        newUser:function(req,res){
            var user = new User(req.body);
            user.save(function(err,user){
                console.log(err);

                if(err)
                    res.status(500).end();
                else
                    res.json(user);
            });
        },
        remove: function(req,res){
             User.deleteOne({_id: req.params.id}, function(err){
                if(!err)
                    res.json({message: 'sucess'});
                else
                    res.status(500).end();
             })
        }        
    }

    return controller;
}