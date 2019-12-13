const express = require('express');
const request = require('request');

const app = express();

app.set('view engine', 'ejs');

// CHANGE TO 20 RESULTS
// var url = 'https://randomuser.me/api/?results=2';
var url = 'https://randomuser.me/api/?nat=us,ca&results=2';

var passUsers = [];

app.get('/', function(req, res) {
	request(url, function(error, response, body) {
		var random_data = JSON.parse(body).results;
		// console.log(random_data);

		for (var userIndex = 0; userIndex < random_data.length; userIndex++) {
			var person = random_data[userIndex];

			random_user = {
				gender: person.gender,
				first_name: person.name.first,
				last_name: person.name.last,
				country: person.nat,
				date_of_birth: person.dob.date,
				birthday: ' ',
			};

			passUsers.push(random_user);

			console.log('-----------------');
			console.log(random_user);
		}

		console.log('>> This is the number of random users: ' + random_data.length);
		console.log('------');
		console.log(passUsers);

		console.log('------');
		console.log(passUsers[0].first_name);

		res.render('random');
	});
});

app.listen(3000, () => {
	console.log('Running on port 3000!');
});
