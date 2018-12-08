const dbMid = require('./dbHelper.js'),
	  bcrypt = require('bcrypt'),
	  saltRounds = 10;

exports.saveAppointment = async function (appointment) {
	var dbRecord = await dbMid.saveAppointment(appointment);
	console.log(dbRecord);
	if (dbRecord === null) {
		return ({error: 'Internal Server Error', type: 500});
	}

	return ({success: 'Appointment saved'});
}

exports.getScheduleClient = async function (profile) {
	var dbRecord = await dbMid.getScheduleClient(profile);
	if (dbRecord === null) {
		return ({success: 'No Schedule found', schedule: {}});
	}

	return ({success: 'Schedule found', schedule: dbRecord});

}

exports.getSchedule = async function (profile) {
	var dbRecord = await dbMid.getSchedule(profile);
	if (dbRecord === null) {
		return ({success: 'No Schedule found', schedule: {}});
	}

	return ({success: 'Schedule found', schedule: dbRecord});

} 

exports.updateSchedule = async function (schedule) {
	var dbRecord = await dbMid.updateSchedule(schedule);
	console.log(dbRecord);
	if (dbRecord === null) {
		return ({error: 'Internal Server Error', type: 500});
	}

	return ({success: 'Schedule updated'});
}

exports.getProfile = async function (profile) {
	var dbRecord = await dbMid.getProfile(profile);
	if (dbRecord === null) {
		return ({success: 'No Profile found', profile: {}});
	}

	return ({success: 'Profile found', profile: dbRecord.info});

} 

exports.getProfileClient = async function (profile) {
	var dbRecord = await dbMid.getProfileClient(profile);
	if (dbRecord === null) {
		return ({success: 'No Profile found', profile: {}});
	}

	return ({success: 'Profile found', profile: dbRecord.info});

} 

exports.updateProfile = async function (profile) {
	var dbRecord = await dbMid.updateProfile(profile);
	console.log(dbRecord);
	if (dbRecord === null) {
		return ({error: 'Internal Server Error', type: 500});
	}

	return ({success: 'Profile updated'});
} 

exports.verifyUser = async function (user) {

	var dbRecord = await dbMid.getUser(user.username);

	if (dbRecord === null) {
		return ({error: 'No account Found', type: 400});
	}

	var passwordIsValid = await validatePassword(user.password, dbRecord.local.password);

	if (!passwordIsValid) {
		return ({error: 'Wrong Password', type: 400});
	} else {
		return ({success: 'Account Found', 'username': dbRecord.local.username, 'email': dbRecord.local.email, 'buroID': dbRecord.extra.buroID});
	}

}

exports.createAccount = async function (account) {

	var recordsWithEmail = await dbMid.getEmail(account.email);
	var recordsWithUserName = await dbMid.getUsername(account.username);

	if (recordsWithEmail > 0) {
		return ({error: 'Email already in use', type: 400});
	}

	if (recordsWithUserName > 0) {
		return ({error: 'Username already in use', type: 400});
	}

	var newAccountID = await generateID(),
		password = await hashPassword(account.password);

	var newAccount = {
						'local': {
							'username': account.username,
							'password': password,
							'email': account.email
						},
						'extra': {
							'username': account.username,
							'password': password,
							'email': account.email,
							'buroID': newAccountID
						}
					};

	var dbRecord = await dbMid.createAccount(newAccount);

	if (dbRecord.local && dbRecord.extra) {
		return ({success: 'Account created, Please login', 'username': dbRecord.local.username, 'email': dbRecord.local.email, 'buroID': dbRecord.extra.buroID});
	} else {
		return ({error: 'Internal Server Error', type: 500});
	}
}

async function generateID () {
	try {
		var count = await dbMid.getNumberOfAccounts();
		count++;
		var newAccountID = 'buro-'+ count;
		var isUnique = await dbMid.getburoID(newAccountID);

		while (isUnique > 0) {
			count++;
			newAccountID = 'buro-'+(count);
			isUnique = await dbMid.getburoID(newAccountID);
		}

		return newAccountID;

	} catch (err) {
		throw err;
	}
}

async function hashPassword (password) {
	var hash = await bcrypt.hash(password, saltRounds).then(function(hash) {
		return hash;
	});
	return hash;
}

async function validatePassword (password, hash) {
	var isValid = await bcrypt.compare(password, hash).then(function(res) {
		return res;
	});
	return isValid;
}
