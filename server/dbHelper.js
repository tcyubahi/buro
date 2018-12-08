var mongojs = require('mongojs');
var db = mongojs('buroDb', ['accounts', 'profiles', 'schedules', 'appointments']);

exports.saveAppointment = function(appointment) {
	console.log(appointment);
	return new Promise(function(resolve, reject) {
		db.appointments.update({buroID: appointment.buroID}, {$push: {appointments: appointment.details}}, {upsert: true}, function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

exports.getScheduleClient = function(schedule) {
	return new Promise(function(resolve, reject) {
		db.schedules.findOne(({buroID: schedule.buroID}), function (err, docs) {
			if (err) {
				reject(err);
			}
			resolve(docs);
		});
	});
}

exports.getSchedule = function(schedule) {
	return new Promise(function(resolve, reject) {
		db.schedules.findOne(({buroID: schedule.buroID, email: schedule.email}), function (err, docs) {
			if (err) {
				reject(err);
			}
			resolve(docs);
		});
	});
}

exports.updateSchedule = function(schedule) {
	console.log(schedule);
	return new Promise(function(resolve, reject) {
		db.schedules.update({buroID: schedule.buroID, email: schedule.email}, {$set: {days: schedule.days, apptLen: schedule.apptLen, breakLen: schedule.breakLen}}, {upsert: true}, function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

exports.getProfile = function(profile) {
	return new Promise(function(resolve, reject) {
		db.profiles.findOne(({'info.buroID': profile.buroID, 'info.email': profile.email}), function (err, docs) {
			if (err) {
				reject(err);
			}
			resolve(docs);
		});
	});
}

exports.getProfileClient = function(profile) {
	return new Promise(function(resolve, reject) {
		db.profiles.findOne(({'info.buroID': profile.buroID}), function (err, docs) {
			if (err) {
				reject(err);
			}
			resolve(docs);
		});
	});
}

exports.updateProfile = function(profile) {
	console.log(profile);
	return new Promise(function(resolve, reject) {
		db.profiles.update({'info.buroID': profile.buroID, 'info.email': profile.email}, {$set: {info: profile}}, {upsert: true}, function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

exports.getUser = function(username) {
	return new Promise(function(resolve, reject) {
		db.accounts.findOne(({'local.username': username}), function (err, docs) {
			if (err) {
				reject(err);
			}
			resolve(docs);
		});
	});
}

exports.createAccount = function(account) {

	return new Promise(function(resolve, reject) {
		db.accounts.save((account), function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

exports.getUsername = function(username) {

	return new Promise(function(resolve, reject) {
		db.accounts.count(({'local.username': username}), function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

exports.getEmail = function(userEmail) {

	return new Promise(function(resolve, reject) {
		db.accounts.count(({'local.email': userEmail}), function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

exports.getburoID = function(id) {

	return new Promise(function(resolve, reject) {
		db.accounts.count(({buroID: id}), function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

exports.getNumberOfAccounts = function() {

	return new Promise(function(resolve, reject) {
		db.accounts.count((err, result) => {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}