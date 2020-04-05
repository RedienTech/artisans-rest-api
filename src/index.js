const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
const path = require('path');
const cors = require('cors');



require('./database');
require('colors');

const app = express();

//Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors({origin: 'http://localhost:4200'}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'artisansisawesome',
    resave: true,
    saveUninitialized: true
}));
app.use(cookie());

//Global Variables

//Routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api', require('./routes/index.routes'));
app.use('/likes', require('./routes/likes.routes'));

//Start Server
app.listen(app.get('port'), () => {
    console.log('Server on port'.green, app.get('port'))
})