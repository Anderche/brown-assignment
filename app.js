var dateFormat = require('dateformat');

const express = require('express');
const request = require('request');

const app = express();

app.set('view engine', 'ejs');

// CHANGE TO 20 RESULTS
// var url = 'https://randomuser.me/api/?nat=us,ca&results=20';
var url = 'https://randomuser.me/api/?nat=us,ca&results=2';

var passUsers = [];
// var currentDate = Date();

var currentDate = new Date().toISOString().split('T', 1);
var monthDay = dateFormat(currentDate, 'mm-dd');
console.log('currently it is: ' + monthDay);
console.log('---- 1 ----');

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
				date_of_birth: person.dob.date.split('T', 1),
				birthday: ' ',
			};

			// push random user object into passUsers array
			passUsers.push(random_user);

			console.log('---- 2 ----');
			var dob = person.dob.date.split('T', 1);
			console.log(dob);
			var formatted_dob = dateFormat(dob, 'UTC:mm-dd');
			console.log('User D.O.B. is: ' + formatted_dob);

			// push birthday into passUsers
			// passUsers.push(bdayText);

			console.log('---- 3 ----');

			if (formatted_dob < monthDay) console.log('Birthday has happened already!');
			else if (formatted_dob > monthDay) console.log('Birthday has yet to occur!');
			else console.log('Birthday is today!');
		}

		console.log('------');
		console.log(passUsers);
		console.log('------');

		res.render('random');
	});
});

app.listen(3000, () => {
	console.log('Running on port 3000!');
});
