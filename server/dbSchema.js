{
	'buroDb': {
		'accounts': [
			{
				'local': {
					'username': username,
					'email': email,
					'password': password
				},
				'extra': {
					'username': username,
					'password': password,
					'email': email,
					'buroID': buroID
				}
			}
		],
		'profiles': [
			{
				'info': {
					'buroID': buroID,
					'companyName': companyName,
					'email': email,
					'companyEmail': companyEmail
					'phone': phone,
					'address': address
				}
			}
		],
		'schedules': [
			{
				'buroID':buroID,
				'email': email,
				'days': {
					'mon': [ {'start': start, 'end': end} ],
					'tue': [ {'start': start, 'end': end} ],
					'wed': [ {'start': start, 'end': end} ],
					'thu': [ {'start': start, 'end': end} ],
					'fri': [ {'start': start, 'end': end} ],
					'sat': [ {'start': start, 'end': end} ],
					'sun': [ {'start': start, 'end': end} ]
				},
				'apptLen': apptLen,
				'breakLen': breakLen
			}
		],
		'appointments': [
			{
				'buroID': buroID,
				'appointments': [
					{
						'date': date,
						'time': {
							'start': start,
							'end': end
						},
						'name': name,
						'phone': phone,
						'email': email
					}
				]
			}
		]
	}
}