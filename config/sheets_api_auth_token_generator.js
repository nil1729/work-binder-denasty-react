const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';
const SHEETS_API_SECRET_PATH = 'gcp-sheets-api-secret.json';

// Delete Old Tokens
fs.unlinkSync(TOKEN_PATH);

fs.readFile(SHEETS_API_SECRET_PATH, (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	authorize(JSON.parse(content));
});

function authorize(credentials) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	fs.readFile(TOKEN_PATH, (err) => {
		if (err) return getNewToken(oAuth2Client);
		console.log('ALREADY_AUTHENTICATED');
	});
}

function getNewToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error while trying to retrieve access token', err);
			oAuth2Client.setCredentials(token);
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
				console.log('AUTHENTICATION SUCCESSFUL');
			});
		});
	});
}
