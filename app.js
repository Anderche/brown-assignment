const express = require('express');
const request = require('request');

const app = express();
app.set('view engine', 'ejs');
var url = 'https://randomuser.me/api/?nat=us,ca&results=20';

app.get('/', function(req, res) {
	request(url, function(error, response, body) {
		var random_data = JSON.parse(body);

		// push random users into this array variable. ultimately, pass this array to view file.
		let passUsers = [];

		var date_now = new Date();
		var cur_day = parseInt(date_now.toDateString().split(' ')[2]);
		var cur_month = parseInt(date_now.getMonth()) + 1;

		for (var i = 0; i < random_data.results.length; i++) {
			let random_user = {};

			random_user.gender = random_data.results[i].gender;
			random_user.first_name = random_data.results[i].name.first;
			random_user.last_name = random_data.results[i].name.last;
			random_user.country = random_data.results[i].location.country;
			random_user.dob = random_data.results[i].dob.date.split('T')[0];
			// console.log(random_user.dob);

			date_dob = new Date(random_user.dob);
			dob_day = parseInt(random_user.dob.split('-')[2]);
			dob_month = parseInt(random_user.dob.split('-')[1]);

			if (dob_month > cur_month || (dob_month == cur_month && dob_day > cur_day)) {
				random_user.birthday = 'Birthday has yet to occur!';
			} else if (dob_month < cur_month || (dob_month == cur_month && dob_day < cur_day)) {
				random_user.birthday = 'Birthday has already happened!';
			} else if (dob_month == cur_month && dob_day == cur_day) {
				random_user.birthday = 'Birthday is today!';
			}

			// console.log(random_user.birthday);

			passUsers.push(random_user);
		}
		res.render('random', { passUsers: passUsers });
		// console.log('>>> Last passUser first_name: ' + passUsers[19].first_name);
	});
});

app.listen(process.env.PORT || 5000, () => {
	console.log('Running on port 5000!');
});
