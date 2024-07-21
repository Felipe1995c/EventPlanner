// Import packages
const path = require('path');
const express = require('express');
const session = require('express-session');

// Connect to routes
const routes = require('./controllers');

// Bring in the Handlebars Library
const exhbs = require('express-handlebars');
const sequelize = require('./config/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//invoke express and define PORT variable
const app = express();
const PORT = process.env.PORT || 3001;

// We create a HANDLEBARS instance --> plugs into Express
const hbs = exhbs.create();

//create session configuration (secret in env)
const sess = { 
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// WE need to Add the HANDLEBARS engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// sets middleware for express to serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(routes);

//start up the server and sync database
sequelize.sync({ force: false }).then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});