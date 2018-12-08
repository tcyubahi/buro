var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {

	if (err) {
		throw err;
	}

	var dbo = db.db('buroDb');

	dbo.createCollection('accounts', function(err, result) {
		if (err) {
			throw err;
		}
		console.log('\n\nAccounts collection successfully created\n\n');
		db.close();
	});

	dbo.createCollection('profiles', function(err, result) {
		if (err) {
			throw err;
		}
		console.log('\n\nProfiles collection successfully created\n\n');
		db.close();
	});

	dbo.createCollection('schedules', function(err, result) {
		if (err) {
			throw err;
		}
		console.log('\n\nSchedules collection successfully created\n\n');
		db.close();
	});

	dbo.createCollection('appointments', function(err, result) {
		if (err) {
			throw err;
		}
		console.log('\n\nAppointments collection successfully created\n\n');
		db.close();
	});

}); 









