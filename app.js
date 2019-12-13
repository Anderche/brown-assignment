const express = require('express');
const request = require('request');

const app = express();

app.set('view engine', 'ejs');

// CHANGE TO 20 RESULTS
// var url = 'https://randomuser.me/api/?results=2';
var url = 'https://randomuser.me/api/?nat=us,ca&results=2';

app.get('/', function(req, res) {
	request(url, function(error, response, body) {
		var random_data = JSON.parse(body);
		console.log(random_data);

		var random_user = {
			gender: random_data.gender,
			// first_name: random_data.name.first,
			// last_name: random_data.name.last,
			country: random_data.nat,
			// date_of_birth: random_data.dob.date,
			birthday: ' ',
		};

		console.log('>> This is a single user: ' + random_data.name);

		res.render('random');
	});
});

app.listen(3000, () => {
	console.log('Running on port 3000!');
});
