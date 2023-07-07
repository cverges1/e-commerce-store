const path = require('path');

const express = require("express");
const session = require("express-session");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// imports segment analytics
const { Analytics } = require('@segment/analytics-node');



const routes = require('./controllers');

const analytics = new Analytics({ writeKey: 'fCvCtaAKBxvdEqrQ2WHlAT1jrsRT5eks'});

const app = express();
const PORT = process.env.PORT || 3001;

//need to set up handlebars

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// mount handlebars as engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mount static middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
