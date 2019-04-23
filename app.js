const express = require('express');
const app = express();
const path = require('path');
const logged = require('./routes/logged');
const register = require('./routes/register');
const log = require('./routes/log');
const dashboard = require('./routes/dashboard');

app.use('/public', express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', log);
app.use('/logged', logged);
app.use('/register', register);
app.use('/dashboard', dashboard);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));