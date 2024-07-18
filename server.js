const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
// Bring in the Handlebars Library
const exhbs = require('express-handlebars');
const sequelize = require('./config/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// We create a HANDLEBARS instance --> plugs into Express
const hbs = exhbs.create();

const sess = {
  secret: 'Super secret secret',
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

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});