const express = require('express');
const request = require('request');

const app = express();

app.set('view engine', 'ejs');

var url = 'https://randomuser.me/api/';

app.get('/', function(req, res) {
	request(url, function(error, response, body) {
		var random_data = JSON.parse(body);
		console.log(random_data);

		res.render('random');
	});
});

app.listen(3000, () => {
	console.log('Running on port 3000!');
});
