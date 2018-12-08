export const todayDotFormat = () => {
	var dateToday = new Date();
	var day = dateToday.getDate();
	var month = dateToday.getMonth()+1;
	var year = dateToday.getFullYear();
	var today = month+'.'+day+'.'+year;
	return today;
}

export const todaySlashFormat = () => {
	var dateToday = new Date();
	var day = dateToday.getDate();
	var month = dateToday.getMonth()+1;
	var year = dateToday.getFullYear();
	var today = month+'/'+day+'/'+year;
	return today;
}

export const dayDotFormat = (date) => {
	var dateToday = new Date(date);
	var day = dateToday.getDate();
	var month = dateToday.getMonth()+1;
	var year = dateToday.getFullYear();
	var today = month+'.'+day+'.'+year;
	return today;
}

export const daySlashFormat = (date) => {
	var dateToday = new Date(date);
	var day = dateToday.getDate();
	var month = dateToday.getMonth()+1;
	var year = dateToday.getFullYear();
	var today = month+'/'+day+'/'+year;
	return today;
}

export const getDayName = (date) => {
	var theDate = new Date(date);
	var theDay = theDate.getDay();
	if (theDay === 0) {
		return 'sun';
	} else if (theDay === 1) {
		return 'mon';
	} if (theDay === 2) {
		return 'tue';
	} if (theDay === 3) {
		return 'wed';
	} if (theDay === 4) {
		return 'thu';
	} if (theDay === 5) {
		return 'fri';
	} if (theDay === 6) {
		return 'sat';
	} 
}

function pad (number) {
	if (parseInt(number) < 10) {
		return "0"+number;
	}else{
		return number;
	}
}

function generateTimes (start, end, apptLen, breakLen){

	var hour = 60;
	var fromHour = 0;
	var toHour = 0;
	var fromMins = 0;
	var toMins = 0;

	var allTimes = [];

	var fromTime = start.split(':');
	var toTime = end.split(':');

	var fromHour = parseInt(fromTime[0]);
	var fromMins = parseInt(fromTime[1]);

	var toHour = parseInt(toTime[0]);
	var toMins = parseInt(toTime[1]);

	//console.log(var timeRange);
	//console.log(var fromHour);
	//console.log(var fromMins);
	//console.log(var toHour);
	//console.log(var toMins);

	var totalTimeInRange = ((toHour - fromHour) * hour) - fromMins + toMins;
	var timeLeft = totalTimeInRange;

	//console.log(var totalTimeInRange);
	var currentHour = fromHour;
	var currentMins = fromMins;

	var endHour = 0;
	var endMins = 0;

	while((timeLeft >= apptLen)){

		if ((currentMins + apptLen) >= hour) {
			endHour = currentHour + 1;
			endMins = (currentMins + apptLen) - hour;
		}else{
			endHour = currentHour;
			endMins = currentMins + apptLen;
		}

		var processedCurrentMin = pad(currentMins);
		var processedEndMin = pad(endMins);

		allTimes.push(currentHour+':'+processedCurrentMin+' - '+endHour+':'+processedEndMin); 
		timeLeft = timeLeft - (apptLen + breakLen);

		if ((endMins + breakLen) >=60 ) {
			currentHour = endHour + 1;
			currentMins = (endMins + breakLen) - hour;
		}else {
			currentHour = endHour;
			currentMins = endMins + breakLen;
		}
	}
	return allTimes;
}

export const getDaySchedules = async function (currentDay, schedule) {

	var timeframes = [];

	var hour = 60;
	var fromHour = 0;
	var toHour = 0;
	var fromMins = 0;
	var toMins = 0;

	for (var day in schedule.days) {
		if (currentDay === day) {
			for (var i = 0; i < schedule.days[day].length; i++) {
				var newTimes = timeframes;
				timeframes = newTimes.concat(generateTimes(schedule.days[day][i].start, schedule.days[day][i].end, schedule.apptLen, schedule.breakLen));
			}
		}
	}

	// for(var i = 0; i < schedule.days.length; i++){
	// 	//console.log(var allDays[i]);
	// 	for(var j = 0; j < schedule.days[i].length; j++){
	// 		generateTimes(schedule.days[i][j]);
	// 		if (i == 0) {
	// 			Sunday.push(generateTimes(schedule.days[i][j]));
	// 		}else if (i == 1) {
	// 			Monday.push(generateTimes(schedule.days[i][j]));
	// 		}else if (i == 2) {
	// 			Tuesday.push(generateTimes(schedule.days[i][j]));
	// 		}else if (i == 3) {
	// 			Wednesday.push(generateTimes(schedule.days[i][j]));
	// 		}else if (i == 4) {
	// 			Thursday.push(generateTimes(schedule.days[i][j]));
	// 		}else if (i == 5) {
	// 			Friday.push(generateTimes(schedule.days[i][j]));
	// 		}else if (i == 6) {
	// 			Saturday.push(generateTimes(schedule.days[i][j]));
	// 		}
	// 	}
	// }
	return timeframes;
}



	// var dateToday = new Date();

	// var day = dateToday.getDate();
	// var month = dateToday.getMonth()+1;
	// var year = dateToday.getFullYear();

	// var displayDate = day+'.'+month+'.'+year;

	// var populateScheduleHelper = function(to, from){
	// 	for (var i = 0; i < from.length; i++) {
	// 		to.push(from[i]);
	// 	}
	// }

	// var currentDate = new Date();
	// var selectedDay = allDays[currentDate.getDay()];

	// var populateSchedule = function() {
	// 	var selectedDaySchedule = [];
	// 	if (selectedDay == 'Sunday') {
	// 		console.log('Sunday!'+Sunday+' '+Sunday.length);
	// 		selectedDaySchedule =[].concat.apply([],Sunday);
	// 	} else if (selectedDay == 'Monday') {
	// 		console.log('Monday!'+Monday+' '+Monday.length);
	// 		selectedDaySchedule =[].concat.apply([], Monday);
	// 	}else if (selectedDay == 'Tuesday') {
	// 		console.log('Tuesday!'+Tuesday);
	// 		selectedDaySchedule =[].concat.apply([], Tuesday);
	// 	}else if (selectedDay == 'Wednesday') {
	// 		console.log('Wednesday!'+Wednesday);
	// 		selectedDaySchedule =[].concat.apply([], Wednesday);
	// 	}else if (selectedDay == 'Thursday') {
	// 		console.log('Thursday!'+Thursday);
	// 		selectedDaySchedule =[].concat.apply([], Thursday);
	// 	}else if (selectedDay == 'Friday') {
	// 		console.log('Friday!'+Friday+' '+Friday.length);
	// 		selectedDaySchedule =[].concat.apply([], Friday);
	// 	}else if (selectedDay == 'Saturday') {
	// 		console.log('Saturday!'+Saturday);
	// 		selectedDaySchedule =[].concat.apply([], Saturday);
	// 	}
	// 	console.log(selectedDaySchedule);
	// }

	//var populateSchedule();

	export const getNext = (thisDate) => {
		var currentDate = new Date((new Date(thisDate)).getTime() + 86400000);
		var day = currentDate.getDate();
		var month = currentDate.getMonth()+1;
		var year = currentDate.getFullYear();

		return month+'/'+day+'/'+year;
	}

	export const getPrevious = (thisDate) => {
		var currentDate = new Date((new Date(thisDate)) - 86400000);
		var day = currentDate.getDate();
		var month = currentDate.getMonth()+1;
		var year = currentDate.getFullYear();

		return month+'/'+day+'/'+year;
	}	

	export const dayIsPassed = (thisDate) => {
		var today = new Date();
		var currentDate = new Date(thisDate);
		console.log(today + "  "+currentDate);
		if ((today.getTime() > currentDate.getTime()) && (today.getTime() !== currentDate.getTime())) {
			return true;
		} 
		return false;
	}
