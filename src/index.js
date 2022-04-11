const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); 
const methodOverride = require('method-override');
const session = require('express-session');
const _handlebars = require('handlebars'); 
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');  

//initialization
const app = express(); 
require('./database');


//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));


var hbs = exphbs.create({defaultLayout: 'main', 
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        handlebars: allowInsecurePrototypeAccess(_handlebars),
        extname: '.hbs' });
app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs');


//app.engine('.hbs', exphbs({
//     defaultLayout: 'main',
//     layoutsDir: path.join(app.get('views'), 'layouts'),
//     partialsDir: path.join(app.get('views'), 'partials'),
//     extname: '.hbs'
// })); 


//mifflewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

//global variables


//routes
app.use(require('./routes/index')); 
app.use(require('./routes/notes')); 
app.use(require('./routes/users')); 

//Static Files
app.use(express.static(path.join(__dirname, 'public'))); 


//Server is lestenning
app.listen(app.get('port'), ()=>{
    console.log('listening on port',app.get('port'));
}); 