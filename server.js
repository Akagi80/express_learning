const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

/*
Przy uzyciu handlebars ten Middleware (który skracał nam kod dostępu do ścieżki pliku) jest zbędny ponieważ Handlebars domyślnie wyszukuje w views!

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});
*/
app.use(express.static(path.join(__dirname, '/public')));

// Handlebars szuka w views bo to domyślny katalog
app.get('/', (req, res) => {
  res.render('index', { layout: false }); // "layout: false" wyłącza domyślną opcję...
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: false });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: false });
});

app.get('/info', (req, res) => {
  res.render('info', { layout: false });
});

app.get('/history', (req, res) => {
  res.render('history', { layout: false });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});