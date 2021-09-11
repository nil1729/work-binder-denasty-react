const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const TOKEN_PATH = path.join(__dirname, 'token.json');
const SHEETS_API_SECRET_PATH = path.join(__dirname, 'gcp-sheets-api-secret.json');
const asyncHandler = require('../middleware/asyncHandler');

exports.authorizeQuery = asyncHandler((req, res, next) => {
	const content = fs.readFileSync(SHEETS_API_SECRET_PATH);
	const credentials = JSON.parse(content);
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	const APP_TOKEN = fs.readFileSync(TOKEN_PATH);
	oAuth2Client.setCredentials(JSON.parse(APP_TOKEN));
	req.GOOGLE_OAUTH_CREDENTIALS = oAuth2Client;
	next();
});
