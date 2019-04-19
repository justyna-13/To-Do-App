const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));