const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: process.env.SECRET || 'supersecretkey',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the "public" directory

// Custom Helpers
const hbs = engine({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    extend: function(name, context) {
      if (!this._sections) this._sections = {};
      this._sections[name] = context.fn(this);
      return null;
    },
    content: function(name) {
      return this._sections && this._sections[name] || '';
    }
  }
});

// Configure Handlebars
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    console.log('Failed to connect to server.');
  }
});