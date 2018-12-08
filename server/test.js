const serverHelper = require('./serverHelper.js');

async function test() {

	var user = {
		'buroID': 'buro-2',
		'details': {
			'name': 'Tresor',
			'phone': '+1123232323',
			'email': 'tuge@hhsj.com',
			'date': '12/06/2018',
			'time': {
				'start': '8:49',
				'end': '9:23'
			},
		}
	};
	console.log(await serverHelper.saveAppointment(user));

	// var user = {
	// 	'buroID': 'buro-2',
	// 	'email': 'buro@buro.io',
	// };
	// console.log(await serverHelper.getSchedule(user));
	// var user = {
	// 	'buroID': 'buro-2',
	// 	'email': 'buro@buro.io',
	// 	'days': {
	// 		'mon': [ {'start': '8:00', 'end': '12:00'}, {'start': '1:00', 'end': '5:00'} ],
	// 		'tue': [ {'start': '8:00', 'end': '12:00'}, {'start': '1:00', 'end': '5:00'} ],
	// 		'wed': [ {'start': '8:00', 'end': '12:00'}, {'start': '1:00', 'end': '5:00'} ],
	// 		'thu': [ {'start': '8:00', 'end': '12:00'}, {'start': '1:00', 'end': '5:00'} ],
	// 		'fri': [ {'start': '8:00', 'end': '12:00'}, {'start': '1:00', 'end': '5:00'} ],
	// 		'sat': [ {'start': '8:00', 'end': '11:00'}, {'start': '12:00', 'end': '3:00'} ],
	// 		'sun': [ ]
	// 	},
	// 	'apptLen': 45,
	// 	'breakLen': 15
	// };
	// console.log(await serverHelper.updateSchedule(user));

	// var user = {
	// 	'buroID': 'buro-2',
	// 	'email': 'buro@buro.io'
	// }
	// console.log(await serverHelper.getProfile(user));
	// 	var user = {
	// 	'buroID': 'buro-2',
	// 	'email': 'buro@buro.io',
	// 	'phone': '+1234242',
	// 	'address': 'Here at ASU 85212, AZ',
	// 	'name': 'Buro'
	// }
	//console.log(await serverHelper.updateProfile(user));

	// var user = {
	// 	'username': 'Patner',
	// 	'password': 'Patner',
	// 	'email': 'patner@patner.io'
	// }
	//console.log(await serverHelper.createAccount(user));
	//console.log(await serverHelper.verifyUser(user));

}

test();