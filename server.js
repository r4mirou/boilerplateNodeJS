var app = require('./config/express')();

//LOCAL
require('./config/database')('mongodb://localhost:27017/proj');
//MONGOATLAS
//require('./config/database')('mongodb+srv://myuser:mypass@cluster0-xtv11.mongodb.net/test?retryWrites=true');

app.listen(app.get('port'), function(){
     console.log(`Express on port ${app.get('port')}`); 
}); 