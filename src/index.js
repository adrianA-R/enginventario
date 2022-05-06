// INDEX.JS = Archivo principal de la app
/**********************************************************************/
// DECLARACION DE MÓDULOS
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const { database } = require('./keys');

// INICIALIZACION DE MÓDULOS
const app = express();
require('./lib/passport');

// Configuraciones
app.set('port', process.env.PORT || 1000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main', 
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'deycoestuvoaqui',
  resave: false,
  saveUninitialized: false,
  store: new MySqlStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//app.use(oneOf());
//app.use(validationResult());


// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});