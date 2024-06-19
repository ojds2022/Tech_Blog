const express = require('express');
const routes = require('./routes');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

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