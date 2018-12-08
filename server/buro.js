'use strict';

const   Hapi = require('hapi'),
      helper = require('./serverHelper');

// Server configuration
const server = Hapi.server({
    port: 8000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

server.state('usercreds', {
    ttl: 24 * 60 * 60 * 1000,
    isSecure: false,
    isHttpOnly: false,
    encoding: 'base64json',
    clearInvalid: false, 
    strictHeader: false, 
    isSameSite: 'Lax'
});

server.route({
    method: 'POST',
    path: '/login',
    handler: async (request, h, next) => {

        var userData = request.payload;
        var thisUser = {
            'username': userData.username,
            'password': userData.password
        }

        if (!thisUser.username || !thisUser.password || thisUser.username === '' || thisUser.password === '') {
            return h.response(JSON.stringify({error: 'All fields are required'})).code(400);
        }

        var res = await helper.verifyUser(thisUser);

        if (res.success) {
            var logins = {
                'username': res.username, 
                'email': res.email, 
                'buroID': res.buroID
            }

            return h.response(JSON.stringify({success: 'logged in', 'usercreds': logins}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }

    }
});

server.route({
    method: 'POST',
    path: '/signup',
    handler: async (request, h) => {
        //console.log(request);
        var userData = request.payload;
        var thisUser = {
            'username': userData.username,
            'password': userData.password,
            'email': userData.email
        }

        var res = await helper.createAccount(thisUser);
        console.log(res);

        if (res.success) {
            var logins = {
                'username': res.username, 
                'email': res.email, 
                'buroID': res.buroID
            }

            return h.response(JSON.stringify({success: 'Signed up', 'usercreds': logins}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/editprofile',
    handler: async (request, h) => {
        //console.log(request);
        var profileData = request.payload;
        var thisProfile = {
            'buroID': profileData.buroID,
            'email': profileData.email,
            'companyName': profileData.name,
            'phone': profileData.phone,
            'address': profileData.address, 
            'companyEmail': profileData.companyEmail
        }

        if (!thisProfile || ! thisProfile.buroID || !thisProfile.email || !thisProfile.companyName || !thisProfile.phone || !thisProfile.address || !thisProfile.companyEmail) {
            return h.response(JSON.stringify({error: 'Bad Request'})).code(400);
        }

        var res = await helper.updateProfile(thisProfile);
        console.log(res);

        if (res.success) {

            return h.response(JSON.stringify({success: 'Profile updated'}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/profile',
    handler: async (request, h) => {
        //console.log(request);
        var profileData = request.payload;
        var thisProfile = {
            'buroID': profileData.buroID,
            'email': profileData.email
        }

        if (!thisProfile || ! thisProfile.buroID || !thisProfile.email) {
            return h.response(JSON.stringify({error: 'Bad Request'})).code(400);
        }

        var res = await helper.getProfile(thisProfile);
        console.log(res);

        if (res.success) {

            return h.response(JSON.stringify({success: 'Profile found', profile: res.profile}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/schedule',
    handler: async (request, h) => {
        //console.log(request);
        var profileData = request.payload;
        var thisProfile = {
            'buroID': profileData.buroID,
            'email': profileData.email
        }

        if (!thisProfile || ! thisProfile.buroID || !thisProfile.email) {
            return h.response(JSON.stringify({error: 'Bad Request'})).code(400);
        }

        var res = await helper.getSchedule(thisProfile);
        console.log(res);

        if (res.success) {

            return h.response(JSON.stringify({success: 'Schedule found', schedule: res.schedule}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/editschedule',
    handler: async (request, h) => {
        console.log(JSON.stringify(request.payload));
        var profileData = request.payload.newSchedule;
        var thisProfile = {
            'buroID': profileData.buroID,
            'email': profileData.email,
            'days': profileData.days,
            'apptLen': profileData.apptLen,
            'breakLen': profileData.breakLen
        }

        if (!thisProfile || ! thisProfile.buroID || !thisProfile.email || !thisProfile.days || !thisProfile.apptLen || !thisProfile.breakLen) {
            return h.response(JSON.stringify({error: 'Bad Request'})).code(400);
        }

        var res = await helper.updateSchedule(thisProfile);
        console.log(res);

        if (res.success) {

            return h.response(JSON.stringify({success: 'Schedule updated'}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/getprofile',
    handler: async (request, h) => {
        //console.log(request);
        var profileData = request.payload;
        var thisProfile = {
            'buroID': profileData.buroID
        }

        if (!thisProfile || ! thisProfile.buroID) {
            return h.response(JSON.stringify({error: 'Bad Request'})).code(400);
        }

        var res = await helper.getProfileClient(thisProfile);
        console.log(res);

        if (res.success) {
            delete res.profile['email'];
            return h.response(JSON.stringify({success: 'Profile found', profile: res.profile}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/getschedule',
    handler: async (request, h) => {
        //console.log(request);
        var profileData = request.payload;
        var thisProfile = {
            'buroID': profileData.buroID
        }

        if (!thisProfile || ! thisProfile.buroID) {
            return h.response(JSON.stringify({error: 'Bad Request'})).code(400);
        }

        var res = await helper.getScheduleClient(thisProfile);
        console.log(res);

        if (res.success) {
            delete res.schedule['email'];
            return h.response(JSON.stringify({success: 'Schedule found', schedule: res.schedule}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/saveappointment',
    handler: async (request, h) => {
        //console.log(request);
        var profileData = request.payload;
        var thisAppt = {
            'buroID': profileData.buroID,
            'details': profileData.details
        }

        if (!thisAppt || !thisAppt.buroID || !thisAppt.details) {
            return h.response(JSON.stringify({error: 'Bad Request'})).code(400);
        }

        var res = await helper.saveAppointment(thisAppt);
        console.log(res);

        if (res.success) {
            return h.response(JSON.stringify({success: 'Reserved'}));

        } else if (res.error) {
            return h.response(JSON.stringify({error: res.error})).code(res.type);
        } else {
            return h.response(JSON.stringify({error: 'Unknown Error Occured'})).code(500);
        }
    }
});







server.route({
    method: 'GET',
    path: '/isloggedin',
    handler: async (request, h) => {
        var isLoggedIn = await server.methods.isLoggedIn (request);

        if (isLoggedIn) {
            console.log('logged in');
            return h.response(JSON.stringify({ success: 'logged in'}));
        } else {
            console.log('Not logged in');
            return h.response(JSON.stringify({ error: 'not logged in'}));
        }
    }
});

server.route({
    method: 'POST',
    path: '/logout',
    handler: (request, h) => {

        return h.response(JSON.stringify({ success: 'logged out'}));
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return JSON.stringify({message: 'Yo, you are not supposed to be here :('});
    }
});

// Check if user is logged in
const isLoggedIn = async function (req) {
    console.log(req.state);

    if (req.state.usercreds) {
        var userIsLoggedIn = await checkLogins(req.state.usercreds);
        return userIsLoggedIn;
    } else {
        return false;
    }
}

server.method('isLoggedIn', isLoggedIn, {});

// Validate logins
function checkLogins (logins) {
    return new Promise(function(resolve, reject) {
        if (!logins) {
            reject(false);
        } else {
            var currentUserLogins = logins;
            if (currentUserLogins.username && currentUserLogins.email && currentUserLogins.buroID) {
                resolve(true);
            } else {
                reject(false);
            }
        }
    });
}

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

// Start Server
init();