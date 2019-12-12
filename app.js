const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('random');
});

app.listen(3000, () => {
	console.log('Running on port 3000!');
});
