const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mergen Durdyyev',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mergen Durdyyev',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    help: 'Here is what you can do',
    title: 'Help Page',
    name: 'Mergen Durdyyev',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }
  geocode(address, (error, { latitude, longitude, label } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: label,
        address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Help article not found',
    name: 'Mergen Durdyyev',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Page not found',
    name: 'Mergen Durdyyev',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
