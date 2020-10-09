const {google} = require('googleapis');
const {OAuth2} = google.auth;
const GC = require('./google.json');
const OAuth2Client = new OAuth2(GC.ClientId, GC.ClientSecret);

OAuth2Client.setCredentials({
    refresh_token: GC.RefreshToken
});

const calendar = google.calendar({version: 'v3', auth: OAuth2Client});