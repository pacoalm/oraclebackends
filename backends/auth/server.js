
var express = require ('express');
var morgan = require('morgan');
var bodyparser = require('body-parser');

var auth = require('./routes/auth.js')
var publicThings = require('./routes/publicThings.js')
var privateThings = require('./routes/protectedThings.js')
var users = require('./routes/users.js')
var login = require('./routes/login.js')
var config = require('./config.js');


var app;
var router;

var port = config.port;


//checkConnection();


app=express();

app.use(morgan('combined')); //logger
app.use(bodyparser.json());

router = express.Router();



router.get('/public_things', publicThings.get) ;
router.get('/protected_things',auth(), privateThings.get);
router.get('/protected_things2',auth('ADMIN'), privateThings.get);
router.post('/users',users.post);
router.post('/login',login.post);

app.use('/api', router);








app.listen(port, function(){
    console.log('Web Server listening on port ' + port)
});

