const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

//MIDDLEWARE:

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
app.use(express.urlencoded({ extended: false })); // konieczny do prawidłowego przyjmowania danych przez serwer

// Handlebars szuka w views bo to domyślny katalog
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', (req, res) => {
  res.json(req.body); //odpowiednik res.send, jednak służący do zwracania danych w formacie JSON, który jest konieczny, bo req.body powinien być obiektem // NIEMOŻEMY ZWRÓCIĆ ÓBIEKTY JAKO TEKSTU!!!
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});